import {combineReducers} from 'redux';
import Home from './homeReducer';
import LD from '../../ld-redux/reducer';

export default combineReducers({
  Home,
  LD,
});