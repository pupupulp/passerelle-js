const Router = require('koa-router');
const combineRouters = require('koa-combine-routers');
const githubRouter = require('./services/github');

const gatewayRouter = new Router();

gatewayRouter.get('/', (ctx, next) => {
	ctx.body = 'Welcome to Passerelle';
	next();
});

const routers = combineRouters(
	gatewayRouter,
	githubRouter
);

module.exports = routers;