const express = require('express');
const VitalSigns = require('vitalsigns');

const logger = require('../middlewares/logger/winston');

const router = express.Router();
const vitals = new VitalSigns({
	autoCheck: 5000,
	httpHealthy: 200,
	httpUnhealthy: 503
});

vitals.monitor('cpu');
vitals.unhealthyWhen('cpu', 'usage').greaterThan(90);

vitals.monitor('mem', { units: 'MB' });

vitals.monitor('tick');
vitals.unhealthyWhen('tick', 'maxMs').greaterThan(500);

vitals.monitor('uptime');
vitals.unhealthyWhen('uptime', 'sys').equals(0);

vitals.on('healthChange', (healthy, failedChecks) => {
	logger.info('Server is ' + (healthy ? 'healthy' : 'unhealthy'));
	logger.info('Failed checks: ' + failedChecks);
});

router.get('/health', vitals.express);

module.exports = router;