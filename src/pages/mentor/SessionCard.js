import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
  root: {
    color: 'rgba(25, 104, 107, 1)',
    '&$checked': {
      color: 'rgba(25, 104, 107, 1)'
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)',
    width: '477px',
    padding: '24px 24px 39px 24px'
  },
  heading: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '25px',
    color: 'black'
  },
  middleBox: {
    display: 'flex',
    marginTop: '33px',
    marginBottom: '44px'
  },
  checkHeading: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '22px',
    color: 'black',
    width: '50%'
  },
  infoBox: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '50%'
  },
  upperDetail: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#000000',
    marginBottom: '4px'
  },
  lowerDetail: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10px',
    lineHeight: '14px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: '4px'
  },
  bottomBox: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '14px',
    lineHeight: '21px',
    color: 'rgba(0, 0, 0, 0.6)'
  }
}));

export default function SessionCard({ setCheckState }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedG: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setCheckState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <div className={classes.root}>
      <div className={classes.heading}>Start your doubt session</div>
      <div className={classes.middleBox}>
        <div className={classes.checkHeading}>
          <GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" /> Start
          taking doubts
        </div>
        <div className={classes.infoBox}>
          <div>
            <div className={classes.upperDetail}>1:45 pm</div>
            <div className={classes.lowerDetail}>Last update</div>
          </div>
          <div>
            <div className={classes.upperDetail}>10</div>
            <div className={classes.lowerDetail}>Doubts available</div>
          </div>
        </div>
      </div>
      <div className={classes.bottomBox}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant justo, dictum adipiscing
        enim diam habitant.
      </div>
    </div>
  );
}
