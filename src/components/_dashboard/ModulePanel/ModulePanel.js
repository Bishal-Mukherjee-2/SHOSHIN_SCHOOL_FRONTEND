import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ModuleCard from './ModuleCardNew';

const useStyles = makeStyles({
  level: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '15px',
    color: '#747474',
    margin: '1% 1% 0% 0%'
  },
  module: {
    margin: '1% 4% 2% 1%'
  },
  part: {
    padding: '3%'
  }
});

export default function ModulePanel() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.level}>LEVEL 1</div>
      <Grid className={classes.part} container direction="row">
        <Grid item className={classes.module}>
          <ModuleCard />
        </Grid>
        <Grid item className={classes.module}>
          <ModuleCard />
        </Grid>
        <Grid item className={classes.module}>
          <ModuleCard />
        </Grid>
        <Grid item className={classes.module}>
          <ModuleCard />
        </Grid>
        <Grid item className={classes.module}>
          <ModuleCard />
        </Grid>
      </Grid>
      <div className={classes.level}>LEVEL 2</div>
      <Grid className={classes.part} container direction="row">
        <Grid item className={classes.module}>
          <ModuleCard />
        </Grid>
        <Grid item className={classes.module}>
          <ModuleCard />
        </Grid>
        <Grid item className={classes.module}>
          <ModuleCard />
        </Grid>
        <Grid item className={classes.module}>
          <ModuleCard />
        </Grid>
        <Grid item className={classes.module}>
          <ModuleCard />
        </Grid>
      </Grid>
    </div>
  );
}
