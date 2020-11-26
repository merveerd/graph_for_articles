import { createSelector } from 'reselect';
import {
  NUMERIC_DATA_LOADING_SUCCESS,
  QUANTITY_CHANGE,
  ORDER_TYPE_CHANGE,
  ORDER_DIRECTION_CHANGE,
} from '../actions/actionTypes';
import { types } from '../helper/stringTypes';
import { dataActionsTypes } from '../actions/actionTypes';
import { InitState } from '../models/models';
import { MergeSort } from '../helper/sorting';

const INITIAL_STATE = {
  allNumericData: [],
  quantity: 50,
  orderDirection: types.ascending,
  orderType: types.numeric,
};

export default (state = INITIAL_STATE, action: dataActionsTypes): InitState => {
  switch (action.type) {
    case NUMERIC_DATA_LOADING_SUCCESS:
      return {
        ...state,
        allNumericData: action.payload,
      };

    case QUANTITY_CHANGE:
      return {
        ...state,
        quantity: action.payload,
      };

    case ORDER_TYPE_CHANGE:
      return {
        ...state,
        orderType: action.payload,
      };

    case ORDER_DIRECTION_CHANGE:
      return {
        ...state,
        orderDirection: action.payload,
      };

    default:
      return state;
  }
};

// Selectors

const getQuantity = (state: InitState) => state.quantity;
const getOrderType = (state: InitState) => state.orderType;
const getOrderDirection = (state: InitState) => state.orderDirection;
const getAllNumericData = (state: InitState) => state.allNumericData;

export const getAlphabetic = createSelector(
  [getAllNumericData, getOrderType],
  (allNumericData, orderType) => {
    if (orderType === types.alphabetic) {
      //to not process when the page is initially loaded.
      return MergeSort(allNumericData, types.alphabetic);
    }
    return []; //to prevent returning undefined since slice method is used for chosendata
  }
);

export const getShown = createSelector(
  [
    getQuantity,
    getOrderType,
    getOrderDirection,
    getAllNumericData,
    getAlphabetic,
  ],
  (quantity, orderType, orderDirection, allNumericData, alphabeticData) => {
    let shown,
      chosenData =
        orderType === types.alphabetic ? alphabeticData : allNumericData;

    shown =
      orderDirection === types.ascending
        ? chosenData.slice(0, quantity)
        : chosenData.slice(-quantity).reverse();
    return shown;
  }
);
