import React, { useContext, createContext } from 'react';
import ChatNavBar from './ChatNavBar';
import Chatting from './Chatting';
import InputField from './chatting/InputField';
import ChatInput from './chatting/ChatInput';

const Chat = (props) => {
  const { setChatOpen, ChatData, socket_connection } = props;
  //   console.log(ChatData.chats);
  //   console.log(ChatData[0].roomId);
  return (
    <div>
      <ChatNavBar setChatOpen={setChatOpen} studentName={ChatData[0].studentName} />
      <Chatting chats={ChatData[0].chats} />
      <ChatInput
        socket_connection={socket_connection}
        roomId={ChatData[0].roomId}
        email={ChatData[0].studentEmail}
        Chats={ChatData[0].chats}
      />
    </div>
  );
};

export default Chat;
