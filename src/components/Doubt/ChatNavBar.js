import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChatContext from '../context/ChatContext';

const customStyles = makeStyles(() => ({
  root: {
    top: 0,
    // position: 'fixed',
    width: '100%',
    zIndex: 999,
    position: 'absolute'
  },
  paper: {
    borderRadius: '0px',
    display: 'flex'
  },
  userBar: {
    display: 'inline-block',
    flexGrow: 1
  },
  userName: {
    fontSize: '11px',
    // marginBottom: 0,
    marginTop: 'auto',
    marginBottom: 'auto'

    // marginTop: 14
  },
  userLastSeen: {
    fontSize: '8px',
    color: 'grey',
    // marginBottom: 14,
    marginTop: 0
  },
  backButton: {
    //display: 'inline-block'
    // marginTop: '-20px'
    marginTop: 'auto',
    marginBottom: 'auto'
  }
}));

function ChatNavBar(props) {
  //   const context = useContext(ChatContext);

  const { setChatOpen, studentName } = props;
  console.log('username ', studentName);

  const handleBackClick = (e) => {
    setChatOpen(false);
  };

  const styles = customStyles();
  return (
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <IconButton className={styles.backButton} onClick={handleBackClick}>
          <ChevronLeftIcon />
        </IconButton>

        <p className={styles.userName}>
          {' '}
          <b> {studentName} </b>{' '}
        </p>
        {/* <p className={styles.userLastSeen}>Last seen 22 seconds ago</p> */}
      </Paper>
    </div>
  );
}

export default ChatNavBar;
