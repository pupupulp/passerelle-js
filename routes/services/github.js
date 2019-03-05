const express = require('express');
const rateLimit = require('express-rate-limit');
const adapter = require('../adapter');
const handler = require('../../helpers/handler');

const router = express.Router();

const BASE_URL = 'https://api.github.com';
const api = adapter(BASE_URL);

const apiLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour window
	max: 5, // start blocking after 5 requests
	message:
		'Too many accounts created from this IP, please try again after an hour'
});

router.get('/users/pupupulp', apiLimiter, async (req, res, next) => {
	await api.get(req.path)
		// eslint-disable-next-line no-unused-vars
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