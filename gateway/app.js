const express = require('express');
const requestId = require('express-request-id')();
const bodyParser = require('body-parser');
const useragent = require('express-useragent');

const minify = demand('middlewares/minify');
const secure = demand('middlewares/security');
const routers = demand('routes/bridge');

const app = express();

minify(app);
secure(app);

app
	.use(requestId)
	.use(useragent.express())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(routers);

module.exports = app;