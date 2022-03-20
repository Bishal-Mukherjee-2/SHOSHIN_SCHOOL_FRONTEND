import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Carousel from 'react-elastic-carousel';
import { makeStyles } from '@material-ui/styles';
import Demo from '../../Cards/Course/index';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
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
    width: '140%'
  }
});

export default function App() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const classes = useStyles();

  return (
    <div className={classes.app}>
      <div className="carousel-wrapper">
        <Carousel className={classes.root} pagination={false} showArrows breakPoints={breakPoints}>
          {items.map((item) => (
            <Demo />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
