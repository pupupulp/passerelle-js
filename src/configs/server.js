const moment = require('moment');
const date = moment().format('YYYYMMDD');

module.exports = {
	protocol: 'http',
	port: 9000,
	script: 'server/bin/www',
	forever: {
		max: 3,
		silent: false,
		killTree: true,
		minUptime: 2000,
		spinSleepTime: 1000,
		sourceDir: './src',
		watch: true,
		watchDirectory: './src',
		logFile: `logs/${date}/log.txt`,
		outFile: `logs/${date}/output.txt`,
		errFile: `logs/${date}/error.txt`,
	},
	admin: 'mece.martinece@gmail.com'
};