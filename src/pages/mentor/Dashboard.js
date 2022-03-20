import React from 'react';
import { makeStyles } from '@material-ui/styles';
import InfoCard from './InfoCard';
import dailyTarget from '../../images/dailyTarget.svg'; // upload to image
import doubtRejected from '../../images/doubtRejected.svg'; // upload to image
import projectEvaluated from '../../images/projectEvaluated.svg'; // upload to image
import SessionCard from './SessionCard';
import DoubtCard from './DoubtCard';
import ActiveDoubts from './activeDoubts/index';

import { Grid, Button, Stack, Typography } from '@material-ui/core';

import styles from './dashboard.module.css';
import { Container } from 'semantic-ui-react';

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'white'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: 'white'
    // height: '100px',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#19686B'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: theme.spacing(3)
  },
  topHeading: {
    textAlign: 'center',
    marginTop: '6%',
    color: 'white',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '28px',
    lineHeight: '34px'
  },
  listRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#19686B',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    color: 'white',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '25px'
  },
  nested: {
    paddingLeft: theme.spacing(9)
  },
  listBox: {
    padding: '32px'
  },
  expand: {
    marginRight: '40%'
  },
  listItem: {
    paddingTop: '18px',
    paddingBottom: '18px'
  }
}));

export const Dashboard = () => {
  const classes = useStyles();
  const taEmail = 'yashkhandelwalme@gmail.com';
  const taName = 'Vishakha Singh';
  const [open, setOpen] = React.useState(true);
  const [checkState, setCheckState] = React.useState({
    checkedG: false
  });
  console.log(checkState);

  const infoCardDetails = [
    { icon: dailyTarget, total: '11', value: '1', heading: 'Daily Target' },
    { icon: doubtRejected, total: '4', value: '0', heading: 'Doubt Rejected' },
    { icon: projectEvaluated, total: '11', value: '0', heading: 'Project Evaluated' }
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* <div className={styles.infoDiv}>
        {infoCardDetails.map((info) => (
          <div>
            <InfoCard
              icon={info.icon}
              total={info.total}
              value={info.value}
              heading={info.heading}
            />
          </div>
        ))}
      </div> */}
      <Grid container spacing={3} className={styles.infoDiv}>
        {infoCardDetails.map((info) => (
          <div>
            <InfoCard
              icon={info.icon}
              total={info.total}
              value={info.value}
              heading={info.heading}
            />
          </div>
        ))}
      </Grid>
      <div className={styles.cardDiv}>
        <div>
          <div>
            <SessionCard setCheckState={setCheckState} />
          </div>
          <div>
            <ActiveDoubts />
          </div>
        </div>
        <div>
          <div>
            <DoubtCard checkState={checkState} />
          </div>
        </div>
      </div>
    </div>
  );
};
