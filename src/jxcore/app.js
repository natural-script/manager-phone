var fs = require('fs');
var clog = require('./utilities').log;
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors())

app.get('/', function (req, res) {
  res.sendfile('index.html')
  clog("Request", req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress, new Date());
});

var server = app.listen(5050, function () {
  clog("Express server is started. (port: 5050)");
});
