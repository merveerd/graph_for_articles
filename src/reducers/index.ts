import {combineReducers} from 'redux';
import dataReducer, {InitState} from './dataReducer';

export interface IRootState {
    data: InitState
}

export default combineReducers({
  data: dataReducer,
});
