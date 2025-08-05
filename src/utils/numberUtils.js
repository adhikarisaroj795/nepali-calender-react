export const toNepaliNumber = (num) => {
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return num
    .toString()
    .split("")
    .map((digit) => nepaliDigits[digit] || digit)
    .join("");
};

export const toNepaliDateString = (dateString) => {
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return dateString.replace(/\d/g, (match) => nepaliDigits[match] || match);
};

export const toLocalizedNumber = (number, language = "nepali") => {
  if (language === "english") {
    return number.toString();
  }
  return toNepaliNumber(number);
};

export const translations = {
  nepali: {
    weekDays: ["आइत", "सोम", "मङ्गल", "बुध", "बिही", "शुक्र", "शनि"],
    placeholder: "मिति छान्नुहोस्",
    today: "आज",
    close: "बन्द गर्नुहोस्",
    ariaLabels: {
      selectDate: "नेपाली मिति छान्नुहोस्",
      calendar: "नेपाली क्यालेन्डर",
      prevMonth: "अघिल्लो महिना",
      nextMonth: "अर्को महिना",
      selectYear: "वर्ष चयन गर्नुहोस्",
    },
    monthNames: [
      "बैशाख",
      "जेठ",
      "असार",
      "साउन",
      "भदौ",
      "असोज",
      "कात्तिक",
      "मंसिर",
      "पुष",
      "माघ",
      "फाल्गुन",
      "चैत्र",
    ],
  },
  english: {
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    placeholder: "Select date",
    today: "Today",
    close: "Close",
    ariaLabels: {
      selectDate: "Select Nepali date",
      calendar: "Nepali Calendar",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      selectYear: "Select year",
    },
    monthNames: [
      "Baisakh",
      "Jestha",
      "Ashad",
      "Shrawan",
      "Bhadra",
      "Ashwin",
      "Kartik",
      "Mangsir",
      "Poush",
      "Magh",
      "Falgun",
      "Chaitra",
    ],
  },
};
