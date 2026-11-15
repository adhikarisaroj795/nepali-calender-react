// Clicks and types through the React calendar (dist/index.js) in a
// simulated browser.
const test = require("node:test");
const assert = require("node:assert");
const { JSDOM } = require("jsdom");

const dom = new JSDOM(
  '<!doctype html><html><head></head><body><div id="root"></div></body></html>',
  { pretendToBeVisual: true }
);
global.window = dom.window;
global.document = dom.window.document;
global.IS_REACT_ACT_ENVIRONMENT = true;
for (const name of ["HTMLElement", "Node", "Event", "MouseEvent", "KeyboardEvent"]) {
  global[name] = dom.window[name];
}

const React = require("react");
const { act } = React;
const { createRoot } = require("react-dom/client");
const lib = require("../dist/index.js");
const NepaliCalendar = lib.default;

const mount = async (props) => {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  await act(async () => {
    root.render(React.createElement(NepaliCalendar, props));
  });
  return {
    host,
    input: host.querySelector("input"),
    popup: () => host.querySelector(".nepali-calendar-popup"),
    month: () =>
      host.querySelector(".nepali-calendar-month-name").textContent +
      " " +
      host.querySelector("select").value,
    unmount: () => act(async () => root.unmount()),
  };
};

const press = (element, key) =>
  act(async () => {
    element.dispatchEvent(
      new window.KeyboardEvent("keydown", { key, bubbles: true, cancelable: true })
    );
  });

const focusedDay = () => document.activeElement.getAttribute("data-date");

test("styles are added once", async () => {
  const a = await mount({ language: "english" });
  const b = await mount({ language: "nepali" });
  assert.strictEqual(
    document.querySelectorAll("#nepali-calendar-react-styles").length,
    1
  );
  await a.unmount();
  await b.unmount();
});

test("labels follow the language, and ids are not duplicated", async () => {
  const en = await mount({ language: "english" });
  const np = await mount({ language: "nepali", id: "dob", name: "dob" });
  assert.strictEqual(en.input.placeholder, "Select date");
  assert.strictEqual(np.input.placeholder, "मिति छान्नुहोस्");
  assert.strictEqual(en.input.id, "");
  assert.strictEqual(np.input.id, "dob");
  assert.strictEqual(en.input.name, "nepaliDate");

  await act(async () => en.input.focus());
  assert.strictEqual(en.popup().getAttribute("aria-label"), "Nepali Calendar");
  await press(document, "Escape");
  await en.unmount();
  await np.unmount();
});

test("size, variant and named colors", async () => {
  const ui = await mount({ size: "large", variant: "outlined", color: "green" });
  const box = ui.host.firstChild;
  assert.ok(box.classList.contains("nepali-calendar--large"));
  assert.ok(box.classList.contains("nepali-calendar--outlined"));
  assert.match(
    box.style.getPropertyValue("--calendar-color-light"),
    /color-mix\(in srgb, green/
  );
  await ui.unmount();
});

test("mouse: open, change month across a year, pick, close", async () => {
  const changes = [];
  const ui = await mount({
    language: "english",
    value: "2082-01-05",
    onChange: (date) => changes.push(date),
  });

  await act(async () => ui.input.focus());
  assert.ok(ui.popup());
  assert.strictEqual(ui.month(), "Baisakh 2082");
  assert.strictEqual(ui.popup().querySelectorAll("button.nepali-calendar-day").length, 31);

  const [prev, next] = ui.popup().querySelectorAll(".nepali-calendar-nav-button");
  await act(async () => prev.click());
  assert.strictEqual(ui.month(), "Chaitra 2081");
  await act(async () => next.click());
  assert.strictEqual(ui.month(), "Baisakh 2082");

  await act(async () =>
    [...ui.popup().querySelectorAll("button.nepali-calendar-day")]
      .find((button) => button.textContent === "10")
      .click()
  );
  assert.strictEqual(changes.length, 1);
  assert.strictEqual(changes[0].bs, "2082-01-10");
  assert.strictEqual(changes[0].ad, "2025-04-23");
  assert.strictEqual(ui.input.value, "2082-01-10");
  assert.strictEqual(ui.popup(), null);

  // outside click closes
  await act(async () => ui.input.click());
  assert.ok(ui.popup());
  await act(async () =>
    document.body.dispatchEvent(new window.MouseEvent("mousedown", { bubbles: true }))
  );
  assert.strictEqual(ui.popup(), null);
  await ui.unmount();
});

test("keyboard: arrows, Home/End, PageUp/PageDown, Enter, Escape", async () => {
  const changes = [];
  const ui = await mount({
    language: "english",
    value: "2082-01-05",
    onChange: (date) => changes.push(date),
  });

  await act(async () => ui.input.focus());
  await press(ui.input, "ArrowDown");
  assert.strictEqual(focusedDay(), "2082-01-05");

  await press(document.activeElement, "ArrowRight");
  assert.strictEqual(focusedDay(), "2082-01-06");
  await press(document.activeElement, "ArrowDown");
  assert.strictEqual(focusedDay(), "2082-01-13");
  await press(document.activeElement, "ArrowUp");
  await press(document.activeElement, "ArrowLeft");
  assert.strictEqual(focusedDay(), "2082-01-05");

  await press(document.activeElement, "Home");
  assert.strictEqual(focusedDay(), "2082-01-01");
  // left from the 1st goes to the last day of the month before
  await press(document.activeElement, "ArrowLeft");
  assert.strictEqual(focusedDay(), "2081-12-31");
  assert.strictEqual(ui.month(), "Chaitra 2081");

  await press(document.activeElement, "PageDown");
  assert.strictEqual(focusedDay(), "2082-01-31");
  await press(document.activeElement, "Home");
  assert.strictEqual(focusedDay(), "2082-01-01");
  await press(document.activeElement, "End");
  assert.strictEqual(focusedDay(), "2082-01-31");
  // Magh 2082 has 29 days: the 31st does not exist there, so it stops
  // on the last day of that month
  for (let i = 0; i < 9; i++) await press(document.activeElement, "PageDown");
  const magh = lib.getDaysInBsMonth(2082, 10);
  assert.strictEqual(focusedDay(), `2082-10-${magh}`);
  for (let i = 0; i < 9; i++) await press(document.activeElement, "PageUp");
  assert.strictEqual(focusedDay(), `2082-01-${magh}`);

  // only one day can be reached with Tab
  assert.strictEqual(ui.popup().querySelectorAll('button.nepali-calendar-day[tabindex="0"]').length, 1);

  // Enter on a day picks it (a button's own behaviour), then focus returns
  await act(async () => document.activeElement.click());
  assert.strictEqual(changes[changes.length - 1].bs, `2082-01-${magh}`);
  assert.strictEqual(ui.popup(), null);
  assert.strictEqual(document.activeElement, ui.input);

  // Escape closes and returns focus to the input without reopening
  await press(ui.input, "Enter");
  assert.ok(ui.popup());
  await press(document.activeElement, "Escape");
  assert.strictEqual(ui.popup(), null);
  assert.strictEqual(document.activeElement, ui.input);
  await ui.unmount();
});

test("keyboard respects minDate and maxDate", async () => {
  const ui = await mount({
    language: "english",
    value: "2082-01-05",
    minDate: "2082-01-04",
    maxDate: "2082-01-06",
  });
  await act(async () => ui.input.focus());
  await press(ui.input, "ArrowDown");
  await press(document.activeElement, "ArrowLeft");
  assert.strictEqual(focusedDay(), "2082-01-04");
  await press(document.activeElement, "ArrowLeft");
  assert.strictEqual(focusedDay(), "2082-01-04");
  await press(document.activeElement, "ArrowDown");
  assert.strictEqual(focusedDay(), "2082-01-04");
  await press(document, "Escape");
  await ui.unmount();
});

test("first and last year of the table", async () => {
  const { min, max } = lib.getBsYearRange();
  const first = await mount({ language: "english", value: `${min}-01-01` });
  await act(async () => first.input.focus());
  assert.strictEqual(first.popup().querySelectorAll(".nepali-calendar-nav-button")[0].disabled, true);
  assert.strictEqual(first.popup().querySelectorAll("option").length, max - min + 1);
  await press(first.input, "ArrowDown");
  await press(document.activeElement, "ArrowLeft"); // nothing before it
  assert.strictEqual(focusedDay(), `${min}-01-01`);
  await press(document, "Escape");
  await first.unmount();

  const last = await mount({ language: "english", value: `${max}-12-01` });
  await act(async () => last.input.focus());
  assert.strictEqual(last.popup().querySelectorAll(".nepali-calendar-nav-button")[1].disabled, true);
  await press(document, "Escape");
  await last.unmount();
});
