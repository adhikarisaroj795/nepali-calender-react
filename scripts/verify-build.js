const fs = require("fs");

const filesToVerify = [
  "dist/index.js",
  "dist/convert.js",
  "dist/convert.mjs",
  "dist/standalone.js",
  "dist/standalone.mjs",
];

filesToVerify.forEach((file) => {
  if (!fs.existsSync(file)) {
    throw new Error(`Build failed: ${file} does not exist`);
  }
});

// Only dist/index.js is allowed to need React. The others must work alone.
filesToVerify
  .filter((file) => file !== "dist/index.js")
  .forEach((file) => {
    const code = fs.readFileSync(file, "utf8");
    if (/require\(["']react|from\s*["']react/.test(code)) {
      throw new Error(`Build failed: ${file} must not depend on React`);
    }
  });

console.log("✓ Build verification passed");
