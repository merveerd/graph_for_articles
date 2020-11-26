import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BarChart from '../components/BarChart';

import reducer from '../reducers';

describe('Component: BarChart', () => {
  const store = createStore(reducer, {});
  const { getByTestId, getByLabelText } = render(
    <Provider store={store}>
      <BarChart />
    </Provider>
  );

  it('should render the right quantity', async () => {
    fireEvent.mouseDown(getByLabelText('Quantity'));
    fireEvent.click(screen.getByTestId('quantity-option-10'));
    expect(getByTestId('graph_svg').getAttribute('width')).toEqual('600');
    expect(
      getByTestId('graph_svg').children[0].children[0].children.length
    ).toEqual(10);

    fireEvent.click(screen.getByTestId('quantity-option-50'));
    expect(getByTestId('graph_svg').getAttribute('width')).toEqual('1800');
    expect(
      getByTestId('graph_svg').children[0].children[0].children.length
    ).toEqual(50);

    fireEvent.click(screen.getByTestId('quantity-option-100'));
    expect(getByTestId('graph_svg').getAttribute('width')).toEqual('3600');
    expect(
      getByTestId('graph_svg').children[0].children[0].children.length
    ).toEqual(100);
  });

  // it('should render the right order', async () => {
  //   fireEvent.mouseDown(getByLabelText('Order Type'));
  //   fireEvent.click(screen.getByTestId('order-type-alphabetic'));

  //   fireEvent.mouseDown(getByLabelText('Order By'));
  //   fireEvent.click(screen.getByTestId('order-by-descending'));
  //   expect(
  //     getByTestId('graph_svg').children[0].children[1].children[1].children[1]
  //       .textContent
  //   ).toEqual('zro2');
  // });
});
