import * as React from 'react';
import { screen, fireEvent, cleanup } from '@testing-library/react';
const ReactDOM = require('react-dom');
import { within } from '@testing-library/dom';
import { UnconnectedBarChart } from '../components/BarChart';
import { types } from '../helper/stringTypes';

describe('Component: UnconnectedBarChart', () => {
  const props = {
    allNumericData: [],
    allAlphabeticData: [],
    shownData: [],
    orderType: types.numeric,
    orderDirection: types.ascending,
    quantity: 50,
    getNumericData: jest.fn(),
    setQuantity: jest.fn(),
    setOrderType: jest.fn(),
    setOrderDirection: jest.fn(),
  };

  it('should handle quantity changes', () => {
    const root = document.createElement('div');

    ReactDOM.render(<UnconnectedBarChart {...props} />, root);
    const { getByLabelText } = within(root);
    fireEvent.mouseDown(getByLabelText('Quantity'));

    fireEvent.click(screen.getByText('50')); //test case when it is called with same number
    expect(props.setQuantity).toHaveBeenCalledTimes(0);

    fireEvent.mouseDown(getByLabelText('Quantity'));

    fireEvent.click(screen.getByText('10'));
    expect(props.setQuantity).toHaveBeenCalledTimes(1);
  });
});
