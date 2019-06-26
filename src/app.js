const express = require('express');
const requestId = require('express-request-id')();
const bodyParser = require('body-parser');
const useragent = require('express-useragent');

const minify = demand('utils/minify');
const secure = demand('utils/security');
const routers = demand('routes/bridge');

const app = express();

minify(app);
secure(app);

app
	.use(requestId)
	.use(useragent.express())
	.use(bodyParser.json({ limit: '10mb' }))
	.use(bodyParser.json({
		limit: '10mb',
		type: ['json', 'application/csp-report']
	}))
	.use(bodyParser.urlencoded({ 
		limit: '10mb',
		extended: false 
	}))
	.use(routers);

module.exports = app;