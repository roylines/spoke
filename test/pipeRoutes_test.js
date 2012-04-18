var assert = require('assert'),
    express = require('express'),
    pipes = require('../lib/pipes.js'),
    pipeRoutes = require('../lib/pipeRoutes.js'),
    sinon = require('sinon'),
    stages = require('../lib/stages.js'),
    vows = require('vows');

sinon.stub(pipes, 'start').yields(null);

var app = express.createServer();
sinon.stub(app, 'post');

var request = { headers: { host: 'HOST:PORT' } };
var response = { send: function() { } };
var samplePipe = { field: 'pipe' };
var sampleStage = { field: 'stage' };

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
      'should bind start pipe (no params)': function() {
        assert.ok(app.post.withArgs('/pipe/:pipe', pipeRoutes.startPipe).calledOnce);
      },
      'should bind start pipe': function() {
        assert.ok(app.post.withArgs('/pipe/:pipe/start', pipeRoutes.startPipe).calledOnce);
      },
      'should bind start stage (no params)': function() {
        assert.ok(app.post.withArgs('/pipe/:pipe/stage/:stage', pipeRoutes.startStage).calledOnce);
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
    'calling startPipe': {
      topic: function(r) {
        sinon.stub(pipeRoutes, 'mapPipe').returns(samplePipe);
        callStartPipe(r, null, 42, this.callback);
      },
      'should pass mapped pipe': function(e, d) {
        assert.ok(pipes.start.withArgs(samplePipe).calledOnce); 
      },
      teardown: function(e, d) {
        pipeRoutes.mapPipe.restore();
      }
    },
    'calling startPipe successfully': {
      topic: function(r) { 
       callStartPipe(r, null, 42, this.callback);
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
    'calling startPipe unsuccessfully': {
      topic: function(r) {
        callStartPipe(r, 'ERROR', null, this.callback);
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
.addBatch({
  'with a valid request': {
    topic: { 
      param: function(name, def) {
        if(name === 'pipe') {
          return 'pipename';
        }
        if(name === 'stage') {
          return 'stagename';
        }
        return 'unexpected';
      } 
    },
    'calling mapPipe': { 
      topic: function(request) {
        return pipeRoutes.mapPipe(request);      
      },
      'should set name': function(pipe) {
        assert.equal(pipe.name, 'pipename');
      },
    },
    'calling mapStage': { 
      topic: function(request) {
        return pipeRoutes.mapStage(request);      
      },
      'should set name': function(stage) {
        assert.equal(stage.name, 'stagename');
      },
    }
  }
})
.export(module);

var callStartPipe = function(route, addError, addData, callback) {
  pipes.start.reset();
  pipes.start.yields(addError, addData);
  response.send = function(a, b) { callback(null, { first: a, second: b }); };
  route.startPipe(request, response);  
};

