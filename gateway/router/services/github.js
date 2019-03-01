const express = require('express');
const rateLimit = require('express-rate-limit');
const adapter = require('../adapter');

const router = express.Router();

const BASE_URL = 'https://api.github.com';
const api = adapter(BASE_URL);

const apiLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour window
	max: 5, // start blocking after 5 requests
	message:
		'Too many accounts created from this IP, please try again after an hour'
});

router.get('/users/pupupulp', apiLimiter, (req, res) => {
	api.get(req.path).then(resp => {
		res.send(resp.data)
	});
});

module.exports = router;