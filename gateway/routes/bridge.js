const express = require('express');
const endpoints = require('express-list-endpoints');

const monitorRouter = demand('routes/monitor');
const securityViolationRouter = demand('routes/security-violation');
const maintenanceRouter = demand('routes/maintenance');

const githubRouter = demand('routes/servcies/github');

const router = express.Router();

router.use(monitorRouter);
router.use(securityViolationRouter);
router.use(maintenanceRouter);

router.use(githubRouter);

router.get('/endpoints', (req, res) => {
	res.send(endpoints(router));
});

module.exports = router;