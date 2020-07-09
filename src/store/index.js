import { createStore } from 'easy-peasy';
import models from '../models';
import setAuthToken from '../utils/setAuthToken';

const store = createStore(models);

let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.authData.token !== currentState.auth.authData.token) {
    const token = currentState.auth.authData.token;
    setAuthToken(token);
  }
});

export default store;
