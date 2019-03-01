const express = require('express');
const router = express.Router();
const githubRouter = require('./services/github');

router.use(githubRouter);

module.exports = router;