import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { types } from '../helper/stringTypes';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
  },
}));

interface OrderTypeInputProps {
  changeOrderType: (event: any) => void;
  orderTypeValue: string;
}
const OrderTypeInput = ({
  orderTypeValue,
  changeOrderType,
}: OrderTypeInputProps) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
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
    </FormControl>
  );
};
export default OrderTypeInput;
