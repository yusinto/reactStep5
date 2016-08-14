import { combineReducers } from 'redux';
import App from './appReducer';
import Home from './homeReducer';

export default combineReducers({
  App,
  Home
});