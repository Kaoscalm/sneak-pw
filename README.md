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

## Options
createSecret("text", {
  ttl: 86400,            // seconds
  burn: 1,               // destroy on read
  endpoint: "https://yourdomain.com/ api.php"
});

## Example
createSecret("text", {
ttl:3600,
burn:1,
endpoint: "https://sneak.pw/ api.php"
});

