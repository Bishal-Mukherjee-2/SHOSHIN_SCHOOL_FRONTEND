import { useRef, useState } from 'react';
// material
import { alpha } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';

// components
import MenuPopover from '../../components/MenuPopover';

export default function Submit() {
  return (
    <>
      <div>
        <Button style={{ color: 'text.secondary', textTransform: 'none' }} data-hover="Submit">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Ask Doubt
          </Typography>
          <HeadsetMicIcon fontSize="small" style={{ marginLeft: '0.3rem' }} />
        </Button>
      </div>
    </>
  );
}
