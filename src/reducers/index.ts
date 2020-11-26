import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import { InitState } from '../models/models';

export interface IRootState {
  data: InitState;
}

export default combineReducers({
  //no need to combine
  data: dataReducer,
});
