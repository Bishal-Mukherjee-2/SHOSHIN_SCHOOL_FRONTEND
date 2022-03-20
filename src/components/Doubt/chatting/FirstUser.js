import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { mockImgProduct } from '../../../utils/mockImages';

const customStyles = makeStyles(() => ({
  root: {
    marginTop: 15
  },
  message: {
    padding: 15,
    backgroundColor: '#19686B',
    color: 'white',
    maxWidth: '16vw',
    width: 'max-content',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 35,
    fontSize: 13
  }
}));

function FirstUser({ message }) {
  const styles = customStyles();
  return (
    <div className={styles.root} align="right">
      <div className={styles.message} align="left">
        {message.type === 'text' ? message.value : <img alt="chat" src={mockImgProduct(1)} />}
      </div>
    </div>
  );
}

export default FirstUser;
