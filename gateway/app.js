const express = require('express');
const monitor = require('express-status-monitor')({ path: '' });
const addRequestId = require('express-request-id');

const secure = require('../server/security');
const router = require('./router/bridge');
const bodyParser = require('body-parser');

const app = express();

secure(app);

app.use(monitor.middleware);
app.get('/status', monitor.pageRoute);

app.use(addRequestId());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

module.exports = app;