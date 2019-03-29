const compression = require('compression');
const minify = require('express-minify');

module.exports = (app) => {
	app.use(compression());
	app.use(minify());
};