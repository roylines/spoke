var assert = require('assert'),
    express = require('express'),
    pipes = require('../lib/pipes.js'),
    pipeRoutes = require('../lib/pipeRoutes.js'),
    sinon = require('sinon'),
    vows = require('vows');

sinon.stub(pipes, 'add').yields(null);

var app = express.createServer();
sinon.stub(app, 'post');

var request = { params: { name: 'NAME' } };
var response = { send: function(status) { } };

vows
.describe('pipeRoutes')
.addBatch({
  'with routes': {
    topic: pipeRoutes,
    'calling initialise': {
      topic: function(r) {
        return r.initialise(app);
      },
      'should return app': function(a) {
        assert.equal(a, app);
      },
      'should bind add route': function(a) {
        assert(app.post.withArgs('/pipe', pipeRoutes.addPipe).calledOnce);
      },
    },
    'calling addPipe successfully': {
      topic: function(r) {
        callAddPipe(r, null, this.callback);
      },
      'should call send with 201': function(e, d) {
        assert.equal(d.second, 201); 
      },
    },
    'calling addPipe unsuccessfully': {
      topic: function(r) {
        callAddPipe(r, 'ERROR', this.callback);
      },      
      'should call send with 500': function(e, d) {
        assert.equal(d.first, 500); 
      },
    },
  }
})
.export(module);

var callAddPipe = function(route, addResult, callback) {
  pipes.add.yields(addResult);
  response.send = function(a, b) { callback(null, { first: a, second: b }); };
  route.addPipe(request, response);  
};
