// gathers all the things

import { reduceState, addStateListener } from './state';
import socket from './socket';

class Marbles {

  onUpdate(state) {
    // make the changes
    console.log('on update:', state);
  }

}

var marbles = new Marbles();
addStateListener(marbles);
