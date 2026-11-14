// Tests the standalone calendar (dist/standalone.js) in a simulated browser.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const PKG = "@adhikarisaroj795/nepali-calendar-react";
const code = fs.readFileSync(
  path.join(__dirname, "../dist/standalone.js"),
  "utf8"
);

// Objects made inside the simulated page have that page's own prototypes,
// so getValue() results are compared with deepEqual, not deepStrictEqual.
const tick = () => new Promise((resolve) => setTimeout(resolve, 30));

const openPage = () => {
  const dom = new JSDOM(
    '<!doctype html><html><head></head><body><div id="a"></div><div id="b"></div></body></html>',
    { runScripts: "outside-only", pretendToBeVisual: true }
  );
  dom.window.eval(code);
  return dom.window;
};

test("script tag creates the NepaliDatePicker global", () => {
  const window = openPage();
  assert.strictEqual(typeof window.NepaliDatePicker.create, "function");
  assert.strictEqual(window.NepaliDatePicker.adToBs("2026-11-14"), "2083-07-28");
  assert.strictEqual(window.NepaliDatePicker.bsToAd("2083-07-28"), "2026-11-14");
});

test("create() shows the picker and reports the starting date", async () => {
  const window = openPage();
  const changes = [];
  const picker = window.NepaliDatePicker.create("#a", {
    language: "english",
    onChange: (date) => changes.push(date),
  });
  await tick();

  const input = window.document.querySelector("#a input");
  assert.ok(input, "input was not rendered");
  assert.strictEqual(
    window.document.querySelectorAll("#nepali-calendar-react-styles").length,
    1
  );
  // with no value, it starts on today and reports it once
  assert.strictEqual(changes.length, 1);
  assert.strictEqual(input.value, window.NepaliDatePicker.todayBs());
  assert.deepEqual(picker.getValue(), {
    bs: changes[0].bs,
    ad: changes[0].ad,
  });
});

test("open, navigate, pick a date, close", async () => {
  const window = openPage();
  const document = window.document;
  const changes = [];
  const picker = window.NepaliDatePicker.create(document.getElementById("a"), {
    language: "english",
    color: "green",
    value: "2082-01-05",
    onChange: (date) => changes.push(date),
  });
  await tick();

  const input = document.querySelector("#a input");
  assert.strictEqual(input.value, "2082-01-05");
  assert.strictEqual(changes.length, 0);
  assert.deepEqual(picker.getValue(), { bs: "2082-01-05", ad: "2025-04-18" });

  input.focus();
  await tick();
  let popup = document.querySelector("#a .nepali-calendar-popup");
  assert.ok(popup, "popup did not open");
  assert.strictEqual(popup.getAttribute("aria-label"), "Nepali Calendar");
  assert.strictEqual(
    popup.querySelector(".nepali-calendar-month-name").textContent,
    "Baisakh"
  );
  assert.strictEqual(popup.querySelectorAll("button.nepali-calendar-day").length, 31);

  // previous month from Baisakh 2082 is Chaitra 2081
  popup.querySelectorAll(".nepali-calendar-nav-button")[0].click();
  await tick();
  popup = document.querySelector("#a .nepali-calendar-popup");
  assert.strictEqual(
    popup.querySelector(".nepali-calendar-month-name").textContent,
    "Chaitra"
  );
  assert.strictEqual(popup.querySelector("select").value, "2081");

  popup.querySelectorAll(".nepali-calendar-nav-button")[1].click();
  await tick();
  popup = document.querySelector("#a .nepali-calendar-popup");

  [...popup.querySelectorAll("button.nepali-calendar-day")]
    .find((button) => button.textContent === "10")
    .click();
  await tick();

  assert.strictEqual(changes.length, 1);
  assert.strictEqual(changes[0].bs, "2082-01-10");
  assert.strictEqual(changes[0].ad, "2025-04-23");
  assert.strictEqual(input.value, "2082-01-10");
  assert.strictEqual(document.querySelector("#a .nepali-calendar-popup"), null);
  assert.deepEqual(picker.getValue(), { bs: "2082-01-10", ad: "2025-04-23" });

  // Escape closes
  input.click();
  await tick();
  assert.ok(document.querySelector("#a .nepali-calendar-popup"));
  document.dispatchEvent(
    new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true })
  );
  await tick();
  assert.strictEqual(document.querySelector("#a .nepali-calendar-popup"), null);
});

test("setValue, update and destroy", async () => {
  const window = openPage();
  const document = window.document;
  const picker = window.NepaliDatePicker.create("#b", {
    language: "english",
    value: "2083-07-28",
  });
  await tick();
  const input = document.querySelector("#b input");

  picker.setValue("2080-12-30");
  await tick();
  assert.strictEqual(input.value, "2080-12-30");
  assert.deepEqual(picker.getValue(), { bs: "2080-12-30", ad: "2024-04-12" });

  picker.update({ language: "nepali" });
  await tick();
  assert.strictEqual(document.querySelector("#b input").value, "२०८०-१२-३०");

  assert.throws(() => picker.setValue("2080-13-01"), /Invalid month/);

  picker.destroy();
  await tick();
  assert.strictEqual(document.querySelector("#b input"), null);
});

test("two pickers on one page are independent", async () => {
  const window = openPage();
  const document = window.document;
  const first = window.NepaliDatePicker.create("#a", { value: "2082-01-05", language: "english" });
  const second = window.NepaliDatePicker.create("#b", { value: "2083-07-28", language: "english" });
  await tick();
  first.setValue("2082-02-02");
  await tick();
  assert.strictEqual(document.querySelector("#a input").value, "2082-02-02");
  assert.strictEqual(document.querySelector("#b input").value, "2083-07-28");
  assert.strictEqual(second.getValue().bs, "2083-07-28");
});

test("a missing element gives a clear error", () => {
  const window = openPage();
  assert.throws(
    () => window.NepaliDatePicker.create("#nope"),
    /element not found/
  );
});

test("import { create } from '<package>/standalone' works", async () => {
  const lib = await import(`${PKG}/standalone`);
  assert.strictEqual(typeof lib.create, "function");
  assert.strictEqual(lib.adToBs("2026-11-14"), "2083-07-28");
  const cjs = require(`${PKG}/standalone`);
  assert.strictEqual(typeof cjs.create, "function");
});
