var pipes = {};

pipes.add = function(name, callback) {
  process.nextTick(function () {
    callback(null);
  });
}

module.exports = pipes;
