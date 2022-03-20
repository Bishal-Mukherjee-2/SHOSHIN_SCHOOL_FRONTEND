import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
  },
  bottom: {
    // color: "rgba(255, 255, 255, 0.7)",
    // BorderColor: "grey",
    color: '#F3E9F5'
  },
  top: {
    color: '#19686B',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0
  },
  circle: {
    strokeLinecap: 'round'
  },
  txt: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '20px'
  }
}));

export default function MyCircularProgress(props) {
  const [progress, setProgress] = React.useState(10);
  const classes = useStyles();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={100}
          thickness={5}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle
          }}
          size={100}
          thickness={5}
          value={progress}
          {...props}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textSecondary"
            className={classes.txt}
          >{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    </div>
  );
}
