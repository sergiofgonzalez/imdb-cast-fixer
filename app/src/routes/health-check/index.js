const logger = require('../../lib/logger')('routes:health-check');

function healthCheck(req, res) {
  logger.debug(`About to process health-check request`);

  res.json({ healthy: true, timestamp: new Date().toISOString() });
}

module.exports = healthCheck;