const express = require('express');
const securityRouter = require('./security');
const githubRouter = require('./services/github');

const router = express.Router();

router.use(securityRouter);
router.use(githubRouter);

module.exports = router;