'use strict';

let path = require('path');
let express = require('express');
let app = express();

let paths = {
  statics: '/public',
  app: '/dist',
  main: '/dist/index.html'
}

// make paths absolute
for (var key in paths) {
  paths[key] = path.join(__dirname, '../', paths[key]);
}

module.exports = function(port) {

  app.use(express.static(paths.statics));
  app.use(express.static(paths.app));

  app.get('*', function(req, res) {
    res.sendFile(paths.main);
  });

  let server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("marbles listening at http://%s:%s", host, port);  
  });

}
