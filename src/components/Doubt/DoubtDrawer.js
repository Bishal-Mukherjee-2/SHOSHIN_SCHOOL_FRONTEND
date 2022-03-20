import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from './List';
import Chat from './Chat';
import { fetchActiveDoubts } from 'src/services/doubt/doubt';

import { DOUBTMODEL } from 'src/_mocks_/doubt';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import socketio from 'socket.io-client';

const socket_connection = socketio.connect('https://shoshin-school-backend.herokuapp.com');

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800]
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? '#06595C' : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  cursor: 'grab'
}));

const sx = {
  '&.MuiDrawer-root > .MuiPaper-root': {
    height: `calc(50% - ${drawerBleeding}px)`,
    overflow: 'visible',
    width: '400px',
    left: 'auto',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)'
  }
};

function SwipeableEdgeDrawer() {
  const [open, setOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [roomId, setRoomId] = React.useState();
  const [fetchedDoubts, setFetchedDoubts] = React.useState([]);
  const { user } = useAuth();

  const ChatData = fetchedDoubts.filter((doubt) => doubt.roomId === roomId);
  //console.log('CHATDATA ', ChatData);

  const toggleDrawer = (newOpen) => () => {
    if (open) {
      setOpen(!newOpen);
    } else {
      setOpen(newOpen);
    }
  };

  const handleMessageToChat = (params) => {
    setFetchedDoubts((prev) => {
      if (!prev) return prev;
      let copy = prev;
      copy = copy.map((element) => {
        if (element.roomId === params.roomId) {
          let messageObject = {
            type: params.type,
            value: params.value,
            sender: params.sender
          };
          element.chats.push(messageObject);
          return element;
        } else return element;
      });
      return copy;
    });
  };

  const handleFetchDoubt = () => {
    fetchActiveDoubts(user.email).then((res) => {
      res.forEach((response) => {
        socket_connection.emit('joinRoom', { roomId: response.roomId });
      });
      setFetchedDoubts(res);
    });
  };

  useEffect(() => {
    handleFetchDoubt();
    socket_connection.on('message', (params) => {
      handleMessageToChat(params);
    });
  }, []);

  return (
    <Root>
      <CssBaseline />
      <SwipeableDrawer
        variant="persistent"
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        BackdropProps={{ invisible: true }}
        ModalProps={{
          keepMounted: true
        }}
        sx={sx}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: '-35px',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            overflow: 'visible',
            borderTop: '2px solid #06595C'
          }}
        >
          <Puller onClick={toggleDrawer(true)} />
          <Typography sx={{ p: 2, color: 'text.secondary', fontSize: '0.6rem' }}>
            {' '}
            Active Doubts
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto'
          }}
        >
          {chatOpen ? (
            <Chat
              socket_connection={socket_connection}
              setChatOpen={setChatOpen}
              ChatData={ChatData}
            />
          ) : (
            <List fetchedDoubts={fetchedDoubts} setChatOpen={setChatOpen} setRoomId={setRoomId} />
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
