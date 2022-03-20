import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { mockImgAvatar } from '../../utils/mockImages';

import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { DOUBTMODEL } from 'src/_mocks_/doubt';
import { useAuth } from 'src/contexts/AuthContext';

const messages = [
  {
    id: 1,
    primary: 'Brunch this week?',
    secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/static/images/avatar/5.jpg'
  },
  {
    id: 2,
    primary: 'Birthday Gift',
    secondary: `Do you have a suggestion for a good present for John on his work
		anniversary. I am really confused & would love your thoughts on it.`,
    person: '/static/images/avatar/1.jpg'
  },
  {
    id: 3,
    primary: 'Recipe to try',
    secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
    person: '/static/images/avatar/2.jpg'
  }
];

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: 'auto',
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
}));

export default function ChatList(props) {
  const classes = useStyles();

  const { setChatOpen, setRoomId, fetchedDoubts } = props;

  const handleClick = (roomId) => {
    setChatOpen(true);
    setRoomId(roomId);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <List className={classes.list}>
          {fetchedDoubts.map(({ profileImageStudent, title, lastMessage, roomId, index }) => (
            <React.Fragment key={index}>
              <ListItem button onClick={() => handleClick(roomId)}>
                <ListItemAvatar>
                  <Avatar alt="Student image" src={mockImgAvatar(1)} />
                </ListItemAvatar>
                <ListItemText primary={title} secondary={lastMessage} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
