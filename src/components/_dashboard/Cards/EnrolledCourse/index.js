import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Box, Checkbox, CardHeader, Typography, FormControlLabel, Stack } from '@material-ui/core';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import MyCircularProgress from './MyCircularProgress';
// utils
import { fNumber } from '../../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../charts';

import './enrolled.css';

const CustomCardContent = withStyles({
  root: {
    '& MuiCardContent-root:last-child': {
      paddingBottom: '0'
    }
  }
})(Card);

const useStyles = makeStyles((theme) => ({
  paper: {
    // clipPath: 'polygon(69% 0, 100% 0, 100% 100%, 31% 100%)',
    // background: 'linear-gradient(90deg, #00C996 0%, #003D4D 100%)',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
    borderRadius: '12px',

    // padding: 10,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    width: '140%'
    // clipPath: 'polygon(88% 0, 100% 0, 100% 100%, 70% 100%)',
    // background: 'linear-gradient(229.57deg, #9796F0 -11.47%, #FBC7D4 76.84%)',
  },
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: '100',
    padding: '0',
    paddingBottom: '0'
  }
}));

export default function SimplePaper() {
  const classes = useStyles();
  const theme = useTheme();
  const CHART_DATA = [34, 66];

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: ['Completed', 'Left'],
    // stroke: { colors: [theme.palette.background.paper] },
    // legend: { floating: true, horizontalAlign: 'center' },
    // dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => `${fNumber(seriesName)}%`,
        title: {
          formatter: (seriesName) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <div className={classes.root}>
      <Card className={classes.paper}>
        <CustomCardContent className={classes.main}>
          <div className="headingStripWidth content">
            <div className="headingStrip ">
              <CardHeader title="C++ with Datastructures" />

              <div className="headingStrip">
                <div className="headingStrip pad-R-1">
                  <div className="sideIcon">
                    <BorderColorIcon style={{ fontSize: 15 }} />
                  </div>
                  <Typography
                    variant="caption"
                    sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
                  >
                    Beginner
                  </Typography>
                  {/* <div className="sideDetail black">Beginner</div> */}
                </div>
                <div className="headingStrip">
                  <div className="sideIcon">
                    <AccessTimeIcon style={{ fontSize: 15 }} />
                  </div>
                  <Typography
                    variant="caption"
                    sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
                  >
                    4 months
                  </Typography>
                </div>
              </div>
            </div>

            <Typography
              variant="body2"
              sx={{ pl: 3, pt: 3, flexShrink: 0, color: 'text.secondary' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero in venenatis tortor
              ultrices lectus urna, risus morbi. Urna molestie nulla ac at suspendisse adipiscing.
            </Typography>

            {/* <div className=" desc mar-t-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero in venenatis tortor
              ultrices lectus urna, risus morbi. Urna molestie nulla ac at suspendisse adipiscing.
            </div> */}
            <div className="mar-t-1">
              <button className="btn dark">Enter Clasroom</button>
            </div>
          </div>
          <div className="progress">
            {/* <MyCircularProgress /> */}
            <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={170} />
          </div>
        </CustomCardContent>
      </Card>
    </div>
  );
}
