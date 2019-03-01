const express = require('express');
const router = express.Router();
const logger = require('../../logger/winston');

router.get('/csp-violation', (req, res) => {
	if (req.body) {
		logger.info('CSP Violation: ', req.body);
	} else {
		logger.info('CSP Violation: No data received!');
	}

	res.status(204).end();
});

module.exports = router;