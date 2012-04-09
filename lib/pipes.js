var db = require('./spokemongodb');

var pipes = {};

pipes.add = function(pipe, callback) {
  db.open(function(e, client) {
    if(e) {
      return callback(e, client);    
    }       
    client.collection('pipes', function (e, collection) {
      if(e) {
        return callback(e, collection);
      }
      
      collection.insert(pipe, function(e, docs) {
      if(e) {
        return callback(e, collection);
      }
      return callback(null, docs[0].name);
     });
    });
  });
};

module.exports = pipes;
