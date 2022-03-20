/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
/* eslint-disable max-classes-per-file */
import * as React from 'react';
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import TextField from '@material-ui/core/TextField';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styled from 'styled-components';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import cssToObject from 'css-to-object';
import SplitPane from 'react-split-pane';
import Question from '../question/Question';
import monacoThemes from 'monaco-themes/themes/themelist';
import Mcq from '../question/Mcq';
import { AppTasks } from '../_dashboard/app';
import { defineTheme } from './theme';

import Navbar from './navbar/index';

// background: #101010;
// color: #fff;
require('./index.css');

const code =
  '#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int r, c, a[100][100], b[100][100], sum[100][100], i, j;\n\n    cout << "Enter number of rows (between 1 and 100): ";\n    cin >> r;\n\n    cout << "Enter number of columns (between 1 and 100): ";\n    cin >> c;\n\n    cout << endl << "Enter elements of 1st matrix: " << endl;\n\n    // Storing elements of first matrix entered by user.\n    for(i = 0; i < r; ++i)\n       for(j = 0; j < c; ++j)\n       {\n           cout << "Enter element a" << i + 1 << j + 1 << " : ";\n           cin >> a[i][j];\n       }\n\n    // Storing elements of second matrix entered by user.\n    cout << endl << "Enter elements of 2nd matrix: " << endl;\n    for(i = 0; i < r; ++i)\n       for(j = 0; j < c; ++j)\n       {\n           cout << "Enter element b" << i + 1 << j + 1 << " : ";\n           cin >> b[i][j];\n       }\n\n    // Adding Two matrices\n    for(i = 0; i < r; ++i)\n        for(j = 0; j < c; ++j)\n            sum[i][j] = a[i][j] + b[i][j];\n\n    // Displaying the resultant sum matrix.\n    cout << endl << "Sum of two matrix is: " << endl;\n    for(i = 0; i < r; ++i)\n        for(j = 0; j < c; ++j)\n        {\n            cout << sum[i][j] << "  ";\n            if(j == c - 1)\n                cout << endl;\n        }\n\n    return 0;\n}';

export default function StyledEditor() {
  function handleEditorChange(value, event) {
    console.log('here is the current model value:', value);
  }

  const [monacoTheme, setMonacoTheme] = useState();
  const [fontSize, setFontSize] = useState(13);

  //   const handleThemeChange = (ev) => {
  //     const theme = ev.target.value;
  //     defineTheme(theme).then((_) => setMonacoTheme(theme));
  //   };

  return (
    <>
      <SplitPane
        style={{
          position: 'absolute'
        }}
        split="vertical"
        defaultSize="30%"
      >
        <Question />

        {0 ? (
          <Container sx={{ pt: 2.5 }} maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={8}>
                <AppTasks />
              </Grid>
            </Grid>
          </Container>
        ) : (
          <div>
            {/* <TextField
              select
              variant="filled"
              value={monacoTheme}
              onChange={handleThemeChange}
              className="full-width"
              label="Theme"
            >
              {Object.entries(monacoThemes).map(([themeId, themeName]) => (
                <MenuItem key={themeId} value={themeId}>
                  {themeName}
                </MenuItem>
              ))}
            </TextField> */}
            <Navbar
              monacoTheme={monacoTheme}
              setMonacoTheme={setMonacoTheme}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
            <Editor
              height="90vh"
              defaultLanguage="cpp"
              defaultValue={code}
              options={{ fontSize: fontSize }}
              theme={monacoTheme}
              loading={<div>shoshin school</div>}
              onChange={handleEditorChange}
            />
          </div>
        )}
      </SplitPane>
      {/* <Style css={this.props.dark ? DEFAULT_CSS_VALUE_DARK : DEFAULT_CSS_VALUE_LIGHT} /> */}
    </>
  );
}

export const Style = (props) => (
  <style
    dangerouslySetInnerHTML={{
      __html: props.css
    }}
  />
);
