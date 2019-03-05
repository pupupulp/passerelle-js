const express = require('express');
const addRequestId = require('express-request-id');
const bodyParser = require('body-parser');

const secure = require('./server/security');
const monitor = require('./server/monitor');
const router = require('./routes/bridge');

const app = express();

secure(app);
monitor(app);

app
	.use(addRequestId())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(router);

module.exports = app;