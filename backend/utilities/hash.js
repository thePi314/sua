const crypto = require("crypto");

const stringsUtilities = require("./strings");
const config = require("../config");


const hashCreds = (username, password) => {
  const stringMash = stringsUtilities.mashStrings([
    username,
    password,
    config.SECRET,
  ]);
  return crypto.createHash("md5").update(stringMash).digest("hex");
};

module.exports = {
  hashCreds,
};
