/*
 * Date conversion only - no React. This is the entry for the
 * "@adhikarisaroj795/nepali-calendar-react/convert" build, which works in
 * Node.js and in a plain HTML page.
 */
export {
  adToBs,
  bsToAd,
  bsToAdDate,
  formatBs,
  adToBsDetails,
  bsToAdDetails,
  todayBs,
  isValidBsDate,
  getDaysInBsMonth,
  getBsYearRange,
} from "./utils/convert";

export { toNepaliNumber, toNepaliDateString } from "./utils/numberUtils";

export {
  NepaliDate,
  convertADtoBS,
  convertBStoAD,
  convertJStoBS,
  convertBStoJS,
  dateConverter,
} from "./utils/dateUtils";
