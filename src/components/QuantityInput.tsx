import React from 'react';
import { StyledFormControl } from '../styles/styles';
import { InputLabel, MenuItem, Select } from '../helper/materialUIExporter';

interface QuantityInputProps {
  quantityValue: number;
  handleQuantity: (event: any) => void;
}

const QuantityInput = ({
  quantityValue,
  handleQuantity,
}: QuantityInputProps) => {
  return (
    <StyledFormControl>
      <InputLabel id="quantity-label">Quantity</InputLabel>
      <Select
        labelId="quantity-label"
        value={quantityValue}
        onChange={handleQuantity}
      >
        <MenuItem data-testid="quantity-option-10" value={10}>
          10
        </MenuItem>
        <MenuItem data-testid="quantity-option-50" value={50}>
          50
        </MenuItem>
        <MenuItem data-testid="quantity-option-100" value={100}>
          100
        </MenuItem>
      </Select>
    </StyledFormControl>
  );
};
export default QuantityInput;
