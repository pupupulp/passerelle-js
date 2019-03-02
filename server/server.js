const app = require('../gateway/app');
const http = require('http');
const logger = require('../logger/winston');

const port = normalizePort('9000');

const server = http.createServer(app);
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

function normalizePort(value) {
	var port = parseInt(value, 10);

	if(isNaN(port)) {
		return value;
	}

	if(port >= 0) {
		return port;
	}

	return false;
}