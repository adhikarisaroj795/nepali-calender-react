import calendarData from "../data/NepaliDates.json";
import { toNepaliNumber } from "./numberUtils";

/*
 * All date math is done with "day numbers" (days since 1970-01-01) computed
 * via Date.UTC. That way results never depend on the user's timezone or DST.
 */
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const dayNumber = (year, month1, day) =>
  Math.round(Date.UTC(year, month1 - 1, day) / MS_PER_DAY);

const parseYMD = (str) => {
  if (typeof str !== "string" || !/^\d{4}-\d{1,2}-\d{1,2}$/.test(str.trim())) {
    throw new Error(`Invalid date string "${str}". Expected YYYY-MM-DD`);
  }
  return str.trim().split("-").map(Number);
};

const pad = (n) => String(n).padStart(2, "0");

const dayNumberToYMD = (n) => {
  const d = new Date(n * MS_PER_DAY);
  return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()];
};

const monthStartDayNumber = (monthData) => {
  const [y, m, d] = parseYMD(monthData.start);
  return dayNumber(y, m, d);
};

export class NepaliDate {
  constructor(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.validateDate();
  }

  validateDate() {
    const yearData = calendarData[String(this.year)];
    if (!yearData) {
      throw new Error(`No calendar data for year ${this.year}`);
    }
    if (
      !Number.isInteger(this.month) ||
      this.month < 0 ||
      this.month >= yearData.months.length
    ) {
      throw new Error(
        `Invalid month ${this.month}. Must be between 0-${
          yearData.months.length - 1
        }`,
      );
    }
    const daysInMonth = yearData.months[this.month].days;
    if (!Number.isInteger(this.day) || this.day < 1 || this.day > daysInMonth) {
      throw new Error(`Invalid day ${this.day} for month ${this.month}`);
    }
  }

  getYear() {
    return this.year;
  }
  getMonth() {
    return this.month;
  }
  getDate() {
    return this.day;
  }

  /** Days since 1970-01-01 for this date (timezone independent). */
  toDayNumber() {
    const monthData = calendarData[String(this.year)].months[this.month];
    return monthStartDayNumber(monthData) + this.day - 1;
  }

  /** Day of week, 0 = Sunday ... 6 = Saturday. */
  getDay() {
    return new Date(this.toDayNumber() * MS_PER_DAY).getUTCDay();
  }

  /** Comparable number (only meant for comparing NepaliDates). */
  getTime() {
    return this.toDayNumber() * MS_PER_DAY;
  }

  format(formatStr) {
    if (formatStr === "YYYY-MM-DD") {
      return `${this.year}-${pad(this.month + 1)}-${pad(this.day)}`;
    }
    return `${toNepaliNumber(this.day)} ${
      calendarData[String(this.year)].months[this.month].name
    } ${toNepaliNumber(this.year)}`;
  }

  /** Gregorian date as "YYYY-MM-DD". */
  toADString() {
    const [y, m, d] = dayNumberToYMD(this.toDayNumber());
    return `${y}-${pad(m)}-${pad(d)}`;
  }

  /** Gregorian date as a JS Date at local midnight of that calendar day. */
  toGregorian() {
    const [y, m, d] = dayNumberToYMD(this.toDayNumber());
    return new Date(y, m - 1, d);
  }

  toJSDate() {
    return this.toGregorian();
  }

  static fromDayNumber(n) {
    for (const [year, yearData] of Object.entries(calendarData)) {
      for (let month = 0; month < yearData.months.length; month++) {
        const monthData = yearData.months[month];
        const start = monthStartDayNumber(monthData);
        if (n >= start && n < start + monthData.days) {
          return new NepaliDate(Number(year), month, n - start + 1);
        }
      }
    }
    throw new Error("Date not found in calendar data");
  }

  /**
   * Accepts a JS Date (its local calendar day is used, the object is not
   * modified) or a "YYYY-MM-DD" string.
   */
  static fromGregorian(input) {
    if (typeof input === "string") {
      return NepaliDate.fromADString(input);
    }
    if (!(input instanceof Date) || isNaN(input.getTime())) {
      throw new Error(`Invalid date: ${input}`);
    }
    return NepaliDate.fromDayNumber(
      dayNumber(input.getFullYear(), input.getMonth() + 1, input.getDate()),
    );
  }

  static fromADString(adDateString) {
    const [y, m, d] = parseYMD(adDateString);
    return NepaliDate.fromDayNumber(dayNumber(y, m, d));
  }

  /** Parse a BS "YYYY-MM-DD" string (month is 1-based in the string). */
  static fromBSString(bsDateString) {
    const [y, m, d] = parseYMD(bsDateString);
    return new NepaliDate(y, m - 1, d);
  }

  static convert = {
    /** AD "YYYY-MM-DD" -> BS "YYYY-MM-DD" */
    ADtoBS: (adDateString) =>
      NepaliDate.fromADString(adDateString).format("YYYY-MM-DD"),

    /** BS "YYYY-MM-DD" -> AD "YYYY-MM-DD" */
    BStoAD: (bsDateString) =>
      NepaliDate.fromBSString(bsDateString).toADString(),

    /** JS Date (or "YYYY-MM-DD") -> BS "YYYY-MM-DD" */
    JStoBS: (jsDate) => NepaliDate.fromGregorian(jsDate).format("YYYY-MM-DD"),

    /** BS "YYYY-MM-DD" -> JS Date (local midnight) */
    BStoJS: (bsDateString) => NepaliDate.fromBSString(bsDateString).toJSDate(),
  };
}

export const convertADtoBS = (adDateString) =>
  NepaliDate.convert.ADtoBS(adDateString);
export const convertBStoAD = (bsDateString) =>
  NepaliDate.convert.BStoAD(bsDateString);
export const convertJStoBS = (jsDate) => NepaliDate.convert.JStoBS(jsDate);
export const convertBStoJS = (bsDateString) =>
  NepaliDate.convert.BStoJS(bsDateString);

export const dateConverter = {
  ADtoBS: NepaliDate.convert.ADtoBS,
  BStoAD: NepaliDate.convert.BStoAD,
  JStoBS: NepaliDate.convert.JStoBS,
  BStoJS: NepaliDate.convert.BStoJS,
  fromGregorian: NepaliDate.fromGregorian,
  fromADString: NepaliDate.fromADString,
};
