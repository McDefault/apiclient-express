const secrets = require('./src/modules/secrets');
const config = {
  "token": secrets.read(process.env.PATRON_FILE) || process.env.PATRON_TOKEN,
  "debug": (process.env.DEBUG_MODE === 1),
  "baseAPI": process.env.BASE_API,

};

module.exports = config;
