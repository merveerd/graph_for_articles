import * as React from 'react';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { within } from '@testing-library/dom';
import { UnconnectedBarChart } from '../components/BarChart';
import { types } from '../helper/stringTypes';

describe('Component: UnconnectedBarChart', () => {
  const BarChartProps = {
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

  it('should handle quantity changes', async () => {
    const root = document.createElement('div');

    ReactDOM.render(<UnconnectedBarChart {...BarChartProps} />, root);
    const { getByLabelText } = within(root);
    fireEvent.mouseDown(getByLabelText('Quantity'));

    fireEvent.click(screen.getByText('50')); //test case when it is called with same number
    expect(BarChartProps.setQuantity).toHaveBeenCalledTimes(0);

    fireEvent.mouseDown(getByLabelText('Quantity'));

    fireEvent.click(screen.getByText('10'));
    expect(BarChartProps.setQuantity).toHaveBeenCalledTimes(1);
  });
});
