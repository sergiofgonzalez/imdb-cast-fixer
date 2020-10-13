const logger = require('../logger')('route-processing-time-logger');
const perfLogger = require('../logger')('PERF');
const onHeaders = require('on-headers');

function routeProcessingTimer() {
  logger.info(`Setting up route processing timer middleware`);
  return routeProcessingTimerMiddleware;

}

function routeProcessingTimerMiddleware(req, res, next) {
  const startTime = process.hrtime.bigint();

  onHeaders(res, () => {
    perfLogger.debug(`processing for ${ req.url } took ${ process.hrtime.bigint() - startTime } nanos`);
  });

  next();
}
module.exports = routeProcessingTimer;