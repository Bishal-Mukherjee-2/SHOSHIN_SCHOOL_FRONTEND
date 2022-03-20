import { useRef, useState } from 'react';
// material
import { alpha } from '@material-ui/core/styles';
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import SwapVertIcon from '@material-ui/icons/SwapVert';

// components
import MenuPopover from '../../components/MenuPopover';

export default function Submit() {
  return (
    <>
      <div>
        <Button style={{ color: 'text.secondary', textTransform: 'none' }} data-hover="Submit">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Hint
          </Typography>
          <SwapVertIcon fontSize="small" style={{ marginLeft: '0.3rem' }} />
        </Button>
      </div>
    </>
  );
}
