import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
  },
}));

interface QuantityInputProps {
  quantityValue: number;
  handleQuantity: (event: any) => void;
}

const QuantityInput = ({
  quantityValue,
  handleQuantity,
}: QuantityInputProps) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
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
    </FormControl>
  );
};
export default QuantityInput;
