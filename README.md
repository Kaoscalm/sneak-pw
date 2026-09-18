# Sneak.pw SDK

Zero-trust ephemeral secret generator for Node.js and browser.

## Install
npm install sneak-pw

## Usage
const { createSecret } = require("sneak-pw");

(async () => {
  const link = await createSecret("Hello World");
  console.log(link);
})();
