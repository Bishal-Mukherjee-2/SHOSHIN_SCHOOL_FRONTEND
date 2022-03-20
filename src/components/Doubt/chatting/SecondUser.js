import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';

import { mockImgProduct } from '../../../utils/mockImages';

const customStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginBottom: 15,
    marginTop: 15
  },
  avatar: {
    display: 'inline-block',
    width: 30,
    height: 30,
    marginTop: 'auto',
    marginRight: 7
  },
  message: {
    padding: 15,
    backgroundColor: '#ebebeb',
    maxWidth: '15vw',
    width: 'max-content',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 35,
    fontSize: 13
  }
}));

function SecondUser({ message }) {
  const styles = customStyles();
  return (
    <div className={styles.root}>
      {/* <Avatar className={styles.avatar} src="a" /> */}
      <div className={styles.message}>
        {message.type === 'text' ? message.value : <img alt="chat" src={mockImgProduct(1)} />}
      </div>
    </div>
  );
}

export default SecondUser;
