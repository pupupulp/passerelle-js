const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const CONSTANTS = require('../../config/constants');

const logFormat = printf(({ level, message, label, timestamp }) => {
	return `[${timestamp}] [${label}] [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
	format: combine(
		label({ label: CONSTANTS.APP_NAME }),
		timestamp(),
		logFormat
	),
	transports: [new transports.Console()]
});

module.exports = logger;