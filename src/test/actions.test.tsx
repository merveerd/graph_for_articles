import * as actions from '../actions/dataActions';
import { types } from '../helper/stringTypes';
import { subArticle } from '../models/models';
import {
  NUMERIC_DATA_LOADING_SUCCESS,
  ALPHABETIC_DATA_LOADING_SUCCESS,
  SHOWN_DATA_LOADING,
} from '../actions/stateTypes';

import { render, fireEvent, within } from '@testing-library/react';
describe('actions', () => {
  it('should create an action to get data shown on the graph', () => {
    const data = [
      {
        '2009': 21,
        '2010': 39,
        '2011': 58,
        '2012': 55,
        '2013': 112,
        '2014': 54,
        name: 'ion',
        frequency: 339,
      },
      {
        '2009': 38,
        '2010': 38,
        '2011': 64,
        '2012': 86,
        '2013': 67,
        '2014': 60,
        name: 'carbon',
        frequency: 353,
      },

      {
        '2009': 13,
        '2010': 27,
        '2011': 43,
        '2012': 87,
        '2013': 90,
        '2014': 68,
        name: 'rate',
        frequency: 328,
      },
    ];
    const orderDirection = 'Ascending';
    // const shown =  orderDirection === types.ascending
    // ? data.slice(0, 10)
    // : data.slice(-10).reverse();

    // const expectedAction = {
    //   type: SHOWN_DATA_LOADING_SUCCESS,
    //   payload:shown
    // }
    //expect(actions.getShownData(data: subArticle[], orderDirection: string, quantity: number)).toEqual(expectedAction)
  });
});
