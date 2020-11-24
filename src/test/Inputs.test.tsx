import * as React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import Inputs from '../components/Inputs';
describe('Component: Inputs', () => {
  const props = {
    label: 'submit',
    handleQuantity: jest.fn(),
    changeOrderType: jest.fn(),
    changeOrderDirection: jest.fn(),
    quantityValue: 50,
    order: 'Ascending',
    orderTypeValue: 'numeric',
  };

  it('should handle quantity changes', () => {
    const { getByTestId, getAllByTestId } = render(<Inputs {...props} />);
    fireEvent.mouseDown(getByTestId('quantity-select'));
    const quantity = within(getByTestId('quantity-select'));

    fireEvent.click(quantity.getByDisplayValue(50));

    expect(props.handleQuantity).toHaveBeenCalled;
  });
});
