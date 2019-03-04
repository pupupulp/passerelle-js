const express = require('express');
const monitor = require('express-status-monitor')({ path: '' });
const addRequestId = require('express-request-id');
const bodyParser = require('body-parser');
const compression = require('compression');
const httpErrorPages = require('http-error-pages');

const secure = require('./server/security');
const router = require('./routes/bridge');
const CONSTANTS = require('./config/constants');

const app = express();

app.use(compression());
secure(app);

httpErrorPages.express(app, {
	lang: 'en_US',
	footer: CONSTANTS.APP_NAME
});

app.use(monitor.middleware);
app.get('/status', monitor.pageRoute);

app.use(addRequestId());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

module.exports = app;