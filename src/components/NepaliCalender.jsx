import React, { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import "./nepalicalender.css";

import calendarData from "./NepaliDates.json";

const weekDays = ["आइत", "सोम", "मङ्गल", "बुध", "बिही", "शुक्र", "शनि"];

const toNepaliNumber = (num) => {
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return num
    .toString()
    .split("")
    .map((digit) => nepaliDigits[digit] || digit)
    .join("");
};

const toNepaliDateString = (dateString) => {
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return dateString.replace(/\d/g, (match) => nepaliDigits[match] || match);
};

class NepaliDate {
  constructor(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.validateDate();
  }

  validateDate() {
    const yearData = calendarData[this.year.toString()];
    if (!yearData) {
      throw new Error(`No calendar data for year ${this.year}`);
    }

    if (this.month < 0 || this.month >= yearData.months.length) {
      throw new Error(
        `Invalid month ${this.month}. Must be between 0-${
          yearData.months.length - 1
        }`
      );
    }

    const daysInMonth = yearData.months[this.month].days;
    if (this.day < 1 || this.day > daysInMonth) {
      throw new Error(`Invalid day ${this.day} for month ${this.month}`);
    }
  }

  getYear() {
    return this.year;
  }
  getMonth() {
    return this.month;
  }
  getDate() {
    return this.day;
  }

  getDay() {
    const gregorianStart =
      calendarData[this.year.toString()].months[this.month].start;
    const startDate = new Date(gregorianStart);
    const currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + this.day - 1
    );
    return currentDate.getDay();
  }

  format(formatStr) {
    if (formatStr === "YYYY-MM-DD") {
      return `${this.year}-${String(this.month + 1).padStart(2, "0")}-${String(
        this.day
      ).padStart(2, "0")}`;
    }
    return `${toNepaliNumber(this.day)} ${
      calendarData[this.year.toString()].months[this.month].name
    } ${toNepaliNumber(this.year)}`;
  }

  getTime() {
    const gregorianStart =
      calendarData[this.year.toString()].months[this.month].start;
    const startDate = new Date(gregorianStart);
    const currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + this.day - 1
    );
    return currentDate.getTime();
  }

  static fromGregorian(gregorianDate) {
    const dateToFind =
      gregorianDate instanceof Date ? gregorianDate : new Date(gregorianDate);
    const timeToFind = dateToFind.getTime();

    for (const [year, yearData] of Object.entries(calendarData)) {
      for (let month = 0; month < yearData.months.length; month++) {
        const monthData = yearData.months[month];
        const monthStart = new Date(monthData.start).getTime();
        const monthEnd = monthStart + monthData.days * 24 * 60 * 60 * 1000;

        if (timeToFind >= monthStart && timeToFind < monthEnd) {
          const day =
            Math.floor((timeToFind - monthStart) / (24 * 60 * 60 * 1000)) + 1;
          return new NepaliDate(parseInt(year), month, day);
        }
      }
    }
    throw new Error("Date not found in calendar data");
  }
}

const NepaliCalendar = ({
  onChange,
  value,
  minDate,
  maxDate,
  placeholder = "मिति छान्नुहोस्",
  disabled = false,
  size = "medium",
  variant = "default",
}) => {
  const today = useMemo(() => NepaliDate.fromGregorian(new Date()), []);

  const initialDate = useMemo(() => {
    if (value) {
      try {
        const [year, month, day] = value.split("-").map(Number);
        return new NepaliDate(year, month - 1, day);
      } catch (e) {
        console.error("Invalid initial date:", value, e);
        return today;
      }
    }
    return today;
  }, [value, today]);

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [visibleMonth, setVisibleMonth] = useState(
    new NepaliDate(initialDate.getYear(), initialDate.getMonth(), 1)
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState("below");
  const inputRef = useRef(null);
  const calendarRef = useRef(null);

  const availableYears = useMemo(
    () =>
      Object.keys(calendarData)
        .map(Number)
        .sort((a, b) => a - b),
    []
  );

  const currentMonthData = useMemo(
    () =>
      calendarData[visibleMonth.getYear().toString()]?.months[
        visibleMonth.getMonth()
      ],
    [visibleMonth]
  );

  const calendarDays = useMemo(() => {
    const days = [];
    if (!currentMonthData) return days;

    for (let day = 1; day <= currentMonthData.days; day++) {
      days.push(
        new NepaliDate(visibleMonth.getYear(), visibleMonth.getMonth(), day)
      );
    }
    return days;
  }, [currentMonthData, visibleMonth]);

  const calendarGrid = useMemo(() => {
    if (!calendarDays.length) return [];

    const firstDay = calendarDays[0].getDay();
    const blanks = Array(firstDay).fill(null);
    return [...blanks, ...calendarDays];
  }, [calendarDays]);

  const isDateDisabled = useMemo(() => {
    let minDateObj = null;
    let maxDateObj = null;

    if (minDate) {
      try {
        const [minYear, minMonth, minDay] = minDate.split("-").map(Number);
        minDateObj = new NepaliDate(minYear, minMonth - 1, minDay);
      } catch (e) {
        console.error("Invalid minDate:", minDate, e);
      }
    }

    if (maxDate) {
      try {
        const [maxYear, maxMonth, maxDay] = maxDate.split("-").map(Number);
        maxDateObj = new NepaliDate(maxYear, maxMonth - 1, maxDay);
      } catch (e) {
        console.error("Invalid maxDate:", maxDate, e);
      }
    }

    return (date) => {
      if (!date) return true;
      if (minDateObj && date.getTime() < minDateObj.getTime()) return true;
      if (maxDateObj && date.getTime() > maxDateObj.getTime()) return true;
      return false;
    };
  }, [minDate, maxDate]);

  const handleDateClick = (date) => {
    if (!date || isDateDisabled(date)) return;
    setSelectedDate(date);
    setIsCalendarOpen(false);
    onChange?.(date.format("YYYY-MM-DD"));
  };

  const handlePrevMonth = (e) => {
    e.preventDefault();
    const currentYear = visibleMonth.getYear();
    const currentMonth = visibleMonth.getMonth();

    if (currentMonth > 0) {
      setVisibleMonth(new NepaliDate(currentYear, currentMonth - 1, 1));
    } else {
      const prevYear = availableYears.find((y) => y < currentYear);
      if (prevYear !== undefined) {
        const monthsInPrevYear =
          calendarData[prevYear.toString()].months.length;
        setVisibleMonth(new NepaliDate(prevYear, monthsInPrevYear - 1, 1));
      }
    }
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    const currentYear = visibleMonth.getYear();
    const currentMonth = visibleMonth.getMonth();
    const monthsInCurrentYear =
      calendarData[currentYear.toString()].months.length;

    if (currentMonth < monthsInCurrentYear - 1) {
      setVisibleMonth(new NepaliDate(currentYear, currentMonth + 1, 1));
    } else {
      const nextYear = availableYears.find((y) => y > currentYear);
      if (nextYear !== undefined) {
        setVisibleMonth(new NepaliDate(nextYear, 0, 1));
      }
    }
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    const currentMonth = Math.min(
      visibleMonth.getMonth(),
      calendarData[newYear.toString()].months.length - 1
    );
    setVisibleMonth(new NepaliDate(newYear, currentMonth, 1));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isCalendarOpen]);

  useEffect(() => {
    if (isCalendarOpen && inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - inputRect.bottom;
      setPopupPosition(spaceBelow < 350 ? "above" : "below");
    }
  }, [isCalendarOpen]);

  useEffect(() => {
    if (value) {
      try {
        const [year, month, day] = value.split("-").map(Number);
        const newDate = new NepaliDate(year, month - 1, day);
        setSelectedDate(newDate);
        setVisibleMonth(new NepaliDate(year, month - 1, 1));
      } catch (error) {
        console.error("Invalid date value provided:", value, error);
      }
    }
  }, [value]);

  return (
    <div className={`nepali-calendar-container ${size} ${variant}`}>
      <div className="nepali-calendar-input-wrapper">
        <input
          ref={inputRef}
          value={
            selectedDate
              ? toNepaliDateString(selectedDate.format("YYYY-MM-DD"))
              : ""
          }
          onFocus={() => !disabled && setIsCalendarOpen(true)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className={`nepali-calendar-input ${disabled ? "disabled" : ""}`}
          aria-label="नेपाली मिति छान्नुहोस्"
          aria-haspopup="dialog"
          aria-expanded={isCalendarOpen}
        />
        <div className="nepali-calendar-icon">📅</div>
      </div>

      {isCalendarOpen && (
        <div
          className={`nepali-calendar-popup ${popupPosition}`}
          ref={calendarRef}
          style={{
            position: "absolute",
            [popupPosition === "above" ? "bottom" : "top"]: "100%",
            zIndex: 1000,
          }}
          role="dialog"
          aria-modal="true"
          aria-label="नेपाली क्यालेन्डर"
        >
          <div className="nepali-calendar-header">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="nepali-calendar-nav-button"
              aria-label="अघिल्लो महिना"
              disabled={
                visibleMonth.getMonth() === 0 &&
                !availableYears.includes(visibleMonth.getYear() - 1)
              }
            >
              ‹
            </button>

            <div className="nepali-calendar-month-selector">
              <select
                value={visibleMonth.getYear()}
                onChange={handleYearChange}
                className="nepali-calendar-year-select"
                aria-label="वर्ष चयन गर्नुहोस्"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {toNepaliNumber(year)}
                  </option>
                ))}
              </select>
              <span className="nepali-calendar-month-name">
                {currentMonthData?.name || ""}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="nepali-calendar-nav-button"
              aria-label="अर्को महिना"
              disabled={
                visibleMonth.getMonth() ===
                  calendarData[visibleMonth.getYear().toString()].months
                    .length -
                    1 && !availableYears.includes(visibleMonth.getYear() + 1)
              }
            >
              ›
            </button>
          </div>

          <div className="nepali-calendar-grid">
            <div className="nepali-calendar-weekdays">
              {weekDays.map((day) => (
                <div key={day} className="nepali-calendar-weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="nepali-calendar-days">
              {calendarGrid.map((date, i) => {
                const isToday =
                  date?.format("YYYY-MM-DD") === today.format("YYYY-MM-DD");
                const isSelected =
                  date?.format("YYYY-MM-DD") ===
                  selectedDate?.format("YYYY-MM-DD");
                const isDisabled = isDateDisabled(date);

                return (
                  <button
                    key={i}
                    type="button"
                    className={`nepali-calendar-day ${
                      isSelected ? "selected" : ""
                    } ${isToday && !isSelected ? "today" : ""} ${
                      isDisabled ? "disabled" : ""
                    }`}
                    onClick={() => handleDateClick(date)}
                    disabled={isDisabled}
                    aria-label={
                      date
                        ? `${date.format("YYYY-MM-DD")}${isToday ? ", आज" : ""}`
                        : "खाली दिन"
                    }
                    aria-current={isToday ? "date" : undefined}
                    aria-selected={isSelected}
                  >
                    {date ? toNepaliNumber(date.getDate()) : ""}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="nepali-calendar-footer">
            <button
              type="button"
              className="nepali-calendar-today-button"
              onClick={() => handleDateClick(today)}
              disabled={isDateDisabled(today)}
            >
              आज
            </button>
            <button
              type="button"
              className="nepali-calendar-close-button"
              onClick={() => setIsCalendarOpen(false)}
            >
              बन्द गर्नुहोस्
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

NepaliCalendar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["default", "outlined", "filled"]),
};

export default NepaliCalendar;
