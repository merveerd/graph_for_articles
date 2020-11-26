import React from 'react';
import { StyledFormControl } from '../styles/styles';
import { InputLabel, MenuItem, Select } from '../helper/materialUIExporter';
import { types } from '../helper/stringTypes';

interface OrderTypeInputProps {
  changeOrderType: (event: any) => void;
  orderTypeValue: string;
}
const OrderTypeInput = ({
  orderTypeValue,
  changeOrderType,
}: OrderTypeInputProps) => {
  return (
    <StyledFormControl>
      <InputLabel id="order-type-label">Order Type</InputLabel>
      <Select
        labelId="order-type-label"
        value={orderTypeValue}
        onChange={changeOrderType}
      >
        <MenuItem value={types.numeric} data-testid="order-type-numeric">
          Numeric
        </MenuItem>
        <MenuItem value={types.alphabetic} data-testid="order-type-alphabetic">
          Alphabetic
        </MenuItem>
      </Select>
    </StyledFormControl>
  );
};
export default OrderTypeInput;
