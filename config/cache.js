const cacheManager  = require('cache-manager');
const fsStore = require('cache-manager-fs');


const diskCache = cacheManager.caching({
	store: fsStore,
	options: {
		ttl: 60 * 60,
		maxsize: 10485760,
		path: 'system/cache',
	}
})

module.exports = diskCache