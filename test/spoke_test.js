var assert = require('assert'),
    express = require('express'),
    pipeRoutes = require('../lib/pipeRoutes.js'),
    spoke = require('../lib/spoke.js'),
    sinon = require('sinon'),
    vows = require('vows');

var app = express.createServer();

vows
.describe('spoke')
.addBatch({  
  'with valid port': {
    topic: 42,
    'calling start': {
      topic: function(port) {
        sinon.stub(pipeRoutes, 'initialise');
        sinon.stub(app, 'listen');
        sinon.stub(express, 'createServer').returns(app);
        spoke.start(port, this.callback);
      },
      'should not error': function(e) {
        assert.equal(e, null);
      },
      'should call createServer once': function() {
        assert.ok(express.createServer.calledOnce);
      },
      'should call listen with correct port': function() {
        assert.ok(app.listen.withArgs(42).calledOnce);
      },
      'should initialise pipes routes': function() {
        assert.ok(pipeRoutes.initialise.withArgs(app).calledOnce);
      },
      teardown: function() {
        pipeRoutes.initialise.restore();
        app.listen.restore();
        express.createServer.restore();
      }
    }
  }
})
.export(module);
