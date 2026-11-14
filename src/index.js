import NepaliCalendar from "./components/NepaliCalendar";
import {
  adToBs,
  adToBsDetails,
  bsToAd,
  bsToAdDate,
  bsToAdDetails,
  formatBs,
  getBsYearRange,
  getDaysInBsMonth,
  isValidBsDate,
  todayBs,
} from "./utils/convert";
import {
  NepaliDate,
  convertADtoBS,
  convertBStoAD,
  convertBStoJS,
  convertJStoBS,
  dateConverter,
} from "./utils/dateUtils";
import { toNepaliDateString, toNepaliNumber } from "./utils/numberUtils";

export default NepaliCalendar;

export {
  NepaliCalendar,
  NepaliDate,
  // simple conversion API
  adToBs,
  adToBsDetails,
  bsToAd,
  bsToAdDate,
  bsToAdDetails,
  // older names (still supported)
  convertADtoBS,
  convertBStoAD,
  convertBStoJS,
  convertJStoBS,
  dateConverter,
  formatBs,
  getBsYearRange,
  getDaysInBsMonth,
  isValidBsDate,
  toNepaliDateString,
  // number helpers
  toNepaliNumber,
  todayBs,
};
