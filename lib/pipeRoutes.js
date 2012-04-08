var pipes = require('./pipes');

var pipeRoutes = {};

pipeRoutes.initialise = function(app) {  
  app.post('/pipe/add/:name', pipes.addPipe);
  return app;
}

pipeRoutes.addPipe = function(req, res) {
  pipes.add(req.params.name, function(e, d) {
    res.send(200);  
  })
}

module.exports = pipeRoutes;
