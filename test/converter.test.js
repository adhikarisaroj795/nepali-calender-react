// Tests the React-free converter builds (dist/convert.js and dist/convert.mjs).
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const PKG = "@adhikarisaroj795/nepali-calendar-react";
const full = require("../dist/index.js");

const expectedNames = [
  "adToBs",
  "bsToAd",
  "bsToAdDate",
  "formatBs",
  "adToBsDetails",
  "bsToAdDetails",
  "todayBs",
  "isValidBsDate",
  "getDaysInBsMonth",
  "getBsYearRange",
  "toNepaliNumber",
  "toNepaliDateString",
  "NepaliDate",
  "convertADtoBS",
  "convertBStoAD",
];

const check = (lib) => {
  for (const name of expectedNames) {
    assert.ok(name in lib, `missing export: ${name}`);
  }
  assert.strictEqual(lib.adToBs("2026-11-14"), "2083-07-28");
  assert.strictEqual(lib.bsToAd("2083-07-28"), "2026-11-14");
  assert.strictEqual(lib.bsToAd("2082-04-20"), "2025-08-05");
  assert.strictEqual(
    lib.adToBs("2026-11-14", "D MMMM YYYY", "nepali"),
    "२८ कात्तिक २०८३"
  );
};

test("the converter builds do not contain React", () => {
  for (const file of ["convert.js", "convert.mjs"]) {
    const code = fs.readFileSync(path.join(__dirname, "../dist", file), "utf8");
    assert.doesNotMatch(code, /require\(["']react|from\s*["']react/);
  }
});

test("require('<package>/convert') works", () => {
  check(require(`${PKG}/convert`));
});

test("import { adToBs } from '<package>/convert' works", async () => {
  const lib = await import(`${PKG}/convert`);
  check(lib);
});

test("the package's main entry still resolves", () => {
  assert.strictEqual(require(PKG), full);
});

test("works from a <script> tag (global NepaliDateConverter)", () => {
  const code = fs.readFileSync(
    path.join(__dirname, "../dist/convert.js"),
    "utf8"
  );
  const window = {};
  window.self = window;
  vm.runInNewContext(code, window);
  assert.ok(window.NepaliDateConverter, "global was not created");
  check(window.NepaliDateConverter);
});

test("converter and React build agree on every month start", () => {
  const lib = require(`${PKG}/convert`);
  const { min, max } = lib.getBsYearRange();
  for (let year = min; year <= max; year++) {
    for (let month = 1; month <= 12; month++) {
      const bs = `${year}-${String(month).padStart(2, "0")}-01`;
      assert.strictEqual(lib.bsToAd(bs), full.bsToAd(bs));
    }
  }
});
