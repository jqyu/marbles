// gathers all the things

import state, { reduceState, addStateListener } from './state';
import socket from './socket';

class Marbles {

  constructor() {
    this.state = state;
  }

  onUpdate(state) {
    this.state = state;
    console.log('on update:', state.test);
  }

}

var marbles = new Marbles();
addStateListener(marbles);

// sup nerds
setTimeout(() => {
  reduceState({
    test: "cya, nerds"
  });
}, 1000);

setInterval(() => {
  reduceState({
    test: (Math.random() > 0.5) ? "hello world" : "cya nerds"
  });
}, 1000);
