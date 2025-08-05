import calendarData from "../data/NepaliDates.json";
import { toNepaliNumber } from "./numberUtils";

export class NepaliDate {
  constructor(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.validateDate();
  }

  validateDate() {
    const yearData = calendarData[this.year.toString()];
    if (!yearData) {
      throw new Error(`No calendar data for year ${this.year}`);
    }

    if (this.month < 0 || this.month >= yearData.months.length) {
      throw new Error(
        `Invalid month ${this.month}. Must be between 0-${
          yearData.months.length - 1
        }`
      );
    }

    const daysInMonth = yearData.months[this.month].days;
    if (this.day < 1 || this.day > daysInMonth) {
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

  getDay() {
    const gregorianStart =
      calendarData[this.year.toString()].months[this.month].start;
    const startDate = new Date(gregorianStart);
    const currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + this.day - 1
    );
    return currentDate.getDay();
  }

  format(formatStr) {
    if (formatStr === "YYYY-MM-DD") {
      return `${this.year}-${String(this.month + 1).padStart(2, "0")}-${String(
        this.day
      ).padStart(2, "0")}`;
    }
    return `${toNepaliNumber(this.day)} ${
      calendarData[this.year.toString()].months[this.month].name
    } ${toNepaliNumber(this.year)}`;
  }

  getTime() {
    const gregorianStart =
      calendarData[this.year.toString()].months[this.month].start;
    const startDate = new Date(gregorianStart);
    const currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + this.day - 1
    );
    return currentDate.getTime();
  }

  toGregorian() {
    const yearData = calendarData[this.year.toString()];
    if (!yearData) throw new Error(`No calendar data for year ${this.year}`);

    const monthData = yearData.months[this.month];
    if (!monthData) throw new Error(`No data for month ${this.month}`);

    // Parse the start date in UTC to avoid timezone issues
    const [y, m, d] = monthData.start.split("-").map(Number);
    const startDate = new Date(Date.UTC(y, m - 1, d));

    // Add the Nepali day offset (subtract 1 because days are 1-based)
    const result = new Date(startDate);
    result.setUTCDate(result.getUTCDate() + this.day - 1);
    return result;
  }

  static fromGregorian(input) {
    const dateToFind = input instanceof Date ? input : new Date(input);
    dateToFind.setHours(12, 0, 0, 0);

    const timeToFind = dateToFind.getTime();

    for (const [year, yearData] of Object.entries(calendarData)) {
      for (let month = 0; month < yearData.months.length; month++) {
        const monthData = yearData.months[month];
        const monthStart = new Date(monthData.start + "T12:00:00").getTime();
        const dayInMillis = 24 * 60 * 60 * 1000;
        const monthEnd = monthStart + monthData.days * dayInMillis;

        if (timeToFind >= monthStart && timeToFind < monthEnd) {
          const day = Math.floor((timeToFind - monthStart) / dayInMillis) + 1;
          return new NepaliDate(parseInt(year), month, day);
        }
      }
    }
    throw new Error("Date not found in calendar data");
  }

  static fromADString(adDateString) {
    const [year, month, day] = adDateString.split("-").map(Number);
    const jsDate = new Date(year, month - 1, day);
    return NepaliDate.fromGregorian(jsDate);
  }

  toADString() {
    const gregorianDate = this.toGregorian();
    return `${gregorianDate.getFullYear()}-${String(
      gregorianDate.getMonth() + 1
    ).padStart(2, "0")}-${String(gregorianDate.getDate()).padStart(2, "0")}`;
  }

  toJSDate() {
    return this.toGregorian();
  }

  static convert = {
    /**
     * Convert AD date string (YYYY-MM-DD) to BS date string (YYYY-MM-DD)
     */
    ADtoBS: (adDateString) => {
      const nepaliDate = NepaliDate.fromADString(adDateString);
      return nepaliDate.format("YYYY-MM-DD");
    },

    /**
     * Convert BS date string (YYYY-MM-DD) to AD date string (YYYY-MM-DD)
     */
    BStoAD: (bsDateString) => {
      const [year, month, day] = bsDateString.split("-").map(Number);
      const nepaliDate = new NepaliDate(year, month - 1, day);
      return nepaliDate.toADString();
    },

    /**
     * Convert JavaScript Date object to BS date string (YYYY-MM-DD)
     */
    JStoBS: (jsDate) => {
      const nepaliDate = NepaliDate.fromGregorian(jsDate);
      return nepaliDate.format("YYYY-MM-DD");
    },

    /**
     * Convert BS date string (YYYY-MM-DD) to JavaScript Date object
     */
    BStoJS: (bsDateString) => {
      const [year, month, day] = bsDateString.split("-").map(Number);
      const nepaliDate = new NepaliDate(year, month - 1, day);
      return nepaliDate.toJSDate();
    },
  };
}

export const convertADtoBS = (adDateString) =>
  NepaliDate.convert.ADtoBS(adDateString);
export const convertBStoAD = (bsDateString) =>
  NepaliDate.convert.BStoAD(bsDateString);
export const convertJStoBS = (jsDate) => NepaliDate.convert.JStoBS(jsDate);
export const convertBStoJS = (bsDateString) =>
  NepaliDate.convert.BStoJS(bsDateString);

// Unified converter object
export const dateConverter = {
  ADtoBS: NepaliDate.convert.ADtoBS,
  BStoAD: NepaliDate.convert.BStoAD,
  JStoBS: NepaliDate.convert.JStoBS,
  BStoJS: NepaliDate.convert.BStoJS,
  fromGregorian: NepaliDate.fromGregorian,
  fromADString: NepaliDate.fromADString,
};
