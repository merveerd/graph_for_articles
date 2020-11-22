import {subArticle} from '../models/models'
export const DATA_LOADING_START = "data_loading_start";
export const NUMERIC_DATA_LOADING_SUCCESS = "data_loading_success";

interface startedLoadingAction {
    type: typeof DATA_LOADING_START;
    payload:  null | undefined;
  }

  interface succeedLoadingAction {
    type: typeof NUMERIC_DATA_LOADING_SUCCESS;
    payload:  Array<subArticle>;
  }
 

  export type dataActionsTypes = startedLoadingAction | succeedLoadingAction;