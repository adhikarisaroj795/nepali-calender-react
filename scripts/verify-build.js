const fs = require("fs");

const filesToVerify = [
  "dist/index.js", // Only check the main bundle
];

filesToVerify.forEach((file) => {
  if (!fs.existsSync(file)) {
    throw new Error(`Build failed: ${file} does not exist`);
  }
});

console.log("✓ Build verification passed");
