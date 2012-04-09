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
      
      collection.insert({a:2}, function(e, docs) {
      if(e) {
        return callback(e, collection);
      }
      console.log(docs);
      return callback(null, null);
     });
    });
  });
};

module.exports = pipes;
