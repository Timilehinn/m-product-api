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
declare const logger: import("winston").Logger;
export default logger;
