import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/styles';
import EnrolledCard from '../Cards/EnrolledCourse/index';
import Carousel from './Carousel/index';
import { AppOrderTimeline } from '../app';

const drawerWidth = '540px';

// const CustomDrawer = withStyles({

//   root: {
//     "& MuiDrawer-paperAnchorDockedLeft" : {
//   +    borderRight: 'none',
//     },
//   },

// })(Drawer);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    borderRight: 'no-border'
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none'
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    paddingTop: '7rem',
    paddingLeft: '2rem',
    backgroundColor: 'white',
    height: '100vh'
  },

  enroll: {
    marginBottom: '4rem'
  },
  all: {},
  heading: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#747474',
    marginBottom: '2rem'
  },
  card: {
    marginLeft: '2.5rem'
  }
}));

export default function App() {
  const classes = useStyles();
  return (
    // <div className={classes.root}>
    //   <CssBaseline />
    //   <AppBar position="fixed" className={classes.appBar}>
    //     <Toolbar>
    //       <Typography variant="h6" noWrap>
    //         Clipped drawer
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>
    //   <Drawer
    //     className={classes.drawer}
    //     variant="permanent"
    //     classes={{
    //       paper: classes.drawerPaper,
    //     }}
    //   >

    //   </Drawer>
    // <main className={classes.content}>
    <div>
      <div className={classes.enroll}>
        {/* <div className={classes.heading}>Current Enrollments</div> */}
        <Typography variant="subtitle1" sx={{ pb: 3, flexShrink: 0, color: 'text.secondary' }}>
          Current Enrollments
        </Typography>
        <div className={classes.card}>
          <EnrolledCard />
        </div>
      </div>
      <div className={classes.all}>
        {/* <div className={classes.heading}>All Courses</div> */}
        <Typography variant="subtitle1" sx={{ pb: 3, flexShrink: 0, color: 'text.secondary' }}>
          All Courses
        </Typography>
        <Carousel />
      </div>
    </div>
    //   </main>
    // </div>
  );
}
