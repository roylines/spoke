var pipes = require('./pipes');

var pipeRoutes = {};

pipeRoutes.initialise = function(app) {    
  app.post('/pipe', pipeRoutes.addPipe);
  return app;
};

pipeRoutes.addPipe = function(request, response) { 
  var pipe = { };
  pipes.add(pipe, function(error, pipeId) {
    if(error) {
      return response.send(500);  
    }   
    return response.send({ id: pipeId, self: 'http://' + request.headers.host + '/pipe/' + pipeId }, 201);    
  });
};

module.exports = pipeRoutes;
