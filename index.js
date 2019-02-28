const forever = require('forever-monitor');
const CONSTANTS = require('./gateway/config/constants');

const child = new (forever.Monitor)('server.js', {
	max: 3,
	silent: false,
	killTree: true,
	minUptime: 2000,
	spinSleepTime: 1000,
	sourceDir: './server',
	watch: true,
	watchDirectory: './',
	logFile: './logs/monitor/log.txt',
	outFile: './logs/monitor/log.txt',
	errFile: './logs/monitor/log.txt',
});

child.on('start', (process, data) => {
	// eslint-disable-next-line no-console
	console.log(CONSTANTS.APP_NAME + ' started with pid: ' + data.pid);
});

child.on('restart', () => {
	// eslint-disable-next-line no-console
	console.log(CONSTANTS.APP_NAME + ' restarted: ' + child.times + ' time(s)');
});

child.on('exit:code', (code) => {
	// eslint-disable-next-line no-console
	console.error(CONSTANTS.APP_NAME + ' exited with code: ' + code);
});

child.on('watch:restart', (info) => {
	// eslint-disable-next-line no-console
	console.log(CONSTANTS.APP_NAME + ' restarted due to: ' + info.file + ' changed');
});

child.start();