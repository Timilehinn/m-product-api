// const winston = require('winston');
import { createLogger, format, transports, addColors } from 'winston';
const { combine, timestamp, colorize, printf } = format;

const logFormat = printf((info) => {
  const formattedDate = info.timestamp.replace('T', ' ').replace('Z', '');
  return `${formattedDate} [${info.level}]: ${info.message};`;
});

// const addUserPlatform = format(info => {
//     info.userPlatform = global.USER_PLATFORM;
//     info.currentUserId = global.CURRENT_USER;
//     return info;
// });

addColors({
  error: 'red',
  warn: 'yellow'
});

/**
    const levels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      verbose: 4,
      debug: 5,
      silly: 6
    };

    That's the heirachy of the logger.
    logger.error would only save to all available logs,
    logger.info would save to all logs from level 2 to six and like that like that
    logger.debug would only save to debug and silly.

    For this setup, all log levels save to debug.log
    any log level from warn would save to error.log

    We added some colors to spice it up.

*/

const logger = createLogger({
  format: combine(colorize(), timestamp(), logFormat),
  transports: [
    // if not production, log to console
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
    }),
    // log to appropriate log files
    new transports.File({ filename: 'debug.log', level: 'debug' }),
    new transports.File({ filename: 'error.log', level: 'error' })
  ],
  exitOnError: false
});

// log every error to error log
logger.error = (err): any => {
  if (err instanceof Error) {
    logger.log({ level: 'error', message: `${err.stack || err}` });
  } else {
    logger.log({ level: 'error', message: err });
  }
};
if (process.env.NODE_ENV !== 'production') {
  // logger.debug('Logging initialized at debug level');
  logger.debug('--- starting server ---');
}

export default logger;
