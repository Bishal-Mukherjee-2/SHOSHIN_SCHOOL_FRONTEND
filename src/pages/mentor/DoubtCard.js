import React from 'react';
import { makeStyles } from '@material-ui/styles';
import styles from './dashboard.module.css';
import nodoubt from '../../images/nodoubt.svg';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({}));

function NoDoubt() {
  return (
    <div className={`${styles.doubtCardBox} ${styles.NoDoubtCard}`}>
      <div>
        <img src={nodoubt} alt="there is no doubts in the system"></img>
      </div>
      <div className={styles.nodoubtHeading}>No Doubts Available</div>
      <div className={styles.nodoubtSubHeading}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant justo, dictum adipiscing
        enim diam habitant.
      </div>
      <div className={styles.nodoubtButton}>Load Doubts</div>
    </div>
  );
}

function Doubt() {
  return (
    <div className={`${styles.doubtCardBox} ${styles.DoubtCard}`}>
      <div className={styles.doubtUpperBox}>
        <div className={styles.doubtLeftBox}>
          <div className={styles.doubtHeading}>Data Structure in C++</div>
          <div className={styles.doubtquesHeading}> Doubts</div>
          <div className={styles.doubtquesSubHeading}>Question/Concept related</div>
          <div className={styles.doubt}> Need more clarity ?</div>
        </div>
        <div className={styles.doubtRightBox}>
          <Avatar
            style={{ width: '60px', height: '60px', marginLeft: '20%' }}
            alt="Remy Sharp"
            src=""
          />
          <div className={styles.studentName}>Name of Student</div>
          <div className={styles.smallHeading}>Student</div>
          <div className={styles.marks}>87.7%</div>
          <div className={styles.smallHeading}> Current Score</div>
        </div>
      </div>
      <div>
        <div className={styles.doubtquesHeading}> Topic</div>
        <div className={styles.doubtquesSubHeading}>Lecture 14: Priority Queues</div>
        <div className={styles.doubt}> Running Median</div>
        <div className={styles.question}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant justo, dictum adipiscing
          enim diam habitant.
        </div>
        <div className={styles.read}>Read More</div>
        <div className={styles.doubtBelowBox}>
          <div>
            <div className={styles.doubt}>Accept Within</div>
            <div className={styles.time}>56 secs</div>
          </div>
          <div className={styles.doubtButtonBox}>
            <div>
              <button className={styles.doubtLightButton}>Reject</button>
            </div>
            <div>
              <button className={styles.doubtDarkButton}>Accept</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DoubtCard({ checkState }) {
  const classes = useStyles();
  return <div>{checkState.checkedG ? <Doubt /> : <NoDoubt />}</div>;
}
