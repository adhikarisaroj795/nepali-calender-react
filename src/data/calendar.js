/*
 * The BS calendar table.
 *
 * The readable source is NepaliDates.json. scripts/build-data.js checks it
 * and writes calendar.generated.json, a compact copy that is small enough
 * to ship. This file expands that copy and answers questions about it.
 *
 * Dates are handled as "day numbers": whole days since 1970-01-01.
 */
import compact from "./calendar.generated.json";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const FIRST_YEAR = compact.firstYear;
export const YEAR_COUNT = compact.days.length / 12;
export const LAST_YEAR = FIRST_YEAR + YEAR_COUNT - 1;

const [startYear, startMonth, startDay] = compact.start.split("-").map(Number);

/** Day number of the first day in the table. */
export const FIRST_DAY = Math.round(
  Date.UTC(startYear, startMonth - 1, startDay) / MS_PER_DAY
);

const MONTH_COUNT = YEAR_COUNT * 12;
const monthLengths = new Array(MONTH_COUNT);
// monthStarts[i] = day number of day 1 of month i (months counted from the
// first year). The extra last entry is the day after the table ends.
const monthStarts = new Array(MONTH_COUNT + 1);

monthStarts[0] = FIRST_DAY;
for (let i = 0; i < MONTH_COUNT; i++) {
  monthLengths[i] = 29 + Number(compact.days[i]);
  monthStarts[i + 1] = monthStarts[i] + monthLengths[i];
}

/** Day number of the last day in the table. */
export const LAST_DAY = monthStarts[MONTH_COUNT] - 1;

export const hasYear = (year) =>
  Number.isInteger(year) && year >= FIRST_YEAR && year <= LAST_YEAR;

/** Days in a month. `month` is 0-11. */
export const getMonthLength = (year, month) =>
  monthLengths[(year - FIRST_YEAR) * 12 + month];

/** Day number of day 1 of a month. `month` is 0-11. */
export const getMonthStart = (year, month) =>
  monthStarts[(year - FIRST_YEAR) * 12 + month];

/** Find the BS date for a day number, or null if it is outside the table. */
export const findDate = (dayNumber) => {
  if (
    !Number.isInteger(dayNumber) ||
    dayNumber < FIRST_DAY ||
    dayNumber > LAST_DAY
  ) {
    return null;
  }

  // binary search for the last month that starts on or before dayNumber
  let low = 0;
  let high = MONTH_COUNT - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (monthStarts[middle] <= dayNumber) {
      low = middle;
    } else {
      high = middle - 1;
    }
  }

  return {
    year: FIRST_YEAR + Math.floor(low / 12),
    month: low % 12,
    day: dayNumber - monthStarts[low] + 1,
  };
};
