var pipes = {};

pipes.add = function(pipe, callback) {
  process.nextTick(function () {
    var pipeId = null;
    callback(null, pipeId);
  });
}

module.exports = pipes;
