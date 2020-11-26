import { StyledFormControl } from '../styles/styles';
import React from 'react';
import { InputLabel, MenuItem, Select } from '../helper/materialUIExporter';
import { types } from '../helper/stringTypes';

interface OrderDirectionInputProps {
  changeOrderDirection: (event: any) => void;
  orderDirection: string;
}
const OrderDirectionInput = ({
  orderDirection,
  changeOrderDirection,
}: OrderDirectionInputProps) => {
  return (
    <StyledFormControl>
      <InputLabel id="order-by-label">Order By</InputLabel>
      <Select
        labelId="order-by-label"
        value={orderDirection}
        onChange={changeOrderDirection}
      >
        <MenuItem value={types.ascending} data-testid="order-by-ascending">
          Ascending
        </MenuItem>
        <MenuItem value={types.descending} data-testid="order-by-descending">
          Descending
        </MenuItem>
      </Select>
    </StyledFormControl>
  );
};
export default OrderDirectionInput;
