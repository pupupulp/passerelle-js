const express = require('express');
const app = express();
const router = require('./router/bridge');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

module.exports = app;