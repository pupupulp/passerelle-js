const app = require('../gateway/app');
const http = require('http');

const port = '9000';

const server = http.createServer(app.callback());
server.listen(port);

server.on('error', (error) => {
	const address = server.address();

	if (error.syscall !== 'listen') {
		throw error;
	}

	switch (error.code) {
	case 'EACCES':
		// eslint-disable-next-line no-console
		console.error('Port ' + address.port + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		// eslint-disable-next-line no-console
		console.error('Port ' + address.port + ' is already in use');
		process.exit(1);
		break;
	default:
		throw error;
	}
});

server.on('listening', () => {
	const address = server.address();
	// eslint-disable-next-line no-console
	console.debug('Listening on port ' + address.port);
});