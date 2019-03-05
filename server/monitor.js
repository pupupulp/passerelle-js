const monitor = require('express-status-monitor')({ path: '' });

module.exports = app => {
	app.use(monitor.middleware);
	app.get('/status', monitor.pageRoute);
};