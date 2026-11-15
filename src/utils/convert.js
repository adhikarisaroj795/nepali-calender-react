/*
 * Simple conversion helpers.
 *
 *   adToBs("2026-11-14")   -> "2083-07-28"
 *   bsToAd("2083-07-28")   -> "2026-11-14"
 *
 * Every function accepts a "YYYY-MM-DD" string (also "YYYY/MM/DD",
 * "YYYY.MM.DD" and Nepali digits), a { year, month, day } object
 * (month is 1-12), and - for AD input - a JS Date.
 * Months are always 1-12 in this API.
 */
import {
  FIRST_YEAR,
  LAST_YEAR,
  hasYear,
  getMonthLength,
} from "../data/calendar";
import { NepaliDate } from "./dateUtils";
import { toNepaliNumber } from "./numberUtils";

const MONTHS_EN = [
  "Baisakh", "Jestha", "Ashad", "Shrawan", "Bhadra", "Ashwin",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
];
const MONTHS_NP = [
  "बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज",
  "कात्तिक", "मंसिर", "पुष", "माघ", "फाल्गुन", "चैत्र",
];
const WEEKDAYS_EN = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];
const WEEKDAYS_NP = [
  "आइतबार", "सोमबार", "मङ्गलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार",
];

const NEPALI_DIGITS = "०१२३४५६७८९";
const pad = (n) => String(n).padStart(2, "0");

const toParts = (input, label) => {
  if (input && typeof input === "object" && !(input instanceof Date)) {
    const { year, month, day } = input;
    if ([year, month, day].every(Number.isInteger)) return [year, month, day];
  }
  if (typeof input === "string") {
    const ascii = input
      .trim()
      .replace(/[०-९]/g, (ch) => String(NEPALI_DIGITS.indexOf(ch)));
    const match = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/.exec(ascii);
    if (match) return [Number(match[1]), Number(match[2]), Number(match[3])];
  }
  throw new Error(
    `Invalid ${label} date: ${JSON.stringify(input)}. ` +
      `Use "YYYY-MM-DD" or { year, month, day }.`
  );
};

const bsInput = (input) => {
  if (input instanceof NepaliDate) return input;
  const [y, m, d] = toParts(input, "BS");
  return new NepaliDate(y, m - 1, d);
};

const adInput = (input) => {
  if (input instanceof Date) return NepaliDate.fromGregorian(input);
  const [y, m, d] = toParts(input, "AD");
  // Reject impossible AD dates such as 2025-02-30.
  const check = new Date(Date.UTC(y, m - 1, d));
  if (
    check.getUTCFullYear() !== y ||
    check.getUTCMonth() !== m - 1 ||
    check.getUTCDate() !== d
  ) {
    throw new Error(`Invalid AD date: ${JSON.stringify(input)}`);
  }
  return NepaliDate.fromADString(`${y}-${pad(m)}-${pad(d)}`);
};

const formatNepaliDate = (nd, pattern, language) => {
  const np = language === "nepali";
  const num = (n) => (np ? toNepaliNumber(n) : String(n));
  const tokens = {
    YYYY: num(nd.year),
    MMMM: (np ? MONTHS_NP : MONTHS_EN)[nd.month],
    MM: num(pad(nd.month + 1)),
    M: num(nd.month + 1),
    DD: num(pad(nd.day)),
    D: num(nd.day),
    dddd: (np ? WEEKDAYS_NP : WEEKDAYS_EN)[nd.getDay()],
  };
  // [text in brackets] is kept as-is.
  return pattern.replace(
    /\[([^\]]*)\]|YYYY|MMMM|MM|M|DD|D|dddd/g,
    (token, literal) => (literal !== undefined ? literal : tokens[token])
  );
};

/** AD -> BS string. adToBs("2026-11-14") -> "2083-07-28" */
export const adToBs = (ad, pattern = "YYYY-MM-DD", language = "english") =>
  formatNepaliDate(adInput(ad), pattern, language);

/** BS -> AD string. bsToAd("2083-07-28") -> "2026-11-14" */
export const bsToAd = (bs) => bsInput(bs).toADString();

/** BS -> JS Date (local midnight of that day). */
export const bsToAdDate = (bs) => bsInput(bs).toJSDate();

/** Format a BS date. formatBs("2083-07-28", "D MMMM YYYY", "nepali") */
export const formatBs = (bs, pattern = "YYYY-MM-DD", language = "english") =>
  formatNepaliDate(bsInput(bs), pattern, language);

const details = (nd) => ({
  bs: nd.format("YYYY-MM-DD"),
  ad: nd.toADString(),
  year: nd.year,
  month: nd.month + 1,
  day: nd.day,
  monthName: MONTHS_EN[nd.month],
  monthNameNp: MONTHS_NP[nd.month],
  weekDay: nd.getDay(),
  weekDayName: WEEKDAYS_EN[nd.getDay()],
  weekDayNameNp: WEEKDAYS_NP[nd.getDay()],
  daysInMonth: getMonthLength(nd.year, nd.month),
  adDate: nd.toJSDate(),
});

/** Everything about a date, starting from AD. */
export const adToBsDetails = (ad) => details(adInput(ad));

/** Everything about a date, starting from BS. */
export const bsToAdDetails = (bs) => details(bsInput(bs));

/** Today's BS date (based on the device's local date). */
export const todayBs = (pattern = "YYYY-MM-DD", language = "english") =>
  formatNepaliDate(NepaliDate.fromGregorian(new Date()), pattern, language);

/** true if the BS date exists in the calendar data. */
export const isValidBsDate = (bs) => {
  try {
    bsInput(bs);
    return true;
  } catch (e) {
    return false;
  }
};

/** Number of days in a BS month (month is 1-12). */
export const getDaysInBsMonth = (year, month) => {
  if (!hasYear(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`No calendar data for BS ${year}-${month}`);
  }
  return getMonthLength(year, month - 1);
};

/** Supported BS years, e.g. { min: 1920, max: 2199 }. */
export const getBsYearRange = () => ({ min: FIRST_YEAR, max: LAST_YEAR });
