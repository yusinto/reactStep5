/*
 * Ripped from https://github.com/StevenIseki/react-router-redux-example/blob/master/src/store.js
 * */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';

export default function () {
  const store = createStore(reducers, applyMiddleware(thunk));
  return store;
};