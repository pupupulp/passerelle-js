const Router = require('koa-router');
const adapter = require('../adapter');

const router = new Router();

const BASE_URL = 'https://api.github.com';
const api = adapter(BASE_URL);

router.get('/users/pupupulp', (ctx, next) => {
	api.get('/users/pupupulp')
		.then(response => {
			ctx.body = response;
		})
		.catch(error => {
			ctx.body = error;
		});

	ctx.body = 'pupupulp';

	next();
});


module.exports = router;