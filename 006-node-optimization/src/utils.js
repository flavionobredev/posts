const cache = new Map();

const cacheUtil = {
  get: (key) => cache.get(key),
  set: (key, value, options) => {
    if (options.ttl) {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        cache.delete(key);
      }, options.ttl);
    }
    return cache.set(key, value);
  },
};

module.exports = {
  cacheUtil,
};
