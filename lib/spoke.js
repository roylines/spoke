var express = require('express'),
    pipeRoutes = require('./pipeRoutes');

var spoke = {};

spoke.start = function(port, callback) {
  spoke.app = express.createServer();
  spoke.initialiseRoutes();
  spoke.app.listen(port);
  callback(null);
};

spoke.initialiseRoutes = function() {
  pipeRoutes.initialise(spoke.app);
}

module.exports = spoke;
