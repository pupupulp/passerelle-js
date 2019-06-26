const express = require('express');
const endpoints = require('express-list-endpoints');


const authRouter = demand('routes/services/auth-service');
const githubRouter = demand('routes/services/github-service');
const securityViolationRouter = demand('routes/security-violation');

const authCheck = demand('middlewares/auth-check');

const router = express.Router();

router.use(authRouter);

router.use(authCheck.checkAccessToken);

router.use(securityViolationRouter);
router.use(githubRouter);

router.get('/endpoints', (req, res) => {
	res.send(endpoints(router));
});

module.exports = router;