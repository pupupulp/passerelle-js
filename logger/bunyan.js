const bunyan = require('express-bunyan-logger');

const logger = bunyan({
	name: 'logger',
	streams: [{
		level: 'info',
	}],
});

module.exports = logger;