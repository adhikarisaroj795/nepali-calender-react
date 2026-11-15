// Types for the standalone calendar (plain HTML, Vue, Svelte, Angular...).
import { NepaliDate, CalendarLanguage } from "./convert";

export * from "./convert";

export interface NepaliDatePickerChange {
  /** BS date, "YYYY-MM-DD" */
  bs: string;
  /** AD date, "YYYY-MM-DD" */
  ad: string;
  /** bsDate.month is 0-11 */
  bsDate: NepaliDate;
  adDate: Date;
}

export interface NepaliDatePickerOptions {
  /** Selected BS date, "YYYY-MM-DD". Defaults to today. */
  value?: string;
  onChange?: (date: NepaliDatePickerChange) => void;
  /** Earliest selectable BS date, "YYYY-MM-DD" */
  minDate?: string;
  /** Latest selectable BS date, "YYYY-MM-DD" */
  maxDate?: string;
  language?: CalendarLanguage;
  /** Any CSS color. Default "#4f46e5" */
  color?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Size of the input. Default "medium" */
  size?: "small" | "medium" | "large";
  /** Look of the input. Default "default" */
  variant?: "default" | "outlined" | "filled";
  id?: string;
  name?: string;
}

export interface NepaliDatePickerInstance {
  /** The element the picker lives in. */
  element: Element;
  /** The selected date. */
  getValue(): { bs: string; ad: string } | null;
  /** Select a BS date, "YYYY-MM-DD". */
  setValue(bs: string): void;
  /** Change options, e.g. update({ language: "english" }). */
  update(options: NepaliDatePickerOptions): void;
  /** Remove the picker from the page. */
  destroy(): void;
}

/** Put a Nepali date picker inside an element (CSS selector or element). */
export function create(
  target: string | Element,
  options?: NepaliDatePickerOptions
): NepaliDatePickerInstance;
