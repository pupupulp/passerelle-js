const forever = require('forever-monitor');
const logger = require('./logger/winston');

const child = new (forever.Monitor)('server.js', {
	max: 3,
	silent: false,
	killTree: true,
	minUptime: 2000,
	spinSleepTime: 1000,
	sourceDir: './server',
	watch: true,
	watchDirectory: './',
	logFile: './logger/logs/monitor/log.txt',
	outFile: './logger/logs/monitor/log.txt',
	errFile: './logger/logs/monitor/log.txt',
});

child.on('start', (process, data) => {
	// eslint-disable-next-line no-console
	logger.info('Server started with pid: ' + data.pid);
});

child.on('restart', () => {
	// eslint-disable-next-line no-console
	logger.info('Server restarted: ' + child.times + ' time(s)');
});

child.on('exit:code', (code) => {
	// eslint-disable-next-line no-console
	logger.error('Server exited with code: ' + code);
});

child.on('watch:restart', (info) => {
	// eslint-disable-next-line no-console
	logger.info('Server restarted due to: ' + info.file + ' changed');
});

child.start();