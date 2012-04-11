var assert = require('assert'),
    express = require('express'),
    pipes = require('../lib/pipes.js'),
    pipeRoutes = require('../lib/pipeRoutes.js'),
    sinon = require('sinon'),
    vows = require('vows');

sinon.stub(pipes, 'add').yields(null);

var app = express.createServer();
sinon.stub(app, 'post');

var request = { headers: { host: 'HOST:PORT' } };
var response = { send: function() { } };
var samplePipe = { field: 'data' };

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
      'should bind add pipe': function() {
        assert.ok(app.post.withArgs('/pipe/:pipe', pipeRoutes.addPipe).calledOnce);
      },
      'should bind start stage': function() {
        assert.ok(app.post.withArgs('/pipe/:pipe/stage/:stage/start', pipeRoutes.startStage).calledOnce);
      },
      'should bind end stage': function() {
        assert.ok(app.post.withArgs('/pipe/:pipe/stage/:stage/end', pipeRoutes.endStage).calledOnce);
      },
      'should bind fail stage': function() {
        assert.ok(app.post.withArgs('/pipe/:pipe/stage/:stage/fail', pipeRoutes.failStage).calledOnce);
      }
    },
    'calling addPipe': {
      topic: function(r) {
        sinon.stub(pipeRoutes, 'mapPipe').returns(samplePipe);
        callAddPipe(r, null, 42, this.callback);
      },
      'should pass mapped pipe': function(e, d) {
        assert.ok(pipes.add.withArgs(samplePipe).calledOnce); 
      },
      teardown: function(e, d) {
        pipeRoutes.mapPipe.restore();
      }
    },
    'calling addPipe successfully': {
      topic: function(r) { 
       callAddPipe(r, null, 42, this.callback);
      },
      'should call send with 201': function(e, d) {
        assert.equal(d.second, 201); 
      },
      'should call send with self': function(e, d) {
        assert.equal(d.first.self, 'http://HOST:PORT/pipe/42');
      },
      'should call send with id': function(e, d) {
       assert.equal(d.first.id, 42 ); 
      }
    },
    'calling addPipe unsuccessfully': {
      topic: function(r) {
        callAddPipe(r, 'ERROR', null, this.callback);
      },      
      'should call send with 500': function(e, d) {
        assert.equal(d.first, 500); 
      },
      'should call send with no data': function(e, d) {
        assert.equal(d.second, null); 
      }
    }
  }
})
.export(module);

var callAddPipe = function(route, addError, addData, callback) {
  pipes.add.reset();
  pipes.add.yields(addError, addData);
  response.send = function(a, b) { callback(null, { first: a, second: b }); };
  route.addPipe(request, response);  
};
