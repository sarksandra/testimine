const logger = {
  info(msg) { console.log(`INFO: ${msg}`); },
  error(msg) { console.error(`ERROR: ${msg}`); }
};

function doWork(log = logger) {
  log.info('started');
  // ... töö ...
  log.info('finished');
  return true;
}

module.exports = { logger, doWork };
