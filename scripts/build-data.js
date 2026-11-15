/*
 * Checks src/data/NepaliDates.json and writes the small table the package
 * actually ships (src/data/calendar.generated.json).
 *
 * Runs automatically before `npm run build`, `npm run dev` and `npm test`.
 * If the data has a mistake, it stops with a message saying where.
 */
const fs = require("fs");
const path = require("path");

const SOURCE = path.join(__dirname, "../src/data/NepaliDates.json");
const OUTPUT = path.join(__dirname, "../src/data/calendar.generated.json");
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const fail = (message) => {
  console.error(`✗ NepaliDates.json: ${message}`);
  process.exit(1);
};

const toDayNumber = (iso, where) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!match) fail(`${where}: "start" must look like "2026-04-14", got ${JSON.stringify(iso)}`);
  const [, y, m, d] = match.map(Number);
  const time = Date.UTC(y, m - 1, d);
  const check = new Date(time);
  if (check.getUTCMonth() !== m - 1 || check.getUTCDate() !== d) {
    fail(`${where}: "${iso}" is not a real date`);
  }
  return Math.round(time / MS_PER_DAY);
};

const toIso = (dayNumber) => new Date(dayNumber * MS_PER_DAY).toISOString().slice(0, 10);

const data = JSON.parse(fs.readFileSync(SOURCE, "utf8"));
const years = Object.keys(data)
  .map(Number)
  .sort((a, b) => a - b);

if (!years.length) fail("no years found");

let expectedStart = null;
let days = "";

years.forEach((year, index) => {
  if (index > 0 && year !== years[index - 1] + 1) {
    fail(`year ${years[index - 1] + 1} is missing (years must have no gaps)`);
  }

  const months = data[String(year)].months;
  if (!Array.isArray(months) || months.length !== 12) {
    fail(`BS ${year} must have exactly 12 months`);
  }

  let total = 0;
  months.forEach((month, monthIndex) => {
    const where = `BS ${year} month ${monthIndex + 1}`;
    if (!Number.isInteger(month.days) || month.days < 29 || month.days > 32) {
      fail(`${where}: "days" must be 29-32, got ${JSON.stringify(month.days)}`);
    }

    const start = toDayNumber(month.start, where);
    if (expectedStart !== null && start !== expectedStart) {
      fail(
        `${where}: "start" is ${month.start} but the month before it ends ` +
          `so that this one should start on ${toIso(expectedStart)}`
      );
    }

    expectedStart = start + month.days;
    total += month.days;
    days += String(month.days - 29);
  });

  if (total !== 365 && total !== 366) {
    fail(`BS ${year} has ${total} days in total (a year should have 365 or 366)`);
  }
});

const output = {
  firstYear: years[0],
  start: data[String(years[0])].months[0].start,
  // one character per month: days in the month minus 29
  days,
};

fs.writeFileSync(OUTPUT, JSON.stringify(output) + "\n");
console.log(
  `✓ Date table: BS ${years[0]}-${years[years.length - 1]} ` +
    `(${years.length} years) checked and written`
);
