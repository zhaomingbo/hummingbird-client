/* eslint-disable */
const FastBootAppServer = require('fastboot-app-server');
const notifier = {
  subscribe: function(notify) {
    process.on('SIGUSR1', function() {
      notify();
    });
    return Promise.resolve();
  }
};

const options = {
  distPath: process.cwd() + '/dist',
  notifier: notifier,
  workerCount: process.env.WORKER_COUNT || 2,
  gzip: process.env.FASTBOOT_GZIP || false
};

if (process.env.FASTBOOT_CACHE) {
  const RedisCache = require('fastboot-redis-cache');
  const cache = new RedisCache({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    expiration: process.env.REDIS_EXP
  });
  Object.assign(options, { cache: cache });
}

const server = new FastBootAppServer(options);
server.start();
