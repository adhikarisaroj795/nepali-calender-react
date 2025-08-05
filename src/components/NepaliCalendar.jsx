import React, { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import "../../styles/nepalicalender.css";

import calendarData from "../data/NepaliDates.json";
import { NepaliDate } from "../utils/dateUtils";
import {
  toLocalizedNumber,
  toNepaliDateString,
  translations,
} from "../utils/numberUtils";

const NepaliCalendar = ({
  onChange,
  value,
  minDate,
  maxDate,
  placeholder = "मिति छान्नुहोस्",
  disabled = false,
  size = "medium",
  color = "#4f46e5",
  language = "nepali",
  variant = "default",
}) => {
  const today = useMemo(() => NepaliDate.fromGregorian(new Date()), []);

  const {
    weekDays,
    placeholder: translatedPlaceholder,
    today: todayText,
    close: closeText,
    ariaLabels,
    monthNames,
  } = translations[language];

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

  useEffect(() => {
    if (!value && onChange) {
      const initialBsDate = today.format("YYYY-MM-DD");
      const initialAdDate = today.toGregorian().toISOString().split("T")[0];
      onChange({
        bs: initialBsDate,
        ad: initialAdDate,
        bsDate: today,
        adDate: today.toGregorian(),
      });
    }
  }, [today, value]);

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
    const gregorianDate = date.toGregorian();
    setSelectedDate(date);
    setIsCalendarOpen(false);
    // onChange?.(date.format("YYYY-MM-DD"));
    if (onChange) {
      onChange({
        bs: date.format("YYYY-MM-DD"),
        ad: gregorianDate.toISOString().split("T")[0],
        bsDate: date,
        adDate: gregorianDate,
      });
    }
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
    <div
      className={`nepali-calendar-container ${size} ${variant}`}
      style={
        color
          ? {
              "--calendar-color": color,
              "--calendar-color-light": `${color}20`,
              "--calendar-color-dark": `${color}30`,
            }
          : {}
      }
    >
      <div className="nepali-calendar-input-wrapper">
        <input
          ref={inputRef}
          value={
            selectedDate
              ? language === "english"
                ? selectedDate.format("YYYY-MM-DD")
                : toNepaliDateString(selectedDate.format("YYYY-MM-DD"))
              : ""
          }
          id="nepali-date"
          name="nepaliDate"
          onFocus={() => !disabled && setIsCalendarOpen(true)}
          placeholder={placeholder || translatedPlaceholder}
          style={{
            "--placeholder-color": color ? `${color}80` : "#4f46e580",
          }}
          readOnly
          disabled={disabled}
          className={`nepali-calendar-input ${disabled ? "disabled" : ""}`}
          aria-label={ariaLabels.selectDate}
          aria-haspopup="dialog"
          aria-expanded={isCalendarOpen}
        />
        <div className="nepali-calendar-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="7" y1="14" x2="7" y2="18" />
            <line x1="12" y1="14" x2="12" y2="18" />
            <line x1="17" y1="14" x2="17" y2="18" />
          </svg>
        </div>
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
                    {toLocalizedNumber(year, language)}
                  </option>
                ))}
              </select>
              <span className="nepali-calendar-month-name">
                {monthNames[visibleMonth.getMonth()]}
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
                    {date ? toLocalizedNumber(date.getDate(), language) : ""}
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
              {todayText}
            </button>
            <button
              type="button"
              className="nepali-calendar-close-button"
              onClick={() => setIsCalendarOpen(false)}
            >
              {closeText}
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
  color: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["default", "outlined", "filled"]),
  language: PropTypes.oneOf(["nepali", "english"]),
};

export default NepaliCalendar;
