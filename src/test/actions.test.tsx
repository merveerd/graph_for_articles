import {
  getNumericData,
  setProcessedData,
  setQuantity,
  setOrderType,
  setOrderDirection,
} from '../actions/dataActions';
import {
  NUMERIC_DATA_LOADING_SUCCESS,
  QUANTITY_CHANGE,
  ORDER_TYPE_CHANGE,
  ORDER_DIRECTION_CHANGE,
} from '../actions/stateTypes';

import { MergeSort } from '../helper/sorting';
import { types } from '../helper/stringTypes';

describe('DataActions', () => {
  it('creates numeric sorted data', () => {
    const numericData = getNumericData();
    expect(numericData).toEqual({
      type: NUMERIC_DATA_LOADING_SUCCESS,
      payload: MergeSort(setProcessedData(), types.numeric),
    });
  });

  it('sets quantity for bar graph', () => {
    const quantity = setQuantity(50);
    expect(quantity).toEqual({ type: QUANTITY_CHANGE, payload: 50 });
  });

  it('sets orderDirection for bar graph', () => {
    const orderDirection = setOrderDirection(types.ascending);
    expect(orderDirection).toEqual({
      type: ORDER_DIRECTION_CHANGE,
      payload: types.ascending,
    });
  });

  it('sets quantity for bar graph', () => {
    const orderType = setOrderType(types.numeric);
    expect(orderType).toEqual({
      type: ORDER_TYPE_CHANGE,
      payload: types.numeric,
    });
  });
});
