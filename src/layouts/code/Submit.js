import { useRef, useState } from 'react';
// material
import { alpha } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

// components
import MenuPopover from '../../components/MenuPopover';

export default function Submit() {
  return (
    <>
      <div>
        <Button style={{ textTransform: 'none' }} data-hover="Submit">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Submit
          </Typography>
          <RotateLeftIcon fontSize="small" style={{ marginLeft: '0.3rem' }} />
        </Button>
      </div>
    </>
  );
}
