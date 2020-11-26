import {
  NUMERIC_DATA_LOADING_SUCCESS,
  QUANTITY_CHANGE,
  ORDER_TYPE_CHANGE,
  ORDER_DIRECTION_CHANGE,
} from './stateTypes';
import { subArticle, anagramData } from '../models/models';
import { articles } from '../articles';
import { MergeSort } from '../helper/sorting';
import { types } from '../helper/stringTypes';

export const setProcessedData = () => {
  let anagram: anagramData = {};
  let minPY: number = 90000000000;

  articles.forEach((item) => {
    if (item.PY < minPY) {
      minPY = item.PY;
    }
  });
  let stringValue;
  articles.forEach((item) => {
    item.tokens.forEach((token) => {
      stringValue = token.value.replace(/[\u200B-\u200D\uFEFF]/g, ''); //can be increased the ccontrol
      if (!anagram[stringValue]) {
        anagram[stringValue] = [];
      }
      anagram[stringValue][item.PY - minPY] =
        anagram[stringValue][item.PY - minPY] + 1 || 1;
    });
  });

  let processedArray: Array<subArticle> = [];

  //setting the frequency and array from the object
  let freq: number = 0;
  for (var key in anagram) {
    freq = anagram[key].reduce((year1, year2) => {
      return year1 + year2;
    }, 0);

    processedArray.push({
      name: key,
      frequency: freq,
      '2009': anagram[key][0] || 0,
      '2010': anagram[key][1] || 0,
      '2011': anagram[key][2] || 0,
      '2012': anagram[key][3] || 0,
      '2013': anagram[key][4] || 0,
      '2014': anagram[key][5] || 0,
    });
  }
  return processedArray;
};

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
