# Nepali Calendar React

[![npm version](https://img.shields.io/npm/v/@adhikarisaroj795/nepali-calendar-react.svg)](https://www.npmjs.com/package/@adhikarisaroj795/nepali-calendar-react) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Nepali (Bikram Sambat) date picker and AD ↔ BS date converter. It works in React, in a plain HTML page, in other frameworks, and in Node.js.

- Date picker in Nepali or English
- One-line conversion: `adToBs("2026-11-14")` → `"2083-07-28"`
- Covers BS 1920–2199 (AD 1863–2143)
- Keyboard support: arrow keys, Page Up/Down, Home/End, Enter, Escape
- Same result in every timezone
- Safe to import in server-rendered apps (Next.js, Remix)
- TypeScript types included

## Which one do I use?

| Where                              | What to load                                                  |
| ---------------------------------- | ------------------------------------------------------------- |
| React                              | `@adhikarisaroj795/nepali-calendar-react`                     |
| Plain HTML page                    | `dist/standalone.js` with a `<script>` tag                    |
| Vue, Svelte, Angular, no framework | `@adhikarisaroj795/nepali-calendar-react/standalone`          |
| Node.js, or conversion only        | `@adhikarisaroj795/nepali-calendar-react/convert`             |

## Installation

```bash
npm install @adhikarisaroj795/nepali-calendar-react
```

For a plain HTML page you do not need to install anything. See [Plain HTML](#plain-html).

## React

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

### Options

These are the props in React, and the options of `create()` everywhere else.

| Option        | Type       | Default        | Description                                        |
| ------------- | ---------- | -------------- | -------------------------------------------------- |
| `value`       | `string`   | today          | Selected BS date, `"YYYY-MM-DD"`                   |
| `onChange`    | `function` | -              | Called with the selected date (see below)          |
| `language`    | `string`   | `"nepali"`     | `"nepali"` or `"english"`                          |
| `color`       | `string`   | `"#4f46e5"`    | Theme color. Any CSS color: `"#DC143C"`, `"green"` |
| `minDate`     | `string`   | -              | Earliest selectable BS date, `"YYYY-MM-DD"`        |
| `maxDate`     | `string`   | -              | Latest selectable BS date, `"YYYY-MM-DD"`          |
| `size`        | `string`   | `"medium"`     | `"small"`, `"medium"` or `"large"`                 |
| `variant`     | `string`   | `"default"`    | `"default"`, `"outlined"` or `"filled"`            |
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

### Keyboard

| Key                         | What it does                                   |
| --------------------------- | ---------------------------------------------- |
| `↓`, `Enter` or `Space`     | On the input: opens the calendar               |
| `←` `→`                     | Previous / next day                            |
| `↑` `↓`                     | Same weekday in the previous / next week       |
| `Page Up` / `Page Down`     | Previous / next month                          |
| `Home` / `End`              | First / last day of the month                  |
| `Enter` or `Space`          | Picks the focused day                          |
| `Escape`                    | Closes the calendar                            |

## Plain HTML

Add one script tag. It gives you the date picker and all the conversion functions, with nothing else to install.

```html
<div id="dob"></div>

<script src="https://unpkg.com/@adhikarisaroj795/nepali-calendar-react/dist/standalone.js"></script>
<script>
  const picker = NepaliDatePicker.create("#dob", {
    language: "nepali",
    color: "#16a34a",
    onChange: (date) => console.log(date.bs, date.ad),
  });

  console.log(NepaliDatePicker.adToBs("2026-11-14")); // "2083-07-28"
</script>
```

`NepaliDatePicker.create(target, options)` puts a date picker inside an element. `target` is a CSS selector or an element. It returns an object with these methods:

| Method                | What it does                                          |
| --------------------- | ----------------------------------------------------- |
| `getValue()`          | Returns `{ bs, ad }` of the selected date             |
| `setValue(bs)`        | Selects a BS date, `"YYYY-MM-DD"`                     |
| `update(options)`     | Changes options, e.g. `update({ language: "english" })` |
| `destroy()`           | Removes the picker from the page                      |

To always load the same release, put a version in the address, for example `.../nepali-calendar-react@1/dist/standalone.js`.

## Vue, Svelte, Angular and others

Use the same `create()` function from the `/standalone` entry. Call it when your element is on the page, and call `destroy()` when it is removed.

```js
import { create } from "@adhikarisaroj795/nepali-calendar-react/standalone";

const picker = create(document.getElementById("dob"), {
  language: "english",
  onChange: (date) => console.log(date.bs, date.ad),
});

// later, when the element goes away
picker.destroy();
```

## Node.js, or conversion only

The `/convert` entry has only the conversion functions. It does not need React.

```js
// CommonJS
const { adToBs, bsToAd } = require("@adhikarisaroj795/nepali-calendar-react/convert");

// ES modules
import { adToBs, bsToAd } from "@adhikarisaroj795/nepali-calendar-react/convert";

adToBs("2026-11-14"); // "2083-07-28"
bsToAd("2083-07-28"); // "2026-11-14"
```

For a plain HTML page that only needs conversion, there is a smaller script: `dist/convert.js`. It adds a global called `NepaliDateConverter`.

## Date conversion

The same functions are available from every entry.

```js
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
adToBs("2026-11-14", "D MMMM YYYY, dddd", "nepali"); // "२८ कात्तिक २०८३, शनिबार"
formatBs("2083-07-28", "dddd, MMMM D, YYYY");        // "Saturday, Kartik 28, 2083"
todayBs();                                           // today's BS date
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
| `getBsYearRange()`                        | `{ min: 1920, max: 2199 }`                   |
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

Dates outside BS 1920–2199, and invalid dates, throw an `Error`.

The older functions `convertADtoBS`, `convertBStoAD`, `convertJStoBS`, `convertBStoJS` and `dateConverter` still work.

## About the dates

The Bikram Sambat calendar has no formula. The length of each month is decided year by year, so this package ships a table of month lengths for BS 1920–2199.

Past and current years match the published calendar. Month lengths for future years are projections, and different sources do not always agree on them. A converted date in a future year can therefore be a day off from the calendar that is eventually published. The table is updated in new releases.

## Development

```bash
npm install
npm run dev    # React demo page with live reload
npm test       # builds, then runs the tests in six timezones
```

The date table lives in `src/data/NepaliDates.json`. Every build checks it (12 months per year, 29–32 days per month, each month starting the day after the previous one ends, 365 or 366 days per year) and stops with a message if something is wrong.

After `npm run build`, open `demo/plain.html` in a browser to see the plain HTML version.

## License

MIT © [adhikarisaroj795](https://github.com/adhikarisaroj795)

## Support

If you find a problem, please [open an issue](https://github.com/adhikarisaroj795/nepali-calender-react/issues).
