const express = require('express');
const heapdump = require('heapdump');
const fs = require('fs');

const logger = require('../middlewares/logger/winston');

const router = express.Router();

router.get('/csp-violation', (req, res) => {
	if (req.body) {
		logger.info('CSP Violation: ', req.body);
	} else {
		logger.info('CSP Violation: Empty data');
	}

	res.status(204).end();
});

router.get('/xss-violation', (req, res) => {
	if (req.body) {
		logger.info('XSS Violation: ', req.body);
	} else {
		logger.info('XSS Violation: Empty data');
	}

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