import Rating from '@material-ui/lab/Rating';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import classes from './card.module.css';

export default function Card(props) {
  const {
    courseName,
    courseID,
    coursePrice,
    courseImage,
    courseDescription,
    courseSyllabus,
    courseDomain,
    level,
    duration,
    skills,
    prerequisites,
    purchased,
    setEnterRoom,
    ratings
  } = props;
  // console.log(purchased);

  const handleClick = () => {
    setEnterRoom(1);
  };

  return (
    <article className={classes.cardContainer}>
      <div className={classes.imageContainer}>
        <div className={classes.imageCon1} style={{ backgroundImage: `url(${courseImage})` }} />
      </div>

      <div className={classes.bodyContainer}>
        <div className={classes.bodyCon1}>
          <h2 className={classes.bodyConH2}>{courseName}</h2>
          <h3 className={classes.bodyConH3}>{courseDomain}</h3>

          {/* <div className={classes.bodyCon4}>
                        <div className={classes.bodyCon5}>
                            <div className={classes.bodyCon6}></div>
                        </div>
                        <small className={classes.bodyCon7}>"962"</small>
                    </div> */}
          <p className={classes.bodyCon8}>{courseDescription}</p>
        </div>

        <ul className={classes.bodyCon9}>
          <li className={classes.bodyCon91}>
            <BarChartIcon
              style={{ marginLeft: '0.6rem', marginRight: '0.6rem', color: '#197A9B' }}
            />
            {level}
          </li>

          <li className={classes.bodyCon92}>
            <AccessTimeIcon
              style={{ marginLeft: '0.6rem', marginRight: '0.6rem', color: '#197A9B' }}
            />
            {duration}
          </li>
          <li className={classes.bodyCon93}>
            <div className={classes.bodyCon94}>
              {/* <div className={classes.bodyCon941}>
                                <div className={classes.bodyCon9411}></div>
                            </div> */}
              <Rating name="read-only" value={ratings} precision={0.5} readOnly />
              {/* <small className={classes.bodyCon942}>62</small> */}
            </div>
          </li>
        </ul>

        <div className={classes.bodyCon10}>
          <section className={classes.bodyCon101}>
            <h4 className={classes.bodyCon1011}>Skills Covered</h4>
            <p className={classes.bodyCon1012}>{skills}</p>
          </section>
          <section className={classes.bodyCon101}>
            <h4 className={classes.bodyCon1011}>Prerequisites</h4>
            <p className={classes.bodyCon1012}>{prerequisites}</p>
          </section>
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <div className={classes.buttonCon1}>
          {purchased ? (
            <button className={classes.buttonCon11} onClick={handleClick}>
              Enter Classroom
            </button>
          ) : (
            <button className={classes.buttonCon11}>Enroll Course</button>
          )}

          <button href={`${courseSyllabus}`} className={classes.buttonCon12}>
            Download Syllabus
          </button>
        </div>

        <div className={classes.buttonCon2}>
          <h4 className={classes.buttonCon21}>Get the right skills at</h4>
          <p className={classes.buttonCon22}>Rs. {coursePrice}</p>
        </div>
      </div>
    </article>
  );
}
