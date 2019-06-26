const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const date = moment().format('YYYYMMDD');

const format = '[:date[iso]] [SERVER] [INFO] [:remote-addr] [:remote-user]: :method :url HTTP/:http-version " :status :res[content-length] ":referrer" ":user-agent"';
const logPath = path.join(__dirname, `../../logs/${date}/log.txt`);
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

module.exports.file = morgan(format, {
    stream: logStream
});

module.exports.console = morgan(format);