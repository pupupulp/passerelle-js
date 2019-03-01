const express = require('express');
const logger = require('../../logger/winston');

const router = express.Router();

router.get('/csp-violation', (req, res) => {
	if (req.body) {
		logger.info('CSP Violation: ', req.body);
	} else {
		logger.info('CSP Violation: No data received!');
	}

	res.status(204).end();
});

router.get('/xss-violation', (req, res) => {
	if (req.body) {
		logger.info('XSS Violation: ', req.body);
	} else {
		logger.info('XSS Violation: No data received!');
	}

	res.status(204).end();
});

module.exports = router;