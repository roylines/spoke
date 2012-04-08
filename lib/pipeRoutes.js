var pipes = require('./pipes');

var pipeRoutes = {};

var send500OnError = function(response, error) {
  if(error) {
    return response.send(500);  
  }   

  return response.send(200);    
}

pipeRoutes.initialise = function(app) {  
  app.post('/pipe', pipeRoutes.addPipe);
  return app;
}

pipeRoutes.addPipe = function(req, res) { 
  var pipe = { };
  pipes.add(pipe, function(e, d) {
    return send500OnError(res, e);
  });
}

module.exports = pipeRoutes;
