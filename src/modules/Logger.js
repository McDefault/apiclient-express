

exports.log = (content, type = "log") => {
  /*
Logger class for easy and aesthetically pleasing console logging
*/
  const chalk = require("chalk");
  const moment = require("moment");
  const logger = require('pino')();
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
  let chalkColour;
  switch (type) {
    case "log": {
      chalkColour = chalk.bgBlue;
      break;

    }
    case "warn": {
      chalkColour = chalk.black.bgYellow;
      break;

    }
    case "error": {
      chalkColour = chalk.bgRed;
      break;

    }
    case "debug": {
      chalkColour = chalk.green;
      break;

    }
    case "cmd": {
      chalkColour = chalk.black.bgWhite;
      break;

    }
    case "ready": {
      chalkColour = chalk.black.bgGreen;
      break;

    }
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
  return logger.info(`${timestamp} ${chalkColour(type.toUpperCase())} ${content} `);

}; 

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");
