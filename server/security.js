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

	app.use(helmet.permittedCrossDomainPolicies());

	app.use(helmet.dnsPrefetchControl());

	app.use(helmet.frameguard({ action: 'sameorigin' }));

	app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.3.0' }));

	const thirtyDaysInSeconds = 2592000;

	app.use(helmet.hsts({
		maxAge: thirtyDaysInSeconds
	}));
};