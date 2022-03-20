import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Box, Checkbox, CardHeader, Typography, FormControlLabel, Stack } from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import './index.css';

const CustomCardContent = withStyles({
  root: {
    '& MuiCardContent-root:last-child': {
      paddingBottom: '0'
    }
  }
})(Card);

const useStyles = makeStyles({
  root: {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
    borderRadius: '12px',
    padding: 0,
    margin: '15px',
    width: '440px'
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CustomCardContent>
        <CardHeader sx={{ pl: 4 }} title="C++ with Datastructures" />
        <div className="upper">
          <div className="upperInner">
            {/* <div className="upperdesc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero in venenatis tortor
              ultrices lectus urna, risus morbi. Urna molestie nulla ac at suspendisse adipiscing.
            </div> */}
            <Typography variant="body2" sx={{ pt: 3, flexShrink: 0, color: 'text.secondary' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero in venenatis tortor
              ultrices lectus urna, risus morbi. Urna molestie nulla ac at suspendisse adipiscing.
            </Typography>
          </div>
        </div>
        <div className="lower">
          <div className="lowerInner">
            <div className="lowerDetails">
              <div className="firstDetail">
                <div className="sideIcon">
                  <BorderColorIcon style={{ fontSize: 15, color: 'white' }} />
                </div>
                <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'white' }}>
                  Beginner
                </Typography>
              </div>
              <div className="secondDetail">
                <div className="sideIcon">
                  <AccessTimeIcon style={{ fontSize: 15, color: 'white' }} />
                </div>
                <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'white' }}>
                  4 months
                </Typography>
              </div>
            </div>
            <div className="lowerButton">
              <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'white' }}>
                View Details
              </Typography>
              <div className="viewArrow">
                <ArrowForwardIcon style={{ fontSize: 20, color: 'white', alignSelf: 'center' }} />
              </div>
            </div>
          </div>
        </div>
      </CustomCardContent>
    </Card>
  );
}
