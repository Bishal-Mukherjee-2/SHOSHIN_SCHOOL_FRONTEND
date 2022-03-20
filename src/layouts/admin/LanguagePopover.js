import { useRef, useState } from 'react';
// material
import { alpha } from '@material-ui/core/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
// components
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

const DEFAULT_OPTIONS = [
  {
    value: 'en',
    label: 'C++',
    icon: '/static/icons/ic_c++.svg'
  },
  {
    value: 'de',
    label: 'Java',
    icon: '/static/icons/ic_java.svg'
  },
  {
    value: 'fr',
    label: 'Python',
    icon: '/static/icons/ic_python.svg'
  }
];

// ----------------------------------------------------------------------

export default function LanguagePopover({
  options = DEFAULT_OPTIONS,
  setSelectedOption,
  selectedIndex = 0
}) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (index) => {
    if (setSelectedOption && typeof index === 'number') setSelectedOption(index);
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <img src={options[selectedIndex].icon} alt={options[selectedIndex].label} />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {options.map((option, index) => (
            <MenuItem
              key={option.value}
              selected={option.value === (options[selectedIndex] || options[0]).value}
              onClick={() => handleClose(index)}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
