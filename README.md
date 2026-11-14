# Nepali Calendar React

[![npm version](https://img.shields.io/npm/v/@adhikarisaroj795/nepali-calendar-react.svg)](https://www.npmjs.com/package/@adhikarisaroj795/nepali-calendar-react) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Nepali (Bikram Sambat) date picker for React, plus simple AD ↔ BS date conversion.

- Date picker in Nepali or English
- One-line conversion: `adToBs("2026-11-14")` → `"2083-07-28"`
- Covers BS 2000–2099 (AD 1943–2043)
- Same result in every timezone
- Safe to import in server-rendered apps (Next.js, Remix)
- TypeScript types included

## Installation

```bash
npm install @adhikarisaroj795/nepali-calendar-react
```

## Date picker

```jsx
import { useState } from "react";
import NepaliCalendar from "@adhikarisaroj795/nepali-calendar-react";

export default function App() {
  const [date, setDate] = useState(null);

  return (
    <div>
      <NepaliCalendar language="nepali" color="#16a34a" onChange={setDate} />
      {date && (
        <p>
          BS: {date.bs} / AD: {date.ad}
        </p>
      )}
    </div>
  );
}
```

The styles are added automatically. You do not need to import a CSS file.

### Props

| Prop          | Type       | Default        | Description                                        |
| ------------- | ---------- | -------------- | -------------------------------------------------- |
| `value`       | `string`   | today          | Selected BS date, `"YYYY-MM-DD"`                   |
| `onChange`    | `function` | -              | Called with the selected date (see below)          |
| `language`    | `string`   | `"nepali"`     | `"nepali"` or `"english"`                          |
| `color`       | `string`   | `"#4f46e5"`    | Theme color. Any CSS color: `"#DC143C"`, `"green"` |
| `minDate`     | `string`   | -              | Earliest selectable BS date, `"YYYY-MM-DD"`        |
| `maxDate`     | `string`   | -              | Latest selectable BS date, `"YYYY-MM-DD"`          |
| `placeholder` | `string`   | by language    | Placeholder text                                   |
| `disabled`    | `boolean`  | `false`        | Disables the input                                 |
| `id`          | `string`   | -              | `id` of the input                                  |
| `name`        | `string`   | `"nepaliDate"` | `name` of the input                                |

### onChange value

```js
{
  bs: "2083-07-28",   // BS date string
  ad: "2026-11-14",   // AD date string
  bsDate: NepaliDate, // bsDate.year, bsDate.month (0-11), bsDate.day
  adDate: Date        // JavaScript Date
}
```

If you do not pass `value`, the picker starts on today and calls `onChange` once with today's date when it first appears.

## Date conversion

```js
import { adToBs, bsToAd } from "@adhikarisaroj795/nepali-calendar-react";

adToBs("2026-11-14"); // "2083-07-28"
bsToAd("2083-07-28"); // "2026-11-14"
```

Input can be a string, an object, or (for AD) a JavaScript `Date`:

```js
adToBs(new Date());
adToBs({ year: 2026, month: 11, day: 14 });
bsToAd("2083/7/28");
bsToAd("२०८३-०७-२८");
```

In these functions, months are always 1–12.

### Formatting

```js
import {
  adToBs,
  formatBs,
  todayBs,
} from "@adhikarisaroj795/nepali-calendar-react";

adToBs("2026-11-14", "D MMMM YYYY, dddd", "nepali"); // "२८ कात्तिक २०८३, शनिबार"
formatBs("2083-07-28", "dddd, MMMM D, YYYY"); // "Saturday, Kartik 28, 2083"
todayBs(); // today's BS date
```

| Token  | Meaning         | Example    |
| ------ | --------------- | ---------- |
| `YYYY` | Year            | `2083`     |
| `MM`   | Month, 2 digits | `07`       |
| `M`    | Month           | `7`        |
| `MMMM` | Month name      | `Kartik`   |
| `DD`   | Day, 2 digits   | `28`       |
| `D`    | Day             | `28`       |
| `dddd` | Weekday name    | `Saturday` |

Put text you want kept as-is in square brackets: `"[BS] YYYY-MM-DD"`.

### All functions

| Function                                  | Returns                                      |
| ----------------------------------------- | -------------------------------------------- |
| `adToBs(ad, pattern?, language?)`         | BS date string                               |
| `bsToAd(bs)`                              | AD date string, `"YYYY-MM-DD"`               |
| `bsToAdDate(bs)`                          | JavaScript `Date`                            |
| `formatBs(bs, pattern?, language?)`       | Formatted BS date string                     |
| `adToBsDetails(ad)` / `bsToAdDetails(bs)` | Object with year, month, day, names, weekday |
| `todayBs(pattern?, language?)`            | Today's BS date string                       |
| `isValidBsDate(bs)`                       | `true` or `false`                            |
| `getDaysInBsMonth(year, month)`           | Number of days in that BS month              |
| `getBsYearRange()`                        | `{ min: 2000, max: 2099 }`                   |
| `toNepaliNumber(value)`                   | `12345` → `"१२३४५"`                          |

`adToBsDetails("2026-11-14")` returns:

```js
{
  bs: "2083-07-28",
  ad: "2026-11-14",
  year: 2083,
  month: 7,
  day: 28,
  monthName: "Kartik",
  monthNameNp: "कात्तिक",
  weekDay: 6,
  weekDayName: "Saturday",
  weekDayNameNp: "शनिबार",
  daysInMonth: 30,
  adDate: Date
}
```

Dates outside BS 2000–2099, and invalid dates, throw an `Error`.

The older functions `convertADtoBS`, `convertBStoAD`, `convertJStoBS`, `convertBStoJS` and `dateConverter` still work.

## Development

```bash
npm install
npm run dev    # demo page with live reload
npm test       # builds, then runs the tests in six timezones
```

## License

MIT © [adhikarisaroj795](https://github.com/adhikarisaroj795)

## Support

If you find a problem, please [open an issue](https://github.com/adhikarisaroj795/nepali-calender-react/issues).
