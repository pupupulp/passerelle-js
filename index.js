var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js', {
	max: 10,
	silent: true,
	killTree: true,
	minUptime: 2000,
	spinSleepTime: 1000,
	sourceDir: './gateway',
	watch: true,
	watchDirectory: './',
	logFile: './logs/monitor/log.txt',
	outFile: './logs/monitor/output.txt',
	errFile: './logs/monitor/error.txt',
});

child.on('watch:restart', (info) => {
	// eslint-disable-next-line no-console
	console.error('Script restarted due to: ' + info.logFile + ' changed');
});

child.on('restart', () => {
	// eslint-disable-next-line no-console
	console.error('Script restarted: ' + child.times + ' times');
});

child.on('exit:code', (code) => {
	// eslint-disable-next-line no-console
	console.error('Script exited with code: ' + code);
});

child.start();