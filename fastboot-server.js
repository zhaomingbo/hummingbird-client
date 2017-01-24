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
  const ClusterNodeCache = require('fastboot-cluster-node-cache');
  const cache = new ClusterNodeCache({
    expiration: process.env.CACHE_EXPIRATION
  });
  Object.assign(options, { cache: cache });
}

const server = new FastBootAppServer(options);
server.start();
