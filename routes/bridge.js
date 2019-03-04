const express = require('express');
const vitalsRouter = require('./vitals');
const securityRouter = require('./security');
const githubRouter = require('./services/github');

const router = express.Router();

router.use(vitalsRouter);
router.use(securityRouter);
router.use(githubRouter);

module.exports = router;