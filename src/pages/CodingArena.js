/* eslint-disable jsx-a11y/iframe-has-title */
// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { StyledEngineProvider } from '@mui/material/styles';

// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

import StyledEditor from '../components/playground/index';
import DoubtDrawer from '../components/Doubt/DoubtDrawer';

// ----------------------------------------------------------------------

export default function CodingArena() {
  return (
    <Page title="Shoshin | Code">
      <StyledEngineProvider injectFirst>
        <DoubtDrawer />
      </StyledEngineProvider>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8}>
            <StyledEditor />

            {/* <iframe
              src="https://codesandbox.io/embed/react-new?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark"
              style={{
                width: '150%',
                height: '650px',
                border: '1',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
              title="React"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            /> */}
            {/* <iframe
              src="https://www.youtube.com/embed/AbPduKHskgI"
              style={{
                width: '150%',
                height: '650px',
                border: '1',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
              title="React"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            /> */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
