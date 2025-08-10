# Nepali Calendar React

[![npm version](https://badge.fury.io/js/nepali-calendar-react.svg)](https://badge.fury.io/js/nepali-calendar-react) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive Nepali calendar component for React applications.

## Features

- Accurate Nepali date calculations based on official data
- Supports both Bikram Sambat and Gregorian dates
- Fully customizable styling
- Accessibility support
- Localized Nepali number display

## Installation

```bash
npm install @adhikarisaroj795/nepali-calendar-react
# or
yarn add @adhikarisaroj795/nepali-calendar-react
```

## Usage

Here is a basic example of how to use the calendar component in your React application.

```jsx
import React, { useState } from "react";
import NepaliCalendar from "@adhikarisaroj795/nepali-calendar-react";

const App = () => {
  const [dateObject, setDateObject] = useState(null);

  const handleChange = (newDateObject) => {
    setDateObject(newDateObject);
    console.log("Selected date:", newDateObject);
  };

  return (
    <div>
      <h2>Select a Date</h2>
      <NepaliCalendar color="green" language="nepali" onChange={handleChange} />
      {dateObject && (
        <div>
          <p>Bikram Sambat: {dateObject.bs}</p>
          <p>Gregorian Date: {dateObject.ad}</p>
          <p>
            BS Object: Year {dateObject.bsDate.year}, Month{" "}
            {dateObject.bsDate.month + 1}, Day {dateObject.bsDate.day}
          </p>
          <p>AD Date Object: {dateObject.adDate.toDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default App;
```

### Date Object Structure

The `onChange` callback receives a comprehensive date object with the following structure:

```javascript
{
  bs: "2082-04-20",                    // Bikram Sambat date string (YYYY-MM-DD)
  ad: "2025-08-05",                    // Gregorian date string (YYYY-MM-DD)
  bsDate: {                            // Bikram Sambat date object
    year: 2082,
    month: 3,                          // 0-indexed (3 = 4th month)
    day: 20
  },
  adDate: Date                         // JavaScript Date object for Gregorian date
}
```

**Note**: The `month` in `bsDate` is 0-indexed (0 = first month, 11 = twelfth month), similar to JavaScript Date objects.

## API Reference

### Props

| Prop       | Type       | Default     | Description                                  |
| ---------- | ---------- | ----------- | -------------------------------------------- |
| `color`    | `string`   | -           | Color theme for the calendar                 |
| `language` | `string`   | `"english"` | Display language (`"english"` or `"nepali"`) |
| `onChange` | `function` | -           | Callback function when date is selected      |

## Utility Functions

The package also exports useful utility functions for date conversion and number formatting:

```jsx
import {
  convertADtoBS,
  convertBStoAD,
  toNepaliNumber,
} from "@adhikarisaroj795/nepali-calendar-react";

// Convert English date to Bikram Sambat
const englishDate = "2025-08-05";
const nepaliDate = convertADtoBS(englishDate);
console.log(nepaliDate); // Output: "2082-04-20"

// Convert Bikram Sambat to English date
const bsDate = "2082-04-20";
const adDate = convertBStoAD(bsDate);
console.log(adDate); // Output: "2025-08-05"

// Convert numbers to Nepali numerals
const englishNumber = 12345;
const nepaliNumber = toNepaliNumber(englishNumber);
console.log(nepaliNumber); // Output: "१२३४५"
```

## License

MIT © [adhikarisaroj795](https://github.com/adhikarisaroj795)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/adhikarisaroj795/nepali-calender-react/issues) on GitHub.
