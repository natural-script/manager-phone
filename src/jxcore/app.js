var fs = require('fs');
var clog = require('./utilities').log;
var express = require('express');
var cors = require('cors');
var cors_proxy = require('cors-anywhere');
var app = express();
app.use(cors())

app.get('/framework', function (req, res) {
  res.sendfile('assets/framework.html')
  clog("Request", req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress, new Date());
});

app.get('/webcomponents-loader', function (req, res) {
  res.sendfile('assets/webcomponents-lite.js')
  clog("Request", req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress, new Date());
});

app.get('/db-manager', function (req, res) {
  res.sendfile('assets/DBManager.html')
  clog("Request", req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress, new Date());
});

var server = app.listen(5050, function () {
  clog("Express server is started. (port: 5050)");
});

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2']
}).listen(6060, '0.0.0.0', function() {
});
