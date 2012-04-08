var express = require('express');

var spoke = {};

spoke.start = function(port, callback) {
  spoke.app = express.createServer();
  spoke.app.listen(port);
  callback();
};

module.exports = spoke;
