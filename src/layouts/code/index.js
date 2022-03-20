import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StyledEngineProvider } from '@mui/material/styles';
//
import DashboardNavbar from './CodeNavbar';
import DashboardSidebar from './CodeSidebar';
import DoubtDrawer from '../../components/Doubt/DoubtDrawer';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.darker,
  position: 'absolute',
  right: '42%',
  top: '50%'
}));

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  // overflow: 'auto', removed as scroll is coming in coding area
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  position: 'relative', // added as there was no scroll inside lession & code
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // runs on location, i.e. route, change
    console.log('handle route change here', location.pathname);
    setRefresh(true);

    fetch('https://api.github.com/users')
      .then((res) => {
        res.json();
        setTimeout(() => setRefresh(false), 1000);
        // setRefresh(false);
        console.log('refresh', refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);
  console.log('refresh', refresh);
  return (
    <RootStyle>
      {!refresh && <DashboardNavbar onOpenSidebar={() => setOpen(true)} />}

      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      {refresh ? (
        <Spinner />
      ) : (
        <MainStyle>
          <Outlet />
        </MainStyle>
      )}
    </RootStyle>
  );
}
