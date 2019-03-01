const helmet = require('helmet');
const cors = require('cors');
const sslify = require('express-sslify');

module.exports = app => {
	app.use(helmet.contentSecurityPolicy({
		directives: {
			// eslint-disable-next-line quotes
			defaultSrc: ["'self'"],
			// eslint-disable-next-line quotes
			scriptSrc: ["'self'"],
			// eslint-disable-next-line quotes
			styleSrc: ["'self'"],
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

	app.use(helmet.ieNoOpen());

	app.use(helmet.noCache());

	app.use(helmet.noSniff());

	app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

	app.use(helmet.xssFilter({ reportUri: '/xss-violation' }));

	app.use(cors());

	app.use(sslify.HTTPS());
};