import React, { useContext, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { makeStyles } from '@material-ui/styles';
import SecondUser from './chatting/SecondUser';
import FirstUser from './chatting/FirstUser';
import { CURRENTUSER } from 'src/_mocks_/doubt';

// import ChatContext from '../context/ChatContext';

const customStyles = makeStyles(() => ({
  root: {
    margin: 10,
    marginTop: 47,
    marginBottom: 40
  },
  chatSectionDay: {
    // backgroundColor: '#19686B',
    border: '1px solid #19686B',
    borderRadius: '15px',
    padding: '2px 10px',
    width: 50,
    color: '#19686B',
    fontSize: 10
  }
}));

let messageList = [
  {
    sender: 'other',
    message: 'Hello Daniel, Godaddy here. We saw your works lately and we would like.'
  },
  {
    sender: 'me',
    message: 'Hello, thanks for reaching out. How is the terms'
  },
  {
    sender: 'me',
    message: 'Hello, thanks for reaching out. How is the terms'
  },
  {
    sender: 'other',
    message: 'Hello Daniel, Godaddy here. We saw your works lately and we would like.'
  },
  {
    sender: 'other',
    message: 'Hello Daniel, Godaddy here. We saw your works lately and we would like.'
  }
];

function Chatting(props) {
  //   let context = useContext(ChatContext);
  //   let messageList = context.messages;

  const { chats } = props;
  const { user } = useAuth();

  //   console.log(chats);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props]);

  const styles = customStyles();
  return (
    <div className={styles.root}>
      <div align="center">
        {' '}
        <p className={styles.chatSectionDay}>
          {' '}
          <b>Today</b>{' '}
        </p>{' '}
      </div>
      {chats &&
        chats.map((msg, k) => {
          if (msg.sender === user.email) {
            return <FirstUser key={k} message={msg} />;
          } else {
            return <SecondUser key={k} message={msg} />;
          }
        })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Chatting;
