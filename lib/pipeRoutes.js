var pipes = require('./pipes');

var pipeRoutes = {};

pipeRoutes.initialise = function(app) {    
  app.post('/pipe/:pipe', pipeRoutes.addPipe);
  app.post('/pipe/:pipe/stage/:stage/start', pipeRoutes.startStage);
  app.post('/pipe/:pipe/stage/:stage/fail', pipeRoutes.failStage);
  app.post('/pipe/:pipe/stage/:stage/end', pipeRoutes.endStage);
  return app;
};

pipeRoutes.mapPipe = function(request) {
  return { name: 'unknown' };
}

pipeRoutes.addPipe = function(request, response) { 
  var pipe = pipeRoutes.mapPipe(request);
  pipes.add(pipe, function(error, pipeId) {
    if(error) {
      return response.send(500);  
    }   
    return response.send({ id: pipeId, self: 'http://' + request.headers.host + '/pipe/' + pipeId }, 201);    
  });
};

pipeRoutes.startStage = function(request, response) {
  return response.send(404);
};

pipeRoutes.failStage = function(request, response) {
  return response.send(404);
};

pipeRoutes.endStage = function(request, response) {
  return response.send(404);
};

module.exports = pipeRoutes;
