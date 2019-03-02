const helmet = require('helmet');
const cors = require('cors');
const sslify = require('express-sslify');
const overloadProtection = require('overload-protection');
const Ddos = require('ddos');
const ddos = new Ddos({ burst: 10, limit: 15 });
const jwt = require('express-jwt');
const blacklist = require('express-jwt-blacklist');
const ipFilter = require('express-ip-filter');

module.exports = app => {
	// TODO: make separate file for list of whitelist and blacklist
	const whitelist = ['*'];
	const blacklist = ['!213.15.*'];

	app.use(ipFilter({
		forbidden: '403: Get out of here!',
		filter: [
			...whitelist,
			...blacklist
		]
	}));

	// TODO: Change secret
	app.use(jwt({
		secret: 'secret-here',
		isRevoked: blacklist.isRevoked
	}));

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

	// TODO: Fix HTTPS protocol
	// app.use(sslify.HTTPS());

	const overloadConfig = {
		production: process.env.NODE_ENV === 'production',
		clientRetrySecs: 1,
		sampleInterval: 5,
		maxEventLoopDelay: 42,
		maxHeapUsedBytes: 0,
		maxRssBytes: 0,
		errorPropagationMode: false
	};

	app.use(overloadProtection('express', overloadConfig));
	app.use(ddos.express);
};