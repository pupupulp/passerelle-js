const express = require('express');
const heapdump = require('heapdump');
const fs = require('fs');

const logger = require('../middlewares/logger/winston');

const router = express.Router();

router.get('/csp-violation', async (req, res) => {
	let message = 'Empty data';

	if (req.body) {
		message = req.body;
	}

	await logger.info('CSP Violation: ' + message);

	res.status(204).end();
});

router.get('/xss-violation', async (req, res) => {
	let message = 'Empty data';

	if (req.body) {
		message = req.body;
	}

	await logger.info('XSS Violation: ' + message);

	res.status(204).end();
});

router.get('/ops-heapdump', (req, res) => {
	logger.info('Generating heapdump');
	const filepath = './logs/heapdump/' + Date.now() + '.heapsnapshot';
	heapdump.writeSnapshot(filepath, (err, filename) => {
		logger.info('Heapdump file is ready to be sent to the caller', filename);
		fs.readFile(filename, 'utf-8', (err, data) => {
			res.end(data);
		});
	});
});

module.exports = router;