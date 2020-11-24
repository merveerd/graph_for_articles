import { subArticle } from '../models/models';
export const DATA_LOADING_START = 'data_loading_start';
export const NUMERIC_DATA_LOADING_SUCCESS = 'numeric_data_loading_success';
export const ALPHABETIC_DATA_LOADING_SUCCESS =
  'alphabetic_data_loading_success';
export const SHOWN_DATA_LOADING = 'shown_data_loading';
export const QUANTITY_CHANGE = 'quantity_change';
export const ORDER_TYPE_CHANGE = 'order_type_change';
export const ORDER_DIRECTION_CHANGE = 'order_direction_change';

interface startedLoadingAction {
  type: typeof DATA_LOADING_START;
  payload: null | undefined;
}

interface succeedLoadingAction {
  type: typeof NUMERIC_DATA_LOADING_SUCCESS;
  payload: Array<subArticle>;
}

export type dataActionsTypes = startedLoadingAction | succeedLoadingAction;
