const crypto = require("crypto");

function genKey() {
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("");
}

function generateHashedKey(apiKey) {
  const hash = crypto.createHash("sha256");
  hash.update(`${process.env.S_S}${apiKey}${process.env.S_E}`);
  return hash.digest("hex");
}

module.exports = { genKey, generateHashedKey };
