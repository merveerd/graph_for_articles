import * as React from 'react';
export const styles = {
  container: {
    display: 'grid',
    justifyItems: 'center',
    height: '520',
    marginTop: '10vh',
    marginLeft: '40px',
    border: '2px solid black',
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
    //  position: 'fixed',
    height: '10vh',
  } as React.CSSProperties,
};
