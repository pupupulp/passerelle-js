const logger = require('./winston');

function errorHandler() {
	this.handleError = async (error) => {
		if(error.isOperational) {
			await logger.info('Operational error occured: ' + error);
		}
		else {
			await logger.error(error);
		}
		// TODO: Add send email if critical
	};

	this.isTrustedError = function (error) {
		return error.isOperational;
	}
}

// eslint-disable-next-line no-unused-vars
module.exports = new errorHandler();

