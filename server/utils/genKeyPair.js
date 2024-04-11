require("dotenv").config();

const { genKey, generateHashedKey } = require("./keys");

(() => {
  const key = genKey();
  const hashedKey = generateHashedKey(process.env.S_S, key, process.env.S_E);

  console.log(`User apiKey: ${key}`);
  console.log(`Server apiKey: ${hashedKey}`);
})();
