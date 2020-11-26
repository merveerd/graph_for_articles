import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { types } from '../helper/stringTypes';
import { styles } from '../styles/styles';
//can be seperated these two inputs
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
  },
}));

interface InputProps {
  quantityValue: number;
  handleQuantity: (event: any) => void;
  changeOrderDirection: (event: any) => void;
  order: string;
  changeOrderType: (event: any) => void;
  orderTypeValue: string;
}
const Inputs = ({
  quantityValue,
  handleQuantity,
  changeOrderDirection,
  order,
  changeOrderType,
  orderTypeValue,
}: InputProps) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="quantity-label">Quantity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          data-testid="quantity-select"
          value={quantityValue}
          onChange={handleQuantity}
        >
          <MenuItem data-testid="quantity-option" key="1" value={10}>
            10
          </MenuItem>
          <MenuItem data-testid="quantity-option" key="2" value={50}>
            50
          </MenuItem>
          <MenuItem data-testid="quantity-option" key="3" value={100}>
            100
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="order-by-label">Order By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="order-by-select"
          value={order}
          onChange={changeOrderDirection}
        >
          <MenuItem value={types.ascending}>Ascending</MenuItem>
          <MenuItem value={types.descending}>Descending</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="order-type-label">Order Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="order-type-select"
          value={orderTypeValue}
          onChange={changeOrderType}
        >
          <MenuItem value={types.numeric}>Numeric</MenuItem>
          <MenuItem value={types.alphabetic}>Alphabetic</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default Inputs;
