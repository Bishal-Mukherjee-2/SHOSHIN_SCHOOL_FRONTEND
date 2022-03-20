import React from 'react';
import { Button, Typography } from '@material-ui/core';
import {
  withStyles,
  makeStyles
  // createMuiTheme,
} from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CancelIcon from '@material-ui/icons/Cancel';

// import { green } from '@material-ui/core/colors';

const ValidationTextFieldDark = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white'
    },

    '& .MuiFormLabel-root': {
      color: '#CACEC2' // or black
    },

    '& .MuiInput-underline:after': {
      borderBottomColor: '#CACEC2'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#848D91',
        borderWidth: '2px'
      },
      '& label': {
        color: '#CACEC2'
      },
      '& input': {
        color: '#CACEC2'
      },
      '&:hover fieldset': {
        borderColor: '#848D91'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#848D91',
        borderWidth: '3px'
      }
    }
  }
})(TextField);

const ValidationTextFieldLight = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black'
    },

    '& .MuiFormLabel-root': {
      color: '#CACEC2' // or black
    },

    '& .MuiInput-underline:after': {
      borderBottomColor: '#CACEC2'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#848D91',
        borderWidth: '2px'
      },
      '& label': {
        color: '#CACEC2'
      },
      '& input': {
        color: '#CACEC2'
      },
      '&:hover fieldset': {
        borderColor: '#848D91'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#21686B',
        borderWidth: '3px'
      }
    }
  }
})(TextField);

const useDarkStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white'
  },
  multilineColor: {
    color: '#CACEC2'
  },
  DialogTitle: {
    backgroundColor: '#161C22',
    color: '#CACEC2'
  },
  CancelIcon: {
    color: 'grey',
    float: 'right'
  },
  DialogContent: {
    backgroundColor: '#161C22',
    color: '#CACEC2'
  },
  DialogContentText: {
    color: '#848D91',
    marginBottom: '2rem'
  },
  button: {
    color: 'white',
    textTransform: 'none',
    backgroundColor: '#444A4E'
  },
  yourOutput: {
    fontSize: '0.9rem',
    marginBottom: '1rem',
    color: '#696d71'
  },
  expectedOutput: {
    fontSize: '0.9rem',
    marginBottom: '1rem',
    marginTop: '1rem',
    color: '#696d71'
  },
  output: {
    color: '#757575'
  },
  customInput: {
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
    color: '#CACEC2'
  },
  DialogTitle: {
    backgroundColor: 'white',
    color: 'black'
  },
  CancelIcon: {
    color: '#19686B',
    float: 'right'
  },
  DialogContent: {
    backgroundColor: 'white',
    color: 'black'
  },
  DialogContentText: {
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: '2rem'
  },
  button: {
    color: 'white',
    textTransform: 'none',
    backgroundColor: '#19686B'
  },
  yourOutput: {
    fontSize: '0.9rem',
    marginBottom: '1rem',
    color: 'black'
  },
  expectedOutput: {
    fontSize: '0.9rem',
    marginBottom: '1rem',
    marginTop: '1rem',
    color: 'black'
  },
  output: {
    color: '#757575'
  },
  customInput: {
    color: 'rgba(0, 0, 0, 0.6)',
    textTransform: 'none'
  }
}));

// const theme = createMuiTheme({
//   palette: {
//     primary: green,
//   },
// });

export default function FormDialog(props) {
  const { dark } = props;
  const darkStyle = useDarkStyles();
  const lightStyle = useLightStyles();

  const classes = dark ? darkStyle : lightStyle;

  const CustomField = dark ? ValidationTextFieldDark : ValidationTextFieldLight;

  // const dispatch = useDispatch();
  // const { input, output } = useSelector((state) => state.code);

  // const handleChange = (event) => {
  //   dispatch(inputChange(event.target.value));
  // };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button data-hover="Ask doubt" onClick={handleClickOpen} className={classes.customInput}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Custom Input
        </Typography>
        <BorderColorIcon
          fontSize="small"
          style={{ marginLeft: '0.3rem', color: 'text.secondary' }}
        />
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.DialogTitle}>
          Enter Custom Input
          <IconButton
            size="small"
            aria-label="delete"
            onClick={handleClose}
            className={classes.CancelIcon}
          >
            <CancelIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className={classes.DialogContent}>
          <DialogContentText className={classes.DialogContentText}>
            The test cases will run against the online judge and also against your code, will show
            your and expected output.
          </DialogContentText>
          <CustomField
            style={{ color: 'white' }}
            label="Test Input"
            required
            variant="outlined"
            InputProps={{
              className: classes.multilineColor
            }}
            // onChange={handleChange}
            // value={input}
            id="validation-outlined-input"
            fullWidth="true"
          />
        </DialogContent>
        <DialogContent className={classes.DialogContent}>
          <p className={classes.yourOutput}>Your Output</p>
          <h5 className={classes.output}>123</h5>
          <p className={classes.expectedOutput}>Expected Output</p>
          <h5 className={classes.output}>123</h5>
        </DialogContent>
        <DialogActions className={classes.DialogContent}>
          <Button
            autoFocus
            variant="contained"
            className={classes.button}
            onClick={() => props.submitHandler()}
          >
            Custom Test Run
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
