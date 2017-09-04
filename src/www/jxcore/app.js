const fs = require('fs');
const clog = require('./utilities').log;
const express = require('express');
const staticGzip = require('http-static-gzip-regexp');
const cors = require('cors');
const bodyParser = require('body-parser');
const JsonDB = require('node-json-db');
const cors_proxy = require('cors-anywhere');
const root = 'assets';
const appConfigDir = '/sdcard/Android/data/com.jste.manager';
const managerConfigDB = new JsonDB(appConfigDir + "/managerConfigDB", true, false);
const getFileSize = require('remote-file-size');
const dataURLsDB = new JsonDB(appConfigDir + "/dataURLsDB", true, false);
const app = express();
app.use(cors());
app.use(bodyParser({
  limit: '50mb'
}));

app.use(staticGzip(/(framework\.min\.html)$/));

  app.use(express.static(root));

  var server = app.listen(5050, function () {});

  app.post('/setAdminPassword', function (req, res) {
    if (managerConfigDB.getData('/').adminPassword) {
      if (managerConfigDB.getData('/').adminPassword == req.body.oldPassword) {
        managerConfigDB.push('/', {
          adminPassword: req.body.newPassword
        }, false);
        res.send('The admin password has been set successfuly ;)');
      } else {
        res.send('Authentication failed :(');
      }
    } else {
      managerConfigDB.push('/', {
        adminPassword: req.body.newPassword
      }, false);
      res.send('The admin password has been set successfuly ;)');
    }
  });

  app.post('/childModeActivate', function (req, res) {
    if (req.body.adminPassword && req.body.adminPassword == managerConfigDB.getData('/').adminPassword) {
      managerConfigDB.push('/', {
        childMode: 'on'
      }, false);
      res.send('Child mode has been activated successfuly ;)');
    } else {
      res.send('Authentication failed :(');
    }
  });

  app.post('/childModeDeactivate', function (req, res) {
    if (req.body.adminPassword && req.body.adminPassword == managerConfigDB.getData('/').adminPassword) {
      managerConfigDB.push('/', {
        childMode: 'off'
      }, false);
      res.send('Child mode has been deactivated successfuly ;)');
    } else {
      res.send('Authentication failed :(');
    }
  });

  app.get('/childModeStatus', function (req, res) {
    res.send(managerConfigDB.getData('/').childMode);
  });

  app.get('/adminPasswordStatus', function (req, res) {
    if (managerConfigDB.getData('/').adminPassword) {
      res.send('set');
    } else {
      res.send('not set');
    }
  });

  app.post('/adminPasswordVerification', function (req, res) {
    if (managerConfigDB.getData('/').adminPassword == req.body.adminPassword) {
      res.send('You have been logged in successfuly ;)');
    } else {
      res.send('Authentication failed :(');
    }
  });

  app.post('/verifyDataURL', function (req, res) {
    if (dataURLsDB.getData('/')[req.body.URLID]) {
      res.send('exists');
    } else {
      res.send('not exist');
    }
  });

  app.post('/getDataURL', function (req, res) {
    res.send(dataURLsDB.getData('/')[req.body.URLID]);
  });

  app.post('/insertDataURL', function (req, res) {
    dataURLsDB.push('/', {
      [req.body.URLID]: req.body.dataURL
    }, false);
    res.send('The data URL has been saved successfuly ;)');
  });

  app.post('/getFileSize', function (req, res) {
    getFileSize(req.body.fileURL, function (err, o) {
      res.send(String(o));
    });
  });

  var localAddress = '0.0.0.0' || 'localhost';
  cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],
    setHeaders: {
      "Access-Control-Expose-Headers": "Content-Length"
    },
    removeHeaders: ['cookie', 'cookie2']
  }).listen(6060, localAddress, function () {});