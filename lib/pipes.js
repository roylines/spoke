var db = require('./spokemongodb');

var pipes = {};

pipes.add = function(pipe, callback) {
  db.open(function(e, d) {
    if(e) {
      return callback(e, d);    
    }    
    var pipeId = null;
    callback(null, pipeId);    
  });
}

module.exports = pipes;
