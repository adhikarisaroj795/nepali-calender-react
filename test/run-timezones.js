// Runs the test files once per timezone, because date bugs are usually
// timezone bugs. Used by `npm test`.
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const zones = [
  "Asia/Kathmandu",
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Pacific/Auckland",
];

let failed = false;
for (const zone of zones) {
  const result = spawnSync(
    process.execPath,
    [
      "--test",
      path.join(__dirname, "convert.test.js"),
      path.join(__dirname, "converter.test.js"),
      path.join(__dirname, "standalone.test.js"),
      path.join(__dirname, "react-ui.test.js"),
    ],
    { env: { ...process.env, TZ: zone }, encoding: "utf8" }
  );
  const ok = result.status === 0;
  console.log(`${ok ? "✓" : "✗"} ${zone}`);
  if (!ok) {
    failed = true;
    console.log(result.stdout);
    console.log(result.stderr);
  }
}
process.exit(failed ? 1 : 0);
