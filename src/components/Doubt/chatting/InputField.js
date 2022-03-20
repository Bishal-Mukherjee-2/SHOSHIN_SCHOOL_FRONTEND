import React, { useContext, useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import SendIcon from '@material-ui/icons/Send';
import AddImage from '@material-ui/icons/ImageOutlined';
// import ChatContext from '../../context/ChatContext';
import ChatInput from './ChatInput';

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

function InputField() {
  //   const context = useContext(ChatContext);

  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
  };

  const styles = customStyles();
  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <ChatInput />
      </form>
    </div>
  );
}

export default InputField;
