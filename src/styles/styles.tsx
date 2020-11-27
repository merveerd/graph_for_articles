import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

export const StyledFormControl = withStyles({
  root: {
    marginRight: '10%',
    marginTop: '8%',
    marginBottom: '8%',
    minWidth: '50%',
  },
})(FormControl);

export const styles = {
  container: {
    display: 'grid',
    justifyItems: 'center',
    height: '520',
    marginTop: '10vh',
    marginLeft: '5%',
    border: '0.14em solid black',
    overflow: 'auto',
  } as React.CSSProperties,

  main: {
    width: '100%',
    height: '100vh',
    overflow: 'scroll',
  } as React.CSSProperties,

  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
    position: 'fixed',
    height: '10vh',
    marginLeft: '5%',
  } as React.CSSProperties,
};
