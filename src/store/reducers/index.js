import { combineReducers } from 'redux';
import calendar from './calendar';
import user from './user';

export default combineReducers({
  user,
  calendar,
})