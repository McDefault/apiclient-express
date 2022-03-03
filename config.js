const secrets = require('./src/modules/secrets');
const config = {
  "token": secrets.read(process.env.PATREON_FILE) || process.env.PATREON_TOKEN,
  "debug": (parseInt(process.env.DEBUG_MODE) === 1),
  "baseAPI": process.env.BASE_API,

};

module.exports = config;
