/*
 * HANDLES CURRENT APPLICATION STATE 
 */

// INTERNAL REPRESENTATION OF STATE

  // enum of possible gamestates
  let GameState = {
    LOADING: 0,
    INITIALIZING: 1,
    PLAYING: 2
  }

  // singleton store describing application state
  let state = {
    stage: GameState.LOADING,
    session: null,
    round: null,
    test: "hello world"
  }

  // list of state listeners
  let listeners = [];

// EXPORTS

  export default state;

  // impure version of a reducer store
  export function reduceState(actions) {

    if (!actions) return;

    var mutated = false;

    // execute each action
    for (var action in actions) {
      var payload = actions[action];
      switch (action) {
        case "test":
          mutated = state.test != payload;
          state.test = payload;
          break;
      }
    }

    if (!mutated) return;

    console.log('alerting listeners...');

    // alert listeners of changes 
    listeners.forEach(l => {
      l.onUpdate(state);
    });

  };

  export function addStateListener(obj) {
    listeners.push(obj);
    obj.onUpdate(state);
  };
