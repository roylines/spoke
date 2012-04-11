var db = require('./spokemongodb');

var stages = {};

stages.start = function(pipe, stage, callback) {
  return callback('not implemented');
};

stages.fail = function(pipe, stage, callback) {
  return callback('not implemented');
};

stages.end = function(pipe, stage, callback) {
  return callback('not implemented');
};

module.exports = stages;
