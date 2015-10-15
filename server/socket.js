'use strict';

module.exports = function(port) {
   
  let WebSocketServer = require('ws').Server;
  let wss = new WebSocketServer({
    port: port
  });

  wss.on('connection', ws => {
    console.log('we got a connection~');
  });

  wss.tick = function() {
    wss.clients.forEach(client => {
      client.send("tick...");
    });
  }

  let game = require('./game')(wss);

   
};
