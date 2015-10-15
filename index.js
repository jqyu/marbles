'use strict';

let config = require('./config/environment');

// websocket server
// * contains game instance
require('./server/socket')(config.ws.port);
 
// initialize static file server
require('./server/static')(config.http.port);
