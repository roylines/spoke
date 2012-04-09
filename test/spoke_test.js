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
        spoke.start(42, this.callback);
      },
      'should not error': function(e, d) {
        assert.equal(e, null);
      },
      'should call createServer once': function(e, d) {
        assert(express.createServer.calledOnce);
      },
      'should call listen with correct port': function(e, d) {
        assert(app.listen.withArgs(42).calledOnce);
      },
      'should initialise pipes routes': function(e, d) {
        assert(pipeRoutes.initialise.withArgs(app).calledOnce);
      },
      teardown: function(port) {
        pipeRoutes.initialise.restore();
        app.listen.restore();
        express.createServer.restore();
      }
    },
  }
})
.export(module);
