const forever = require('forever-monitor');
const logger = require('../middlewares/logger/winston');
const handler = require('../helpers/handler');

const child = new (forever.Monitor)('server/bin/www', {
	max: 3,
	silent: false,
	killTree: true,
	minUptime: 2000,
	spinSleepTime: 1000,
	sourceDir: './',
	watch: true,
	logFile: 'logs/monitor/log.txt',
	outFile: 'logs/monitor/log.txt',
	errFile: 'logs/monitor/log.txt',
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

const gracefulShutdown = () => {
	logger.info('Gracefully shutting down');
	process.exit(0);
};

process.on('SIGTERM', () => {
	logger.info('Server received SIGTERM');
	setTimeout(gracefulShutdown, 1000);
});

process.on('SIGINT', () => {
	logger.info('Server received SIGINT');
	setTimeout(gracefulShutdown, 1000);
});

// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (reason, p) => {
	throw reason;
});

process.on('uncaughtException', function (error) {
	handler.error.handleError(error);
	if(!handler.error.isTrustedError(error))
		process.exit(1);
});

child.start();