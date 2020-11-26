import {
  NUMERIC_DATA_LOADING_SUCCESS,
  QUANTITY_CHANGE,
  ORDER_TYPE_CHANGE,
  ORDER_DIRECTION_CHANGE,
} from './actionTypes';

import { MergeSort } from '../helper/sorting';
import { types } from '../helper/stringTypes';
import { setProcessedData } from '../helper/setProcessedData';

export const getNumericData = () => {
  setProcessedData();
  return {
    type: NUMERIC_DATA_LOADING_SUCCESS,
    payload: MergeSort(setProcessedData(), types.numeric),
  };
};

export const setQuantity = (quantity: number) => {
  return {
    type: QUANTITY_CHANGE,
    payload: quantity,
  };
};

export const setOrderType = (orderType: string) => {
  return {
    type: ORDER_TYPE_CHANGE,
    payload: orderType,
  };
};

export const setOrderDirection = (orderDirection: string) => {
  return {
    type: ORDER_DIRECTION_CHANGE,
    payload: orderDirection,
  };
};
