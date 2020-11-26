import { subArticle } from '../models/models';

export const NUMERIC_DATA_LOADING_SUCCESS = 'numeric_data_loading_success';
export const QUANTITY_CHANGE = 'quantity_change';
export const ORDER_TYPE_CHANGE = 'order_type_change';
export const ORDER_DIRECTION_CHANGE = 'order_direction_change';

interface succeedLoadingAction {
  type: typeof NUMERIC_DATA_LOADING_SUCCESS;
  payload: Array<subArticle>;
}

export type dataActionsTypes = succeedLoadingAction;
