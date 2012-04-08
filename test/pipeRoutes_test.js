var assert = require('assert'),
    express = require('express'),
    pipes = require('../lib/pipes.js'),
    pipeRoutes = require('../lib/pipeRoutes.js'),
    sinon = require('sinon'),
    vows = require('vows');

var app = express.createServer();

vows
.describe('pipeRoutes')
.addBatch({
  'with routes': {
    topic: pipeRoutes,
    'calling initialise': {
      topic: function(r) {
        sinon.stub(app, 'post');
        return r.initialise(app);
      },
      'should return app': function(a) {
        assert.equal(a, app);
      },
      'should bind add route': function(a) {
        assert(app.post.withArgs('/pipe/add/:name', pipes.addPipe).calledOnce);
      },
      teardown: function(r) {
        app.post.restore();
      }
    },
  }
})
.export(module);
