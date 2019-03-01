const express = require('express');

const secure = require('../server/security');
const router = require('./router/bridge');
const bodyParser = require('body-parser');

const app = express();

secure(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

module.exports = app;