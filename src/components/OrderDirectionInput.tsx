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

interface OrderDirectionInputProps {
  changeOrderDirection: (event: any) => void;
  orderDirection: string;
}
const OrderDirectionInput = ({
  orderDirection,
  changeOrderDirection,
}: OrderDirectionInputProps) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
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
    </FormControl>
  );
};
export default OrderDirectionInput;
