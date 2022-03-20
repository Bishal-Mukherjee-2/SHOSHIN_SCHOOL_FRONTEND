import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
// material
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Box, Grid, Card, Paper, Typography, CardHeader, CardContent } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import ModuleCard from '../ModulePanel/ModuleCardNew';
import style from '../ModulePanel/ModuleCardNew/styles.module.css';

// ----------------------------------------------------------------------

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    // height: 10,
    // borderRadius: 5,
  },
  colorPrimary: {
    // backgroundColor: '#FA983F',
    background: 'rgba(250, 152, 64, 0.4)'
  },
  bar: {
    // borderRadius: 5,
    backgroundColor: '#FA983F'
  }
}))(LinearProgress);

const SOCIALS = [
  {
    name: 'FaceBook',
    value: faker.datatype.number(),
    icon: <Icon icon={facebookFill} color="#1877F2" width={32} height={32} />
  },
  {
    name: 'Google',
    value: faker.datatype.number(),
    icon: <Icon icon={googleFill} color="#DF3E30" width={32} height={32} />
  },
  {
    name: 'Linkedin',
    value: faker.datatype.number(),
    icon: <Icon icon={linkedinFill} color="#006097" width={32} height={32} />
  },
  {
    name: 'Twitter',
    value: faker.datatype.number(),
    icon: <Icon icon={twitterFill} color="#1C9CEA" width={32} height={32} />
  },
  {
    name: 'FaceBook',
    value: faker.datatype.number(),
    icon: <Icon icon={facebookFill} color="#1877F2" width={32} height={32} />
  },
  {
    name: 'Google',
    value: faker.datatype.number(),
    icon: <Icon icon={googleFill} color="#DF3E30" width={32} height={32} />
  },
  {
    name: 'Linkedin',
    value: faker.datatype.number(),
    icon: <Icon icon={linkedinFill} color="#006097" width={32} height={32} />
  },
  {
    name: 'Twitter',
    value: faker.datatype.number(),
    icon: <Icon icon={twitterFill} color="#1C9CEA" width={32} height={32} />
  },
  {
    name: 'FaceBook',
    value: faker.datatype.number(),
    icon: <Icon icon={facebookFill} color="#1877F2" width={32} height={32} />
  },
  {
    name: 'Google',
    value: faker.datatype.number(),
    icon: <Icon icon={googleFill} color="#DF3E30" width={32} height={32} />
  },
  {
    name: 'Linkedin',
    value: faker.datatype.number(),
    icon: <Icon icon={linkedinFill} color="#006097" width={32} height={32} />
  },
  {
    name: 'Twitter',
    value: faker.datatype.number(),
    icon: <Icon icon={twitterFill} color="#1C9CEA" width={32} height={32} />
  }
];

// ----------------------------------------------------------------------

SiteItem.propTypes = {
  site: PropTypes.object
};

function SiteItem({ site }) {
  const { icon, value, name } = site;

  return (
    <Grid item xs={3}>
      <Paper variant="outlined">
        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
        <Box sx={{ mb: 0.5 }}>{icon}</Box>
        <Typography variant="h6">{fShortenNumber(value)}</Typography> */}
        <div className={style.container}>
          <div className={style.leftOuter}>
            <div className={style.leftContainer}>
              {/* <div className={style.ModuleHeading}>Flow Chart</div> */}
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {name}
              </Typography>
              <div className={style.deadline}>
                <div className={style.deadlineHeading}>Dealine 07-03-2021</div>
                <div className={style.deadlineIcon}>
                  <LockIcon style={{ fontSize: 14, color: '#FF0000' }} />
                </div>
              </div>
            </div>
            <div className={style.progress}>
              <Tooltip TransitionComponent={Zoom} title="progress 50%" placement="top" arrow>
                <BorderLinearProgress variant="determinate" value={50} />
              </Tooltip>
            </div>
          </div>
          <div className={style.rightContainer}>
            <Box sx={{ mb: 0.5 }}>{icon}</Box>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

export default function AppTrafficBySite() {
  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Level 1" />
        <CardContent>
          <Grid container spacing={5}>
            {SOCIALS.map((site) => (
              <SiteItem key={site.name} site={site} />
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Level 2" />
        <CardContent>
          <Grid container spacing={5}>
            {SOCIALS.map((site) => (
              <SiteItem key={site.name} site={site} />
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
