/*
 * The calendar for pages that do not use React: plain HTML, Vue, Svelte,
 * Angular and so on. Everything it needs is bundled inside.
 *
 *   const picker = NepaliDatePicker.create("#dob", {
 *     language: "nepali",
 *     onChange: (date) => console.log(date.bs, date.ad),
 *   });
 */
import { h, render } from "preact";
import NepaliCalendar from "./components/NepaliCalendar";
import { bsToAd } from "./utils/convert";

export * from "./converter";

const OPTION_NAMES = [
  "value",
  "minDate",
  "maxDate",
  "language",
  "color",
  "placeholder",
  "disabled",
  "id",
  "name",
];

const resolveTarget = (target) => {
  if (typeof document === "undefined") {
    throw new Error("NepaliDatePicker.create() needs a browser page");
  }
  const element =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!element || element.nodeType !== 1) {
    throw new Error(`NepaliDatePicker: element not found: ${target}`);
  }
  return element;
};

/**
 * Put a Nepali date picker inside an element.
 * `target` is a CSS selector ("#dob") or an element.
 */
export const create = (target, options = {}) => {
  const element = resolveTarget(target);

  let settings = { ...options };
  let current = null;
  let destroyed = false;

  const remember = (bs) => {
    current = { bs, ad: bsToAd(bs) };
  };

  if (settings.value) {
    remember(settings.value); // throws a clear error for an invalid date
  }

  const draw = () => {
    if (destroyed) return;

    const props = {};
    for (const name of OPTION_NAMES) {
      if (settings[name] !== undefined) props[name] = settings[name];
    }

    props.onChange = (date) => {
      current = { bs: date.bs, ad: date.ad };
      settings.value = date.bs;
      // Redraw after the current update has finished, never in the middle
      // of it.
      Promise.resolve().then(draw);
      if (typeof settings.onChange === "function") {
        settings.onChange(date);
      }
    };

    render(h(NepaliCalendar, props), element);
  };

  draw();

  return {
    /** The element the picker lives in. */
    element,

    /** { bs, ad } of the selected date. */
    getValue() {
      return current ? { ...current } : null;
    },

    /** Select a BS date, "YYYY-MM-DD". */
    setValue(bs) {
      remember(bs);
      settings.value = bs;
      draw();
    },

    /** Change options, e.g. update({ language: "english" }). */
    update(newOptions = {}) {
      if (newOptions.value) remember(newOptions.value);
      settings = { ...settings, ...newOptions };
      draw();
    },

    /** Remove the picker from the page. */
    destroy() {
      if (destroyed) return;
      render(null, element);
      destroyed = true;
    },
  };
};
