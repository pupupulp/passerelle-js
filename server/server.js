const app = require('../gateway/app');
const http = require('http');
const logger = require('../logger/winston');

const port = '9019';

const server = http.createServer(app.callback());
server.listen(port);

server.on('error', (error) => {
	if (error.syscall !== 'listen') {
		throw error;
	}

	switch (error.code) {
	case 'EACCES':
		// eslint-disable-next-line no-console
		logger.error('Port ' + port + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		// eslint-disable-next-line no-console
		logger.error('Port ' + port + ' is already in use');
		process.exit(1);
		break;
	default:
		throw error;
	}
});

server.on('listening', () => {
	const address = server.address();
	// eslint-disable-next-line no-console
	logger.info('Listening on port ' + address.port);
});