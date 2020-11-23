import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { types } from '../helper/stringTypes';
import { styles } from '../styles/styles';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
  },
}));

interface InputProps {
  changeOrderType: (event: any) => void;
  orderTypeValue: string;
}
const OrderTypeInput = ({ orderTypeValue, changeOrderType }: InputProps) => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'center',
        position: 'fixed',
        height: '10vh',
      }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Change Order Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
export default OrderTypeInput;
