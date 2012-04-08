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
        pipes.add.yields(null);
        var cb = this.callback;
        response.send = function(a) { cb(null, a); };
        r.addPipe(request, response);
      },
      'should call send with 200': function(e, d) {
        assert.equal(d, 200); 
      },
    },
    'calling addPipe unsuccessfully': {
      topic: function(r) {
        pipes.add.yields('ERROR');
        var cb = this.callback;
        response.send = function(a) { cb(null, a); };
        r.addPipe(request, response);
      },      
      'should call send with 500': function(e, d) {
        assert.equal(d, 500); 
      },
    },
  }
})
.export(module);
