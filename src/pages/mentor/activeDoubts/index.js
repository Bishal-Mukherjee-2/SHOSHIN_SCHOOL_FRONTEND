import React, { Component } from 'react';
import Carousel from './Carousel';
import { makeStyles, withStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '25px',
    marginBottom: '4rem',
    marginTop: '5rem'
  },
  card: {
    marginLeft: '2.5rem'
  }
}));

export default function ActiveDoubts() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.heading}>Active Doubts</div>
      <Carousel />
    </div>
  );
}
