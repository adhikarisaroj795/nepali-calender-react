import { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import {
  FIRST_YEAR,
  LAST_YEAR,
  hasYear,
  getMonthLength,
} from "../data/calendar";
import { NepaliDate } from "../utils/dateUtils";
import {
  toLocalizedNumber,
  toNepaliDateString,
  translations,
} from "../utils/numberUtils";
import { injectStyles } from "../utils/injectStyles";

injectStyles();

// Lighter shade of any CSS color (hex, rgb(), named colors like "green").
const shade = (color, percent) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

const SIZES = ["small", "medium", "large"];
const VARIANTS = ["default", "outlined", "filled"];

const parseBsDate = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new NepaliDate(year, month - 1, day);
};

const NepaliCalendar = ({
  onChange,
  value,
  minDate,
  maxDate,
  placeholder,
  disabled = false,
  size = "medium",
  color = "#4f46e5",
  language = "nepali",
  variant = "default",
  id,
  name = "nepaliDate",
}) => {
  const today = useMemo(() => NepaliDate.fromGregorian(new Date()), []);

  const {
    weekDays,
    placeholder: translatedPlaceholder,
    today: todayText,
    close: closeText,
    ariaLabels,
    monthNames,
  } = translations[language] || translations.nepali;

  const initialDate = useMemo(() => {
    if (value) {
      try {
        return parseBsDate(value);
      } catch (e) {
        console.error("Invalid initial date:", value, e);
        return today;
      }
    }
    return today;
  }, [value, today]);

  useEffect(() => {
    if (!value && onChange) {
      onChange({
        bs: today.format("YYYY-MM-DD"),
        ad: today.toADString(),
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
  // The day that has keyboard focus inside the popup (null = none).
  const [focusedDate, setFocusedDate] = useState(null);

  const inputRef = useRef(null);
  const calendarRef = useRef(null);
  // Set just before we move focus back to the input ourselves, so that
  // focus does not immediately reopen the popup.
  const skipNextOpenRef = useRef(false);

  const availableYears = useMemo(() => {
    const years = [];
    for (let year = FIRST_YEAR; year <= LAST_YEAR; year++) years.push(year);
    return years;
  }, []);

  const visibleYear = visibleMonth.getYear();
  const visibleMonthIndex = visibleMonth.getMonth();

  const calendarDays = useMemo(() => {
    const days = [];
    const count = getMonthLength(visibleYear, visibleMonthIndex);
    for (let day = 1; day <= count; day++) {
      days.push(new NepaliDate(visibleYear, visibleMonthIndex, day));
    }
    return days;
  }, [visibleYear, visibleMonthIndex]);

  const calendarGrid = useMemo(() => {
    if (!calendarDays.length) return [];
    const blanks = Array(calendarDays[0].getDay()).fill(null);
    return [...blanks, ...calendarDays];
  }, [calendarDays]);

  const isDateDisabled = useMemo(() => {
    let minDateObj = null;
    let maxDateObj = null;

    if (minDate) {
      try {
        minDateObj = parseBsDate(minDate);
      } catch (e) {
        console.error("Invalid minDate:", minDate, e);
      }
    }

    if (maxDate) {
      try {
        maxDateObj = parseBsDate(maxDate);
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

  const showMonth = (year, month) => {
    setVisibleMonth(new NepaliDate(year, month, 1));
  };

  const openCalendar = () => {
    if (skipNextOpenRef.current) {
      skipNextOpenRef.current = false;
      return;
    }
    if (!disabled) setIsCalendarOpen(true);
  };

  // Close the popup. If the keyboard focus was inside it, give the focus
  // back to the input so it is not lost.
  const closeCalendar = () => {
    const popup = calendarRef.current;
    const focusWasInside =
      popup &&
      typeof document !== "undefined" &&
      popup.contains(document.activeElement);

    setIsCalendarOpen(false);
    setFocusedDate(null);

    if (focusWasInside && inputRef.current) {
      skipNextOpenRef.current = true;
      inputRef.current.focus();
      skipNextOpenRef.current = false;
    }
  };

  const handleDateClick = (date) => {
    if (!date || isDateDisabled(date)) return;
    setSelectedDate(date);
    closeCalendar();
    if (onChange) {
      onChange({
        bs: date.format("YYYY-MM-DD"),
        ad: date.toADString(),
        bsDate: date,
        adDate: date.toGregorian(),
      });
    }
  };

  const hasPrevMonth = visibleMonthIndex > 0 || hasYear(visibleYear - 1);
  const hasNextMonth = visibleMonthIndex < 11 || hasYear(visibleYear + 1);

  const handlePrevMonth = (e) => {
    e.preventDefault();
    if (!hasPrevMonth) return;
    if (visibleMonthIndex > 0) {
      showMonth(visibleYear, visibleMonthIndex - 1);
    } else {
      showMonth(visibleYear - 1, 11);
    }
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    if (!hasNextMonth) return;
    if (visibleMonthIndex < 11) {
      showMonth(visibleYear, visibleMonthIndex + 1);
    } else {
      showMonth(visibleYear + 1, 0);
    }
  };

  const handleYearChange = (e) => {
    showMonth(parseInt(e.target.value, 10), visibleMonthIndex);
  };

  // ----- keyboard -----

  const moveFocusTo = (date) => {
    if (!date || isDateDisabled(date)) return;
    if (
      date.getYear() !== visibleYear ||
      date.getMonth() !== visibleMonthIndex
    ) {
      showMonth(date.getYear(), date.getMonth());
    }
    setFocusedDate(date);
  };

  // The day that the Tab key lands on, and where arrow keys start from.
  const tabStopDate = useMemo(() => {
    const inView = (date) =>
      date &&
      date.getYear() === visibleYear &&
      date.getMonth() === visibleMonthIndex;

    if (inView(focusedDate)) return focusedDate;
    if (inView(selectedDate)) return selectedDate;
    if (inView(today)) return today;
    return calendarDays[0] || null;
  }, [focusedDate, selectedDate, today, calendarDays, visibleYear, visibleMonthIndex]);

  const handleInputKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsCalendarOpen(true);
      setFocusedDate(tabStopDate);
    }
  };

  const shiftMonth = (date, months) => {
    const total = date.getYear() * 12 + date.getMonth() + months;
    const year = Math.floor(total / 12);
    const month = total % 12;
    if (!hasYear(year)) return null;
    const day = Math.min(date.getDate(), getMonthLength(year, month));
    return new NepaliDate(year, month, day);
  };

  const handleGridKeyDown = (e) => {
    const key = e.target?.getAttribute?.("data-date");
    if (!key) return;

    let current;
    try {
      current = parseBsDate(key);
    } catch (error) {
      return;
    }

    const byDays = (count) => {
      try {
        return NepaliDate.fromDayNumber(current.toDayNumber() + count);
      } catch (error) {
        return null; // outside the calendar data
      }
    };

    let target;
    switch (e.key) {
      case "ArrowLeft":
        target = byDays(-1);
        break;
      case "ArrowRight":
        target = byDays(1);
        break;
      case "ArrowUp":
        target = byDays(-7);
        break;
      case "ArrowDown":
        target = byDays(7);
        break;
      case "Home":
        target = new NepaliDate(current.getYear(), current.getMonth(), 1);
        break;
      case "End":
        target = new NepaliDate(
          current.getYear(),
          current.getMonth(),
          getMonthLength(current.getYear(), current.getMonth())
        );
        break;
      case "PageUp":
        target = shiftMonth(current, -1);
        break;
      case "PageDown":
        target = shiftMonth(current, 1);
        break;
      default:
        return;
    }

    e.preventDefault();
    moveFocusTo(target);
  };

  // Put the browser focus on the focused day once it is on screen.
  const focusedKey = focusedDate ? focusedDate.format("YYYY-MM-DD") : null;
  useEffect(() => {
    if (!isCalendarOpen || !focusedKey || !calendarRef.current) return;
    const button = calendarRef.current.querySelector(
      `[data-date="${focusedKey}"]`
    );
    if (button) button.focus();
  }, [isCalendarOpen, focusedKey, visibleYear, visibleMonthIndex]);

  // Close on outside click and on the Escape key.
  useEffect(() => {
    if (!isCalendarOpen) return;

    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
        setFocusedDate(null);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeCalendar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCalendarOpen]);

  // Decide whether the popup opens below or above the input.
  useEffect(() => {
    if (!isCalendarOpen) return;

    const updatePosition = () => {
      if (!inputRef.current) return;
      const inputRect = inputRef.current.getBoundingClientRect();
      const popupHeight = calendarRef.current?.offsetHeight || 350;
      const spaceBelow = window.innerHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      // Open above only when it doesn't fit below AND it really fits above.
      const openAbove =
        spaceBelow < popupHeight + 10 && spaceAbove >= popupHeight + 10;
      setPopupPosition(openAbove ? "above" : "below");
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isCalendarOpen, visibleMonth]);

  useEffect(() => {
    if (value) {
      try {
        const newDate = parseBsDate(value);
        setSelectedDate(newDate);
        showMonth(newDate.getYear(), newDate.getMonth());
      } catch (error) {
        console.error("Invalid date value provided:", value, error);
      }
    }
  }, [value]);

  const todayKey = today.format("YYYY-MM-DD");
  const selectedKey = selectedDate?.format("YYYY-MM-DD");
  const tabStopKey = tabStopDate?.format("YYYY-MM-DD");

  const sizeClass = SIZES.includes(size) ? size : "medium";
  const variantClass = VARIANTS.includes(variant) ? variant : "default";

  return (
    <div
      className={`nepali-calendar-container nepali-calendar--${sizeClass} nepali-calendar--${variantClass}`}
      style={
        color
          ? {
              "--calendar-color": color,
              "--calendar-color-light": shade(color, 12),
              "--calendar-color-dark": shade(color, 19),
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
          id={id}
          name={name}
          onFocus={openCalendar}
          onClick={openCalendar}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder || translatedPlaceholder}
          style={{
            "--placeholder-color": shade(color || "#4f46e5", 50),
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
            aria-hidden="true"
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
          aria-label={ariaLabels.calendar}
        >
          <div className="nepali-calendar-header">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="nepali-calendar-nav-button"
              aria-label={ariaLabels.prevMonth}
              disabled={!hasPrevMonth}
            >
              ‹
            </button>

            <div className="nepali-calendar-month-selector">
              <select
                value={visibleYear}
                onChange={handleYearChange}
                className="nepali-calendar-year-select"
                aria-label={ariaLabels.selectYear}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {toLocalizedNumber(year, language)}
                  </option>
                ))}
              </select>
              <span className="nepali-calendar-month-name">
                {monthNames[visibleMonthIndex]}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="nepali-calendar-nav-button"
              aria-label={ariaLabels.nextMonth}
              disabled={!hasNextMonth}
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

            <div className="nepali-calendar-days" onKeyDown={handleGridKeyDown}>
              {calendarGrid.map((date, i) => {
                if (!date) {
                  return (
                    <div
                      key={`blank-${i}`}
                      className="nepali-calendar-day empty"
                      aria-hidden="true"
                    />
                  );
                }

                const dateKey = date.format("YYYY-MM-DD");
                const isToday = dateKey === todayKey;
                const isSelected = dateKey === selectedKey;
                const isDisabled = isDateDisabled(date);

                return (
                  <button
                    key={dateKey}
                    type="button"
                    data-date={dateKey}
                    tabIndex={dateKey === tabStopKey ? 0 : -1}
                    className={`nepali-calendar-day ${
                      isSelected ? "selected" : ""
                    } ${isToday && !isSelected ? "today" : ""} ${
                      isDisabled ? "disabled" : ""
                    }`}
                    onClick={() => handleDateClick(date)}
                    disabled={isDisabled}
                    aria-label={`${dateKey}${isToday ? `, ${todayText}` : ""}`}
                    aria-current={isToday ? "date" : undefined}
                    aria-pressed={isSelected}
                  >
                    {toLocalizedNumber(date.getDate(), language)}
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
              onClick={closeCalendar}
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
  size: PropTypes.oneOf(SIZES),
  variant: PropTypes.oneOf(VARIANTS),
  language: PropTypes.oneOf(["nepali", "english"]),
  id: PropTypes.string,
  name: PropTypes.string,
};

export default NepaliCalendar;
