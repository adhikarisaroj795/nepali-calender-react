// Runs against the built package (dist/index.js). Use `npm test`.
const test = require("node:test");
const assert = require("node:assert");

const lib = require("../dist/index.js");
const data = require("../src/data/NepaliDates.json");

const pad = (n) => String(n).padStart(2, "0");

test("loads without a browser (server-side import)", () => {
  assert.strictEqual(typeof document, "undefined");
  assert.strictEqual(typeof lib.default, "function");
});

test("known date pairs", () => {
  const pairs = [
    ["2000-01-01", "1943-04-14"],
    ["2081-01-01", "2024-04-13"],
    ["2082-04-20", "2025-08-05"],
    ["2083-07-28", "2026-11-14"],
    ["2099-12-30", "2043-04-13"],
  ];
  for (const [bs, ad] of pairs) {
    assert.strictEqual(lib.bsToAd(bs), ad);
    assert.strictEqual(lib.adToBs(ad), bs);
    assert.strictEqual(lib.convertBStoAD(bs), ad);
    assert.strictEqual(lib.convertADtoBS(ad), bs);
  }
});

test("every day converts both ways", () => {
  const years = Object.keys(data).sort();
  let cursor = Date.parse(data[years[0]].months[0].start + "T00:00:00Z");
  let count = 0;
  for (const year of years) {
    data[year].months.forEach((month, index) => {
      for (let day = 1; day <= month.days; day++) {
        const d = new Date(cursor);
        const ad = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(
          d.getUTCDate(),
        )}`;
        const bs = `${year}-${pad(index + 1)}-${pad(day)}`;
        if (lib.bsToAd(bs) !== ad || lib.adToBs(ad) !== bs) {
          assert.fail(`${bs} <-> ${ad} failed`);
        }
        cursor += 24 * 60 * 60 * 1000;
        count++;
      }
    });
  }
  assert.ok(count > 36000);
});

test("JS Date input uses the local calendar day and is not modified", () => {
  const date = new Date(2026, 10, 14, 23, 45);
  const before = date.getTime();
  assert.strictEqual(lib.adToBs(date), "2083-07-28");
  assert.strictEqual(lib.convertJStoBS(date), "2083-07-28");
  assert.strictEqual(date.getTime(), before);
});

test("bsToAdDate returns the right local day", () => {
  const date = lib.bsToAdDate("2083-07-28");
  assert.deepStrictEqual(
    [date.getFullYear(), date.getMonth() + 1, date.getDate()],
    [2026, 11, 14],
  );
});

test("flexible input formats", () => {
  assert.strictEqual(lib.bsToAd("2083/7/28"), "2026-11-14");
  assert.strictEqual(lib.bsToAd("२०८३-०७-२८"), "2026-11-14");
  assert.strictEqual(
    lib.bsToAd({ year: 2083, month: 7, day: 28 }),
    "2026-11-14",
  );
  assert.strictEqual(
    lib.adToBs({ year: 2026, month: 11, day: 14 }),
    "2083-07-28",
  );
});

test("formatting", () => {
  assert.strictEqual(
    lib.formatBs("2083-07-28", "dddd, MMMM D, YYYY"),
    "Saturday, Kartik 28, 2083",
  );
  assert.strictEqual(
    lib.adToBs("2026-11-14", "D MMMM YYYY, dddd", "nepali"),
    "२८ कात्तिक २०८३, शनिबार",
  );
  assert.strictEqual(
    lib.formatBs("2083-07-28", "[BS] YYYY.MM.DD"),
    "BS 2083.07.28",
  );
});

test("details and helpers", () => {
  const info = lib.adToBsDetails("2026-11-14");
  assert.strictEqual(info.bs, "2083-07-28");
  assert.strictEqual(info.month, 7);
  assert.strictEqual(info.monthName, "Kartik");
  assert.strictEqual(info.weekDayName, "Saturday");
  assert.strictEqual(info.daysInMonth, 30);
  assert.strictEqual(lib.getDaysInBsMonth(2083, 7), 30);
  assert.strictEqual(lib.isValidBsDate("2083-07-30"), true);
  assert.strictEqual(lib.isValidBsDate("2083-07-31"), false);
  assert.deepStrictEqual(lib.getBsYearRange(), { min: 2000, max: 2099 });
  assert.match(lib.todayBs(), /^\d{4}-\d{2}-\d{2}$/);
});

test("bad input throws a clear error", () => {
  assert.throws(() => lib.bsToAd("hello"), /Invalid BS date/);
  assert.throws(() => lib.adToBs("2025-02-30"), /Invalid AD date/);
  assert.throws(() => lib.bsToAd("2083-13-01"), /Invalid month/);
  assert.throws(() => lib.adToBs("1900-01-01"), /not found/);
});

test("number helpers", () => {
  assert.strictEqual(lib.toNepaliNumber(12345), "१२३४५");
  assert.strictEqual(lib.toNepaliDateString("2083-07-28"), "२०८३-०७-२८");
});
