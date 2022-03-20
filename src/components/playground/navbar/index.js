import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ThemeDrop from './ThemeDrop';
import reset from '../../../images/ic_reset.svg';
import codePair from '../../../images/ic_codePair.svg';
import fontPlus from '../../../images/ic_fontPlus.svg';
import fontDec from '../../../images/ic_fontDec.svg';
import codeDiff from '../../../images/ic_codeDiff.svg';
import eye from '../../../images/ic_eye.svg';
import monacoThemes from 'monaco-themes/themes/themelist';
import { defineTheme } from '../theme';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    borderTop: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    borderRadius: '0px'
  },
  divider: {
    margin: theme.spacing(1, 0.5)
  }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius
    }
  }
}))(ToggleButtonGroup);

export default function CustomizedDividers(props) {
  const { monacoTheme, setMonacoTheme, fontSize, setFontSize } = props;

  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['italic']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  //   const handleAlignment = (event, newAlignment) => {
  //     if (newAlignment !== null) {
  //       setAlignment(newAlignment);
  //     }
  //   };

  const handleDecrease = () => {
    if (fontSize >= 11) {
      setFontSize(fontSize - 1);
    }
  };
  const handleIncrease = () => {
    if (fontSize <= 16) {
      setFontSize(fontSize + 1);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          // value={alignment}
          exclusive
          // onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ThemeDrop monacoTheme={monacoTheme} setMonacoTheme={setMonacoTheme} />
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <StyledToggleButtonGroup
          size="small"
          //   value={alignment}
          exclusive
          //   onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton onClick={() => handleIncrease()} value="plus" aria-label="plus">
            <img src={fontPlus} width="22px" alt="" />
          </ToggleButton>
          <ToggleButton onClick={() => handleDecrease()} value="minus" aria-label="minus">
            <img src={fontDec} width="22px" alt="" />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="codePair" aria-label="codePair">
            <img src={codePair} width="22px" alt="" />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="codeDiff" aria-label="codeDiff">
            <img src={codeDiff} width="22px" alt="" />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />

        <StyledToggleButtonGroup size="small" aria-label="text formatting">
          <ToggleButton value="reset" aria-label="reset">
            <img src={reset} width="22px" alt="" />
          </ToggleButton>
        </StyledToggleButtonGroup>

        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="eye" aria-label="eye">
            <img src={eye} width="22px" alt="" />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}
