import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import monacoThemes from 'monaco-themes/themes/themelist';
import { defineTheme } from '../theme';

const currencies = [
  {
    value: 'USD',
    label: 'theme 1'
  },
  {
    value: 'EUR',
    label: 'theme 2'
  },
  {
    value: 'BTC',
    label: 'theme 3'
  },
  {
    value: 'JPY',
    label: 'theme 4'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch'
    },
    '& .MuiInputBase-root': {
      fontSize: '12px'
    },
    '&:hover .MuiTextField-root': {
      borderColor: 'yellow'
    }
  }
}));

export default function MultilineTextFields(props) {
  const { monacoTheme, setMonacoTheme } = props;

  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleThemeChange = (ev) => {
    const theme = ev.target.value;
    defineTheme(theme).then((_) => setMonacoTheme(theme));
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-select-currency"
        select
        label={'Theme'}
        value={monacoTheme}
        onChange={handleThemeChange}
        variant="outlined"
        size="small"
      >
        {Object.entries(monacoThemes).map(([themeId, themeName]) => (
          <MenuItem key={themeId} value={themeId}>
            {themeName}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
