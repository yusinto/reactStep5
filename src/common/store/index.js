/*
 * Ripped from https://github.com/StevenIseki/react-router-redux-example/blob/master/src/store.js
 * */
import { createStore } from 'redux';
import reducers from '../reducer';

export default function() {
  const store = createStore(reducers);
  return store;
};