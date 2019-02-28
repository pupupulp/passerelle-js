const Koa = require('koa');
const koaLogger = require('koa-logger');
const onerror = require('koa-onerror');
const respond = require('koa-respond');
const routers = require('./router/bridge');

const app = new Koa();

onerror(app);

app.use(koaLogger());

app.use(respond());

app.use(routers());

module.exports = app;