import {
  DATA_LOADING_START,
  NUMERIC_DATA_LOADING_SUCCESS,
  ALPHABETIC_DATA_LOADING_SUCCESS,
  SHOWN_DATA_LOADING_SUCCESS,
} from '../actions/stateTypes';

import { subArticle } from '../models/models';

declare interface IAction {
  type: string;
  payload: any;
}
export interface InitState {
  allNumericData: Array<subArticle>;
  allAlphabeticData: Array<subArticle>;
  shownData: Array<subArticle>;
  onLoadingData: boolean;
}

const INITIAL_STATE = {
  allNumericData: [],
  allAlphabeticData: [],
  shownData: [],
  onLoadingData: false,
};

export default (state = INITIAL_STATE, action: IAction): InitState => {
  switch (action.type) {
    case DATA_LOADING_START:
      return {
        ...state,
        onLoadingData: true,
      };

    case NUMERIC_DATA_LOADING_SUCCESS:
      return {
        ...state,
        onLoadingData: false,
        allNumericData: action.payload,
      };

    case ALPHABETIC_DATA_LOADING_SUCCESS:
      return {
        ...state,
        onLoadingData: false,
        allAlphabeticData: action.payload,
      };
    case SHOWN_DATA_LOADING_SUCCESS:
      return {
        ...state,
        onLoadingData: false,
        shownData: action.payload,
      };

    default:
      return state;
  }
};
