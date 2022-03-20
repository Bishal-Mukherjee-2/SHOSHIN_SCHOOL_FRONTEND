import { React, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

import { CURRENTUSER } from 'src/_mocks_/doubt';
import { useAuth } from 'src/contexts/AuthContext';

const customStyles = makeStyles(() => ({
  root: {
    bottom: 0,
    zIndex: 999,
    position: 'absolute',
    // width: '100vw !important'
    width: '100%',
    backgroundColor: 'white'
  },
  button: {
    backgroudColor: 'red'
  },
  input: {
    // paddingRight: 14,
    paddingTop: 3
  },
  fileInput: {
    display: 'none'
  }
}));

export default function CustomizedInputBase(props) {
  const { chats, roomId, socket_connection } = props;
  const { user } = useAuth();

  const [values, setValues] = useState({
    message: '',
    email: user.email
  });
  const { message, email } = values;

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const date = new Date();

  const handleSubmit = (event) => {
    event.preventDefault();
    socket_connection.emit('message', {
      sender: email,
      value: message,
      timeStamp: date.getTime(),
      type: message !== '' ? 'text' : 'image',
      roomId
    });
    setValues({ email, message: '' });
  };

  const styles = customStyles();
  return (
    <div className={styles.root}>
      <form onSubmit={(event) => handleSubmit(event)} style={{ width: '100%' }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '95%' }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Solve Doubt"
            inputProps={{ 'aria-label': 'solve Doubt' }}
            onChange={(event) => handleChange(event)}
            value={message}
            name="message"
          />
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <AddPhotoAlternateOutlinedIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <SendIcon onClick={(event) => handleSubmit(event)} />
          </IconButton>
        </Paper>
      </form>
    </div>
  );
}
