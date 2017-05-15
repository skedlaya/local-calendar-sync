// Init settings for cache
module.exports = {
	init: function(storage) {
		storage.init({
		  dir: 'persist',
		  stringify: JSON.stringify,
		  parse: JSON.parse,
		  encoding: 'utf8',
		  logging: false,  
		  continuous: true, // continously persist to disk
		  interval: false, // milliseconds, persist to disk on an interval
		  ttl: 100*1000, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS
		  expiredInterval: 120 * 1000, // [NEW] every 2 minutes the process will clean-up the expired cache
		  forgiveParseErrors: false // True to ignore non-valid storage files
		}).then(onSuccess, onError);
		function onSuccess(){
		  console.log("storage init successful")
		}
		function onError(){
		  console.log("storage init error")
		}
	}
};