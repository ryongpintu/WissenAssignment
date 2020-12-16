import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducers from './userReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  user:userReducers
});
