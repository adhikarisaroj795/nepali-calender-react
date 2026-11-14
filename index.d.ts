import * as React from "react";

export type DateParts = { year: number; month: number; day: number };
/** "YYYY-MM-DD" (also "YYYY/MM/DD", "YYYY.MM.DD", Nepali digits) or { year, month, day } with month 1-12. */
export type BsInput = string | DateParts | NepaliDate;
export type AdInput = string | DateParts | Date;
export type CalendarLanguage = "nepali" | "english";

export class NepaliDate {
  /** month is 0-11 here. */
  constructor(year: number, month: number, day: number);
  year: number;
  month: number;
  day: number;
  getYear(): number;
  getMonth(): number;
  getDate(): number;
  getDay(): number;
  getTime(): number;
  format(pattern?: string): string;
  toADString(): string;
  toGregorian(): Date;
  toJSDate(): Date;
  static fromGregorian(input: Date | string): NepaliDate;
  static fromADString(ad: string): NepaliDate;
  static fromBSString(bs: string): NepaliDate;
}

export interface NepaliCalendarChange {
  /** BS date, "YYYY-MM-DD" */
  bs: string;
  /** AD date, "YYYY-MM-DD" */
  ad: string;
  /** bsDate.month is 0-11 */
  bsDate: NepaliDate;
  adDate: Date;
}

export interface NepaliCalendarProps {
  /** Selected BS date, "YYYY-MM-DD" */
  value?: string;
  onChange?: (date: NepaliCalendarChange) => void;
  /** Earliest selectable BS date, "YYYY-MM-DD" */
  minDate?: string;
  /** Latest selectable BS date, "YYYY-MM-DD" */
  maxDate?: string;
  language?: CalendarLanguage;
  /** Any CSS color. Default "#4f46e5" */
  color?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  size?: "small" | "medium" | "large";
  variant?: "default" | "outlined" | "filled";
}

declare const NepaliCalendar: React.FC<NepaliCalendarProps>;
export default NepaliCalendar;
export { NepaliCalendar };

export interface BsDetails {
  bs: string;
  ad: string;
  year: number;
  /** 1-12 */
  month: number;
  day: number;
  monthName: string;
  monthNameNp: string;
  /** 0 = Sunday */
  weekDay: number;
  weekDayName: string;
  weekDayNameNp: string;
  daysInMonth: number;
  adDate: Date;
}

export function adToBs(
  ad: AdInput,
  pattern?: string,
  language?: CalendarLanguage,
): string;
export function bsToAd(bs: BsInput): string;
export function bsToAdDate(bs: BsInput): Date;
export function formatBs(
  bs: BsInput,
  pattern?: string,
  language?: CalendarLanguage,
): string;
export function adToBsDetails(ad: AdInput): BsDetails;
export function bsToAdDetails(bs: BsInput): BsDetails;
export function todayBs(pattern?: string, language?: CalendarLanguage): string;
export function isValidBsDate(bs: BsInput): boolean;
export function getDaysInBsMonth(year: number, month: number): number;
export function getBsYearRange(): { min: number; max: number };

export function toNepaliNumber(value: number | string): string;
export function toNepaliDateString(value: string): string;

export function convertADtoBS(ad: string): string;
export function convertBStoAD(bs: string): string;
export function convertJStoBS(date: Date | string): string;
export function convertBStoJS(bs: string): Date;
export const dateConverter: {
  ADtoBS(ad: string): string;
  BStoAD(bs: string): string;
  JStoBS(date: Date | string): string;
  BStoJS(bs: string): Date;
  fromGregorian(input: Date | string): NepaliDate;
  fromADString(ad: string): NepaliDate;
};
