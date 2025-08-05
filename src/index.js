import NepaliCalendar from "./components/NepaliCalendar";
import { toNepaliNumber, toNepaliDateString } from "./utils/numberUtils";
import {
  convertADtoBS,
  convertBStoAD,
  convertJStoBS,
  convertBStoJS,
  dateConverter,
} from "./utils/dateUtils";

export default NepaliCalendar;

export {
  toNepaliNumber,
  toNepaliDateString,
  convertADtoBS,
  convertBStoAD,
  convertJStoBS,
  convertBStoJS,
  dateConverter,
};
