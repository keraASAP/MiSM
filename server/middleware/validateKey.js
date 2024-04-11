const users = require("../users/users");
const { generateHashedKey } = require("../utils/keys");

function validateKey(req, res, next) {
  const apiKey = req.query.api_key;
  const hashedApiKey = generateHashedKey(apiKey);
  const username = users.get(hashedApiKey);
  const isAuthenticated = !!username;

  if (isAuthenticated) {
    next();
  } else {
    res
      .status(403)
      .send({ error: { code: 403, message: "You are not allowed." } });
  }
}

module.exports = validateKey;
