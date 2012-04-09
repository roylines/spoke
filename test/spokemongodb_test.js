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
      return spokemongodb.configuration();
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
.addBatch({  
  'calling configuration with variables set': {
    topic: function() {
      process.env = {
        SPOKE_MONGO_DATABASE: 'd',
        SPOKE_MONGO_HOST: 'h',
        SPOKE_MONGO_PORT: '42',
        SPOKE_MONGO_USER: 'u',
        SPOKE_MONGO_PASSWORD: 'p',
      };
      return spokemongodb.configuration();
    },
    'should set default database': function(config) {
      assert.equal(config.database, 'd');
    },
    'should set default host': function(config) {
      assert.equal(config.host, 'h');
    },
    'should set default port': function(config) {
      assert.equal(config.port, 42);
    },
    'should set default user': function(config) {
      assert.equal(config.user, 'u');
    },
    'should set default password': function(config) {
      assert.equal(config.password, 'p');
    }
  }
})
.export(module);
