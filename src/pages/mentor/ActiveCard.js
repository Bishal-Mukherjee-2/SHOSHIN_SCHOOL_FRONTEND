import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '230px',
    height: '179px',
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.24)',
    boxSizing: 'border-box',
    borderRadius: '8px'
  }
});

export default function ActiveCard() {
  const classes = useStyles();
  return <div className={classes.root}></div>;
}
