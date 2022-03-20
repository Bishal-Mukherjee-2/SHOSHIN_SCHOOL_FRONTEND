import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  withStyles,
  makeStyles
  // createMuiTheme,
} from '@material-ui/styles';
import { Box, Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Slide from '@material-ui/core/Slide';
import WarningIcon from '@material-ui/icons/Warning';
import classesCPY from './QuestionDark.module.css';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useDarkStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white'
  },
  multilineColor: {
    color: 'white'
  },
  dialog: {
    width: '2000px'
  },
  titleIcon: {
    marginLeft: '250px',
    color: '#E78B00'
  },
  titleLine: {
    // marginLeft: "90px",
    textAlign: 'center'
  },
  firstDialogTitle: {
    backgroundColor: '#161C22',
    color: '#CACEC2'
  },
  background: {
    backgroundColor: '#161C22'
  },
  dialogcontent: {
    color: '#8c9397'
  },
  highlight100: {
    color: '#E78B00'
  },
  highlight: {
    color: '#b2b2b2'
  },
  lightButton: {
    color: '#C8D2D9',
    textTransform: 'none'
  },
  darkButton: {
    color: 'white',
    textTransform: 'none',
    backgroundColor: '#44494e'
  },
  secondDialogTitle: {
    backgroundColor: '#0F1318',
    color: '#C8D2D9'
  },
  CancelIcon: {
    color: 'grey',
    float: 'right'
  },
  background1: {
    backgroundColor: '#0F1318'
  },
  disable: {
    color: 'yellow',
    textTransform: 'none'
  },
  noDisable: {
    color: '#C8D2D9',
    textTransform: 'none'
  }
}));

const useLightStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white'
  },
  multilineColor: {
    color: 'white'
  },
  dialog: {
    width: '2000px'
  },
  titleIcon: {
    marginLeft: '250px',

    color: '#E78B00'
  },
  titleLine: {
    textAlign: 'center'
  },
  firstDialogTitle: {
    backgroundColor: 'white',
    color: 'black'
  },
  background: {
    backgroundColor: 'white'
  },
  dialogcontent: {
    color: 'rgba(0, 0, 0, 0.6)'
  },
  highlight100: {
    color: '#E78B00'
  },
  highlight: {
    color: 'black'
  },
  lightButton: {
    color: '#4F566B',
    textTransform: 'none'
  },
  darkButton: {
    color: 'white',
    textTransform: 'none',
    backgroundColor: '#19686B'
  },
  secondDialogTitle: {
    backgroundColor: 'white',
    color: 'black'
  },
  CancelIcon: {
    color: '#19686B',
    float: 'right'
  },
  background1: {
    backgroundColor: 'white'
  },
  disable: {
    color: 'rgba(0, 0, 0, 0.6)',
    textTransform: 'none'
  },
  noDisable: {
    color: 'rgba(0, 0, 0, 0.6)',
    textTransform: 'none'
  }
}));

export default function Solution(props) {
  const { dark } = props;

  const darkStyle = useDarkStyles();
  const lightStyle = useLightStyles();

  const classes = dark ? darkStyle : lightStyle;

  const value =
    '#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int r, c, a[100][100], b[100][100], sum[100][100], i, j;\n\n    cout << "Enter number of rows (between 1 and 100): ";\n    cin >> r;\n\n    cout << "Enter number of columns (between 1 and 100): ";\n    cin >> c;\n\n    cout << endl << "Enter elements of 1st matrix: " << endl;\n\n    // Storing elements of first matrix entered by user.\n    for(i = 0; i < r; ++i)\n       for(j = 0; j < c; ++j)\n       {\n           cout << "Enter element a" << i + 1 << j + 1 << " : ";\n           cin >> a[i][j];\n       }\n\n    // Storing elements of second matrix entered by user.\n    cout << endl << "Enter elements of 2nd matrix: " << endl;\n    for(i = 0; i < r; ++i)\n       for(j = 0; j < c; ++j)\n       {\n           cout << "Enter element b" << i + 1 << j + 1 << " : ";\n           cin >> b[i][j];\n       }\n\n    // Adding Two matrices\n    for(i = 0; i < r; ++i)\n        for(j = 0; j < c; ++j)\n            sum[i][j] = a[i][j] + b[i][j];\n\n    // Displaying the resultant sum matrix.\n    cout << endl << "Sum of two matrix is: " << endl;\n    for(i = 0; i < r; ++i)\n        for(j = 0; j < c; ++j)\n        {\n            cout << sum[i][j] << "  ";\n            if(j == c - 1)\n                cout << endl;\n        }\n\n    return 0;\n}';

  const [open, setOpen] = React.useState(false);
  const [solOpen, setSolOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSolOpen = () => {
    // setOpen(false);
    setSolOpen(true);
    setOpen(false);
  };

  const handleSolClose = () => {
    setSolOpen(false);
  };

  // console.log(solOpen);

  return (
    <div>
      <Button
        data-hover="View Solution"
        onClick={handleClickOpen}
        disabled={props.hint === true ? 'disabled' : ''}
        // style={{color:(props.hint===true) ? ('#99A4A9') :('#C8D2D9'),textTransform:'none'}}
        className={props.hint === true ? classes.disable : classes.noDisable}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Solution
        </Typography>
        <SearchIcon fontSize="small" style={{ marginLeft: '0.3rem', color: 'text.secondary' }} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle className={classes.firstDialogTitle} id="alert-dialog-slide-title">
          <p>
            <WarningIcon fontSize="large" className={classes.titleIcon} />
          </p>
          <p className={classes.titleLine}>Viewing Solution carries penalty</p>
        </DialogTitle>
        {/* <DialogTitle style= {{backgroundColor: '#161C22', color: '#CACEC2'}} id="alert-dialog-slide-title">
                    <div className={classes.titleLine}>
                    {"Viewing Solution carries penalty"}
                    </div>
                    
                    
                </DialogTitle> */}

        <DialogContent className={classes.background}>
          <DialogContentText className={classes.dialogcontent} id="alert-dialog-slide-description">
            <p justify="center">
              There is a{' '}
              <b>
                <span className={classes.highlight100}>100%</span>
              </b>{' '}
              penalty on this problem if you see the solution.
            </p>
            <p>
              Once you see the soluion, your score{' '}
              <b className={classes.highlight}>will not be counted</b> on subsequent submissions.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.background}>
          <Button onClick={handleClickSolOpen} className={classes.lightButton}>
            View Solution
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            variant="contained"
            className={classes.darkButton}
          >
            Keep Trying
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={solOpen}
        onClose={handleSolClose}
        maxWidth="1500px"
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="form-dialog-slide-title" className={classes.secondDialogTitle}>
          Solution Code
          <IconButton
            size="small"
            aria-label="delete"
            onClick={handleSolClose}
            className={classes.CancelIcon}
          >
            <CancelIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className={classes.background1}>
          {/* <DialogContentText style={{color:'#757575'}}>
                        Marks will be deducted.
                        Click confirm to see the solution. 
                    </DialogContentText> */}
          <CodeMirror
            className={classesCPY.copy}
            value={value}
            options={{
              // mode: 'xml',
              theme: 'custom-0',
              lineNumbers: true,
              readOnly: 'nocursor',
              configureMouse: { moveOnDrag: true }
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
