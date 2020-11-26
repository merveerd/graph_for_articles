import { getShown, getAlphabetic } from '../reducers/dataReducer';
import { types } from '../helper/stringTypes';
//SPREAD OPERATORLE parametre degistir digerlerini de test et
describe('selectors', () => {
  const state = {
    allNumericData: [
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
        '2009': 37,
        '2010': 66,
        '2011': 65,
        '2012': 116,
        '2013': 196,
        '2014': 109,
        name: 'high',
        frequency: 589,
      },
    ],
    quantity: 3,
    orderDirection: types.ascending,
    orderType: types.numeric,
  };

  const shownData = [
    {
      '2009': 37,
      '2010': 66,
      '2011': 65,
      '2012': 116,
      '2013': 196,
      '2014': 109,
      name: 'high',
      frequency: 589,
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
  ];

  const alphabeticAscending = [
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
      '2009': 37,
      '2010': 66,
      '2011': 65,
      '2012': 116,
      '2013': 196,
      '2014': 109,
      name: 'high',
      frequency: 589,
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

  describe('#getShownSelector', () => {
    it('should select the right data shown on the graph', () => {
      expect(
        getShown({ ...state, orderDirection: types.descending, quantity: 2 })
      ).toEqual(shownData);
    });
  });

  describe('#getAlphabeticDataSelector', () => {
    it('should bring the sorted data, alphabetically', () => {
      expect(getAlphabetic({ ...state, orderType: types.alphabetic })).toEqual(
        alphabeticAscending
      );
    });
  });
});
