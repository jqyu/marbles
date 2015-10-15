'use strict';

module.exports = function(socket) {

  function tick() {
    console.log('tick...');
    socket.tick();
  }

  var tickLoop = setInterval(tick, 1000);

};
