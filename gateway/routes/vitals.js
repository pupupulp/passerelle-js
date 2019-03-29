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

vitals.on('healthChange', (healthy, checks) => {
	logger.info('Server is ' + (healthy ? 'healthy' : 'unhealthy'));
	logger.info('CPU usage: ' + checks.cpu.usage + '%');
	logger.info('Memory free: ' + checks.mem.free + 'MB');
	logger.info('Memory process: ' + checks.mem.process + 'MB');
	logger.info('Tick average ms: ' + checks.tick.avgMs + 'ms');
	logger.info('Tick max ms: ' + checks.tick.maxMs + 'ms');
	logger.info('Tick per second: ' + checks.tick.perSec + 's');
	logger.info('Uptime sys: ' + checks.uptime.sys + 's');
	logger.info('Uptime proc: ' + checks.uptime.proc + 's');
});

router.get('/health', vitals.express);

module.exports = router;