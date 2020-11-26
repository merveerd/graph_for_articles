import { ArticleData } from '../models/models';

export const NUMERIC_DATA_LOADING_SUCCESS = 'numeric_data_loading_success';
export const QUANTITY_CHANGE = 'quantity_change';
export const ORDER_TYPE_CHANGE = 'order_type_change';
export const ORDER_DIRECTION_CHANGE = 'order_direction_change';

interface succeedLoadingAction {
  type: typeof NUMERIC_DATA_LOADING_SUCCESS;
  payload: ArticleData;
}

interface quantityChange {
  type: typeof QUANTITY_CHANGE;
  payload: number;
}

interface orderTypeChange {
  type: typeof ORDER_TYPE_CHANGE;
  payload: string;
}

interface orderDirectionChange {
  type: typeof ORDER_DIRECTION_CHANGE;
  payload: string;
}

export type dataActionsTypes =
  | succeedLoadingAction
  | quantityChange
  | orderTypeChange
  | orderDirectionChange;
