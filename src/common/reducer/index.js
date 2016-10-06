import {combineReducers} from 'redux';
import Home from './homeReducer';
import {ldReducer} from '../../ld-redux';

export default combineReducers({
  Home,
  LD: ldReducer,
});