const express = require('express');
const rateLimit = require('express-rate-limit');

const adapter = demand('utils/api-adapter');
const handler = demand('helpers/handler');
const limiter = demand('middlewares/limiter');
const logger = demand('utils/logger');
const httpLogger = demand('utils/http-logger');

const router = express.Router();

router.use(httpLogger.console);
router.use(httpLogger.file);

const BASE_URL = 'https://api.github.com';
const api = adapter(BASE_URL);

router.get('/users/pupupulp', 
	limiter.slowDown,
	limiter.global, 
	async (req, res, next) => {
		await api.get(req.path)
			.then(resp => {
				// res.send(resp.data);
				const error = new Error('Sample operational error');
				error.isOperational = true;

				throw error;
			})
			.catch(error => {
				next(error);
			});
	});

router.use(async (err, req, res, next) => {
	await handler.error.handleError(err);
	res.status(204).end();
});

module.exports = router;