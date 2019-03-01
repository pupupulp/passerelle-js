const express = require('express');
const router = express.Router();
const adapter = require('../adapter');

const BASE_URL = 'https://api.github.com';
const api = adapter(BASE_URL);

router.get('/users/pupupulp', (req, res) => {
	api.get(req.path).then(resp => {
		res.send(resp.data)
	});
});

module.exports = router;