import PropTypes from 'prop-types';
// material
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />;
}
