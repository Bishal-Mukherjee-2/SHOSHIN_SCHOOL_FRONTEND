import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import DehazeIcon from '@material-ui/icons/Dehaze';
import { Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import lightStyle from './QuestionLight.module.css';
import darkStyle from './QuestionDark.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  customBadge: {
    backgroundColor: '#00AFD7',
    color: 'black'
  }
}));

const Question = (props) => {
  const { dark } = props;

  const classes = dark ? darkStyle : lightStyle;

  return (
    <>
      {/* <div className={classes.run}>
                    
                    
                    <div className={classes.toogle}>
                        <div onClick={(() => dispatch({type:"TOGGLE_LECTURE"}))}>
                            <DehazeIcon fontSize='small' style={{ color: '#79B8F3' }}></DehazeIcon>
                        </div>
                        
                        <div className={classes.heading}>Code Scratcher</div> 
                        
                    </div>
                </div> */}

      <div className={classes.leftPannelContainer}>
        <div className={classes.problemStatement}>
          <div className={classes.problemName}>Code : Min Cost Path</div>
        </div>

        <h4 className={classes.question}>
          An integer matrix of size (M x N) has been given. Find out the minimum cost to reach from
          the cell (0, 0) to (M - 1, N - 1).
        </h4>
        <h4 className={classes.question}>From a cell (i, j), you can move in three directions:</h4>

        <pre className={classes.color1}>
          <code>
            1. ((i + 1), j) which is, "down"
            <br />
            2. (i, (j + 1)) which is, "to the right"
            <br />
            3. ((i+1), (j+1)) which is, "to the diagonal"
          </code>
        </pre>

        <h4 className={classes.question}>
          An integer matrix of size (M x N) has been given. Find out the minimum cost to reach from
          the cell (0, 0) to (M - 1, N - 1).
        </h4>
        <h4 className={classes.question}>From a cell (i, j), you can move in three directions:</h4>

        <pre className={classes.color2}>
          <code>
            1. ((i + 1), j) which is, "down" 2. (i, (j + 1)) which is, "to the right" 3. ((i+1),
            (j+1)) which is, "to the diagonal"
          </code>
        </pre>
        <h4 className={classes.question}>
          An integer matrix of size (M x N) has been given. Find out the minimum cost to reach from
          the cell (0, 0) to (M - 1, N - 1).
        </h4>
        <h4 className={classes.question}>From a cell (i, j), you can move in three directions:</h4>

        <pre className={classes.color3}>
          <code>
            1. ((i + 1), j) which is, "down" 2. (i, (j + 1)) which is, "to the right" 3. ((i+1),
            (j+1)) which is, "to the diagonal"
          </code>
        </pre>
        <h4 className={classes.question}>
          An integer matrix of size (M x N) has been given. Find out the minimum cost to reach from
          the cell (0, 0) to (M - 1, N - 1).
        </h4>
        <h4 className={classes.question}>From a cell (i, j), you can move in three directions:</h4>

        <pre className={classes.color1}>
          <code>
            1. ((i + 1), j) which is, "down" 2. (i, (j + 1)) which is, "to the right" 3. ((i+1),
            (j+1)) which is, "to the diagonal"
          </code>
        </pre>
        <h4 className={classes.question}>
          An integer matrix of size (M x N) has been given. Find out the minimum cost to reach from
          the cell (0, 0) to (M - 1, N - 1).
        </h4>
        <h4 className={classes.question}>From a cell (i, j), you can move in three directions:</h4>

        <pre className={classes.color2}>
          <code>
            1. ((i + 1), j) which is, "down" 2. (i, (j + 1)) which is, "to the right" 3. ((i+1),
            (j+1)) which is, "to the diagonal"
          </code>
        </pre>
      </div>

      {/* <div className={classes.doubt}>
  
                        <Button data-hover="Ask doubt" onClick={handleClickOpen}
                        style={{color:'#eeeeee',textTransform:'none',marginLeft:'5rem'}}>
                            
                            Ask Doubt
                            <div className={classesBadge.root}>
                            <Badge classes={{ badge: classesBadge.customBadge }} badgeContent={4} color="secondary">
                                <HeadsetMicIcon />
                            </Badge>
                            </div>
                            
                        </Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <form autoComplete="off" noValidate onSubmit={handleSubmit} >
                            
                            <DialogContent>
                            <DialogContentText>
                            <span style={{fontSize:'1.2rem'}}><b>Tips on writing a good question:</b><br/></span>
                            <span style={{fontSize:'0.9rem'}}>
                                <CheckCircleIcon style={{fontSize:'0.7rem',color:'green',marginRight:'3px'}}/>
                                How you encountered the problem?<br/>
                                <CheckCircleIcon style={{fontSize:'0.7rem',color:'green',marginRight:'3px'}}/>
                                Specific area where you need help.<br/>
                                <CheckCircleIcon style={{fontSize:'0.7rem',color:'green',marginRight:'3px'}}/>
                                Anything you have already tried before to solve the issue but didn't work.
                            </span>
                            </DialogContentText>
                            <TextField
                                autoFocus
                                name="title"
                                margin="dense"
                                id="name"
                                label="Title"
                                type="text"
                                fullWidth
                                onChange={(e)=>setPostData({ ...postData, title: e.target.value, 
                                    email:"vish@gmail.com", name:"vishakha", postTime: new Date()})}
                                
                                
                            />
                            <TextField
                                
                                margin="dense"
                                name="description"
                                id="description"
                                label="Description"
                                type="text"
                                fullWidth
                                onChange={(e)=>setPostData({ ...postData, description: e.target.value})}
                                
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} type="submit" color="primary">
                                Ask Doubt
                            </Button>
                            </DialogActions>
                        </form>
                        </Dialog>
                               
                        
                </div> */}
    </>
  );
};

export default Question;
