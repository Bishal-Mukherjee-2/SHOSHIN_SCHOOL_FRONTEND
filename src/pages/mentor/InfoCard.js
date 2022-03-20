import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    boxSizing: 'border-box',
    borderRadius: '8px',
    padding: '26px 32px 26px 32px',
    display: 'flex',
    width: '356px',
    justifyContent: 'space-between'
  },
  data: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '33px',
    color: '#19686B',
    marginBottom: '10px'
  },
  heading: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '22px',
    color: 'black',
    marginTop: '10px'
  }
}));

export default function InfoCard({ icon, total, value, heading }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <div className={classes.data}>
          {value}/{total}
        </div>
        <div className={classes.heading}>{heading}</div>
      </div>
      <div>
        <div>
          <img src={icon}></img>
        </div>
      </div>
    </div>
  );
}
