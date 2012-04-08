var pipes = {};

pipes.add = function(pipe, callback) {
  process.nextTick(function () {
    callback(null);
  });
}

module.exports = pipes;
