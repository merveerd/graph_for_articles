import {
  DATA_LOADING_START,
  NUMERIC_DATA_LOADING_SUCCESS,
  ALPHABETIC_DATA_LOADING_SUCCESS,
  SHOWN_DATA_LOADING_SUCCESS,
  dataActionsTypes,
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

  articles.forEach((item) => {
    item.tokens.forEach((token) => {
      if (!anagram[token.value]) {
        anagram[token.value] = [];
      }
      anagram[token.value][item.PY - minPY] =
        anagram[token.value][item.PY - minPY] + 1 || 1;
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

export const getAlphabeticData = (data: Array<subArticle>) => {
  //props.allNumericData if it is there otherwise
  return {
    type: ALPHABETIC_DATA_LOADING_SUCCESS,
    payload: MergeSort(data, types.alphabetic),
  };
};

export const getShownData = (
  data: Array<subArticle>,
  orderDirection: string,
  quantity: number
) => {
  let shown =
    orderDirection === types.ascending
      ? data.slice(0, quantity)
      : data.slice(-quantity).reverse(); //as the shown data sample is max 100, didnt concerned about the runtime complexity

  return { type: SHOWN_DATA_LOADING_SUCCESS, payload: shown };
};
