import {
    DATA_LOADING_START,
    NUMERIC_DATA_LOADING_SUCCESS,
    dataActionsTypes
  } from "./stateTypes";
  import { IRootState } from '../reducers'
  import {subArticle, anagramData} from '../models/models'
  import {ThunkDispatch } from 'redux-thunk'
  import { AnyAction } from 'redux';
  import { articles } from "../articles";
  import {MergeSort} from '../helper/sorting'

const types = {
    ascending : 'Ascending',
    descending :'Descending',
    numeric: 'numeric',
    alphabetic: 'alphabetic'
  }
  
  export const getNumericData = () => {
    return (dispatch: ThunkDispatch<IRootState, void, AnyAction>) => {
      dispatch({type: DATA_LOADING_START});
      console.log('basladi')
      let anagram: anagramData = {};
      let minPY: number = 90000000000;
  
      articles.forEach(item => {
        if (item.PY < minPY) {
          minPY = item.PY;
        }
      })
  
      articles.forEach(item => {
        item.tokens.forEach(token => {
          if (!(anagram[token.value])) {
            anagram[token.value] = [];
          }
          anagram[token.value][item.PY - minPY] = anagram[token.value][item.PY - minPY] + 1 || 1
        })
      });
  
      let newArray: Array<subArticle> = [];
  
      //setting the frequency and array from the object
      let freq: number = 0;
      for (var key in anagram) {
        freq = anagram[key].reduce((year1, year2) => {
          return (year1 + year2)
        }, 0);
        newArray.push({ 'name': key, 'frequency': freq, '2009': anagram[key][0] || 0, '2010': anagram[key][1] || 0, '2011': anagram[key][2] || 0, '2012': anagram[key][3] || 0, '2013': anagram[key][4] || 0, '2014': anagram[key][5] || 0 })
      }
      newArray = MergeSort(newArray, types.numeric);
  
      dispatch({type: NUMERIC_DATA_LOADING_SUCCESS, payload: newArray});
    };
  };
  

  export const getAlphabeticData = () => {
    return (dispatch: ThunkDispatch<IRootState, {}, AnyAction>) => {
      dispatch({type: DATA_LOADING_START});
 
    };
  };

  export const getShownData = (data: Array<subArticle>) => {
    return (dispatch: ThunkDispatch<IRootState, {}, AnyAction>) => {
      dispatch({type: DATA_LOADING_START});
     
    };
  }