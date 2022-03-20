import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import LockIcon from '@material-ui/icons/Lock';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import style from './styles.module.css';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    // height: 10,
    // borderRadius: 5,
  },
  colorPrimary: {
    // backgroundColor: '#FA983F',
    background: 'rgba(250, 152, 64, 0.4)'
  },
  bar: {
    // borderRadius: 5,
    backgroundColor: '#FA983F'
  }
}))(LinearProgress);

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

    padding: 0,
    // width: '440px',
    borderRadius: '12px 12px 0px 0px',
    width: '305px',

    '& .MuiPaper-rounded': {
      borderRadius: 0
    }
  },
  main: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CustomCardContent className={classes.main}>
        <div className={style.leftOuter}>
          <div className={style.leftContainer}>
            <div className={style.ModuleHeading}>Flow Chart</div>
            <div className={style.deadline}>
              <div className={style.deadlineHeading}>Dealine 07-03-2021</div>
              <div className={style.deadlineIcon}>
                <LockIcon style={{ fontSize: 14, color: '#FF0000' }} />
              </div>
            </div>
          </div>
          <div className={style.progress}>
            <Tooltip TransitionComponent={Zoom} title="progress 50%" placement="top" arrow>
              <BorderLinearProgress variant="determinate" value={50} />
            </Tooltip>
          </div>
        </div>

        <div className={style.rightContainer}>
          <div className={style.ModuleClass}>Class 1</div>
          <div className={style.ModuleIcon}>
            <AccountTreeOutlinedIcon style={{ fontSize: 25, color: 'white' }} />
          </div>
        </div>
      </CustomCardContent>
    </Card>
  );
}
