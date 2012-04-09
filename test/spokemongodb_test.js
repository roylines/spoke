var assert = require('assert'),
    mongodb = require('mongodb'),
    spokemongodb = require('../lib/spokemongodb'),
    vows = require('vows');
    
vows
.describe('spokemongodb')
.addBatch({  
  'calling configuration with no variables set': {
    topic: function() {
      process.env = { };
      return spokemongodb.configuration;
    },
    'should set default database': function(config) {
      assert.equal(config.database, 'spoke');
    },
    'should set default host': function(config) {
      assert.equal(config.host, 'localhost');
    },
    'should set default port': function(config) {
      assert.equal(config.port, mongodb.Connection.DEFAULT_PORT);
    },
    'should set default user': function(config) {
      assert.equal(config.user, undefined);
    },
    'should set default password': function(config) {
      assert.equal(config.password, undefined);
    }
  }
})
.export(module);
