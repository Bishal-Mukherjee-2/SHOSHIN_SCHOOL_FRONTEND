import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Carousel from 'react-elastic-carousel';
import ActiveCard from '../ActiveCard';
import { makeStyles } from '@material-ui/styles';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

const breakPoints = [
  { width: 1, itemsToShow: 2 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 }
];

const useStyles = makeStyles({
  root: {
    '& .rec.rec-arrow': {
      color: '#19686B',
      boxShadow: 'none',
      fontSize: '1rem',
      border: 'none',

      /* padding: 0; */
      width: '20px',
      height: '20px',
      minWidth: '20px',
      lineHeight: '20px'
    },
    '& .rec.rec-arrow:hover': {
      backgroundColor: '#19686B',
      color: 'white'
    },
    '& .rec.rec-arrow:focus': {
      backgroundColor: '#19686B',
      color: 'white'
    }
  },
  app: {
    width: 'calc( 32vw - 60px )'
  }
});

export default function App(props) {
  const { allCourses } = props;
  const classes = useStyles();

  return (
    <Routes>
      <div className={classes.app}>
        <div className="carousel-wrapper">
          <Carousel
            className={classes.root}
            pagination={false}
            showArrows={true}
            breakPoints={breakPoints}
          >
            <Link
              to="/doubt1"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'black', outline: 'none' }}
            >
              <ActiveCard />
            </Link>
            <Link
              to="/doubt2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'black', outline: 'none' }}
            >
              <ActiveCard />
            </Link>
            <Link
              to="/doubt3"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'black', outline: 'none' }}
            >
              <ActiveCard />
            </Link>
          </Carousel>
        </div>
      </div>
    </Routes>
  );
}
