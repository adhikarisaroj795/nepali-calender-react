import * as React from "react";
import { NepaliDate, CalendarLanguage } from "./convert";

export * from "./convert";

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
