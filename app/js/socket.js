/*
 *
 * Handles current connection to server
 *
 */

import { reduceState, addListener } from './state';
import config from '../../config/environment';

let wsUrl = `ws://${config.ws.host}`;

class Socket {

  constructor() {
    this.ws = new WebSocket(wsUrl);
    this.ws.onmessage = function() {
      console.log('tock...');
    };
  }
  
}

var socket = new Socket();

export default socket;
