const helmet = require('helmet');

module.exports = app => {
	app.use(helmet.contentSecurityPolicy({
		directives: {
			// eslint-disable-next-line quotes
			defaultSrc: ["'self'"],
			// eslint-disable-next-line quotes
			scriptSrc: ["'self'"],
			reportUri: '/csp-violation',
		}
	}));
};