/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
/* eslint-disable max-classes-per-file */
import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styled from 'styled-components';
import { Box, Grid, Container, Typography } from '@material-ui/core';

import cssToObject from 'css-to-object';
import SplitPane from 'react-split-pane';
import Question from '../question/Question';
import Mcq from '../question/Mcq';
import { AppTasks } from '../_dashboard/app';
// background: #101010;
// color: #fff;
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');
require('codemirror/mode/jsx/jsx');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/dracula.css');
require('codemirror/theme/panda-syntax.css');
require('codemirror/theme/material.css');
require('./theme.css');
require('./darcula.css');
require('./index.css');

const DEFAULT_JS_VALUE =
  "import * as React from 'react'\r\nimport { withRouter } from 'react-router'\r\n\r\nimport * as methods from './methods'\r\nimport { Input } from '#components/Input'\r\nimport { inject, observer } from 'mobx-react'\r\nimport './Splash.css'\r\n\r\nconst selector = (tree) => {\r\n  console.warn({ tree })\r\n  return {\r\n    moduleStore: tree.state.moduleStore\r\n  }\r\n}\r\n\r\n@withRouter\r\n@inject(selector)\r\n@observer\r\nexport class Splash extends React.Component {\r\n  setInputValue = methods.setInputValue(this)\r\n  handleEnterKey = methods.handleEnterKey(this)\r\n  submitRegistration = methods.submitRegistration(this)\r\n  attemptLogin = methods.attemptLogin(this)\r\n  handleLoginEnterKey = methods.handleLoginEnterKey(this)\r\n  state = {\r\n    emailInputValue: locast.lastUserEmail || '',\r\n    passwordInputValue: '',\r\n    usernameInputValue: ''\r\n  }\r\n\r\n  render() {\r\n    const { props, state } = this\r\n    console.log('<Splash>', { props, state })\r\n\r\n    return (\r\n      <div styleName=\"Splash\">\r\n        <h1 className=\"title\">place some copy here</h1>\r\n\r\n        <Input\r\n          big\r\n          value={state.usernameInutValue}\r\n          onChange={this.setInputValue('username')}\r\n          onKeyPress={this.handleEnterKey}\r\n        />\r\n\r\n        <Input\r\n          big\r\n          value={state.emailInputValue}\r\n          onChange={this.setInputValue('email')}\r\n          onKeyPress={this.handleEnterKey}\r\n        />\r\n\r\n        <Input\r\n          big\r\n          value={state.passwordInputValue}\r\n          onChange={this.setInputValue('password')}\r\n          onKeyPress={this.handleEnterKey}\r\n        />\r\n\r\n        {/* TODO: Style buttons and shit... */}\r\n        <button onClick={this.submitRegistration}>submit</button>\r\n\r\n        <h1>LOGIN FORM</h1>\r\n\r\n        <Input\r\n          big\r\n          value={state.usernameInputValue}\r\n          onChange={this.setInputValue('username')}\r\n          onKeyPress={this.handleLoginEnterKey}\r\n        />\r\n\r\n        <Input\r\n          big\r\n          value={state.passwordInputValue}\r\n          onChange={this.setInputValue('password')}\r\n          onKeyPress={this.handleLoginEnterKey}\r\n        />\r\n\r\n        {/* TODO: Style buttons and shit... */}\r\n        <button onClick={this.attemptLogin}>submit</button>\r\n\r\n        <small styleName=\"emailPrompt\">\r\n          Enter your email to create a new module.\r\n        </small>\r\n      </div>\r\n    )\r\n  }\r\n}\r\n";

const DEFAULT_CSS_VALUE_DARK =
  '.cm-s-custom-0 {\r\n\tbackground: rgb(19, 19, 37);\r\n\tcolor: rgb(173, 170, 204);\r\n\tmargin-top:2px;\r\npadding-top: 20px;\r\nfont-size: 15px;\r\n  font-weight: 300;\r\n\tline-height: 1.6;\r\n\tfont-family: "IBM Plex Mono", monospace;\r\n  letter-spacing: 0.425px;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-cursor {\r\n\tborder-color: #eff;\r\n\toutline: 0px solid #eff;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-activeline-background {\r\n\tbackground: rgba(240, 240, 255, 0.8);\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-selected {\r\n\tbackground: rgba(55, 55, 77, 0.7);\r\n}\r\n\r\n.cm-s-custom-0 .cm-comment {\r\n\tfont-style: italic;\r\n\tcolor: #676b79;\r\n}\r\n\r\n.cm-s-custom-0 .cm-operator {\r\n\tcolor: #f3f3f3;\r\n}\r\n\r\n.cm-s-custom-0 .cm-string {\r\n\tcolor: #c267f9;\r\n}\r\n\r\n.cm-s-custom-0 .cm-string-2 {\r\n\tcolor: #ffb86c;\r\n}\r\n\r\n.cm-s-custom-0 .cm-tag {\r\n\tcolor: #ff2c6d;\r\n}\r\n\r\n.cm-s-custom-0 .cm-meta {\r\n\tcolor: #b084eb;\r\n}\r\n\r\n.cm-s-custom-0 .cm-number {\r\n\tcolor: #ffb86c;\r\n}\r\n\r\n.cm-s-custom-0 .cm-atom {\r\n\tcolor: #ff2c6d;\r\n}\r\n\r\n.cm-s-custom-0 .cm-keyword {\r\n\tcolor: #b095e4;\r\n}\r\n\r\n.cm-s-custom-0 .cm-variable {\r\n\tcolor: #f73c91;\r\n}\r\n\r\n.cm-s-custom-0 .cm-variable-2 {\r\n\tcolor: #ff9ac1;\r\n}\r\n\r\n.cm-s-custom-0 .cm-variable-3,\r\n.cm-s-custom-0 .cm-type {\r\n\tcolor: #ff9ac1;\r\n}\r\n\r\n.cm-s-custom-0 .cm-def {\r\n\tcolor: #e6e6e6;\r\n}\r\n\r\n.cm-s-custom-0 .cm-property {\r\n\tcolor: #f3f3f3;\r\n}\r\n\r\n.cm-s-custom-0 .cm-unit {\r\n\tcolor: #ffb86c;\r\n}\r\n\r\n.cm-s-custom-0 .cm-attribute {\r\n\tcolor: #d8baea;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-matchingbracket {\r\n\tborder-bottom: 1px dotted #19f9d8;\r\n\tpadding-bottom: 2px;\r\n\tcolor: #e6e6e6;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-gutters {\r\n  background: rgb(19, 19, 37);\r\n  border-right-color: rgb(19, 19, 37);\r\n  width: 40px;\r\n  margin-right: 9px;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-linenumber {\r\n  color: rgb(173, 170, 204);\r\n  opacity: 0.75;\r\n  background: rgb(19, 19, 37);\r\n  padding: 0 10px 0 4px;\r\n  font-size: 14px;\r\n  border-top: 2px solid transparent;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-lines .CodeMirror-code div {\r\n  padding-left: 2px;\r\n}';

const DEFAULT_CSS_VALUE_LIGHT =
  '.cm-s-custom-0 {\r\n\tbackground: #2B354B;\r\n\tcolor: rgb(173, 170, 204);\r\n\tmargin-top:2px;\r\npadding-top: 20px;\r\nfont-size: 15px;\r\n  font-weight: 300;\r\n\tline-height: 1.6;\r\n\tfont-family: "IBM Plex Mono", monospace;\r\n  letter-spacing: 0.425px;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-cursor {\r\n\tborder-color: #eff;\r\n\toutline: 0px solid #eff;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-activeline-background {\r\n\tbackground: rgba(240, 240, 255, 0.8);\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-selected {\r\n\tbackground: #414A5C;\r\n}\r\n\r\n.cm-s-custom-0 .cm-comment {\r\n\tfont-style: italic;\r\n\tcolor: #676b79;\r\n}\r\n\r\n.cm-s-custom-0 .cm-operator {\r\n\tcolor: #f3f3f3;\r\n}\r\n\r\n.cm-s-custom-0 .cm-string {\r\n\tcolor: #c267f9;\r\n}\r\n\r\n.cm-s-custom-0 .cm-string-2 {\r\n\tcolor: #ffb86c;\r\n}\r\n\r\n.cm-s-custom-0 .cm-tag {\r\n\tcolor: #ff2c6d;\r\n}\r\n\r\n.cm-s-custom-0 .cm-meta {\r\n\tcolor: #b084eb;\r\n}\r\n\r\n.cm-s-custom-0 .cm-number {\r\n\tcolor: #ffb86c;\r\n}\r\n\r\n.cm-s-custom-0 .cm-atom {\r\n\tcolor: #ff2c6d;\r\n}\r\n\r\n.cm-s-custom-0 .cm-keyword {\r\n\tcolor: #b095e4;\r\n}\r\n\r\n.cm-s-custom-0 .cm-variable {\r\n\tcolor: #f73c91;\r\n}\r\n\r\n.cm-s-custom-0 .cm-variable-2 {\r\n\tcolor: #ff9ac1;\r\n}\r\n\r\n.cm-s-custom-0 .cm-variable-3,\r\n.cm-s-custom-0 .cm-type {\r\n\tcolor: #ff9ac1;\r\n}\r\n\r\n.cm-s-custom-0 .cm-def {\r\n\tcolor: #e6e6e6;\r\n}\r\n\r\n.cm-s-custom-0 .cm-property {\r\n\tcolor: #f3f3f3;\r\n}\r\n\r\n.cm-s-custom-0 .cm-unit {\r\n\tcolor: #ffb86c;\r\n}\r\n\r\n.cm-s-custom-0 .cm-attribute {\r\n\tcolor: #d8baea;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-matchingbracket {\r\n\tborder-bottom: 1px dotted #19f9d8;\r\n\tpadding-bottom: 2px;\r\n\tcolor: #e6e6e6;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-gutters {\r\n  background: #2B354B;\r\n  border-right-color: #2B354B;\r\n  width: 40px;\r\n  margin-right: 9px;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-linenumber {\r\n  color: rgb(173, 170, 204);\r\n  opacity: 0.75;\r\n  background: #2B354B;\r\n  padding: 0 10px 0 4px;\r\n  font-size: 14px;\r\n  border-top: 2px solid transparent;\r\n}\r\n\r\n.cm-s-custom-0 .CodeMirror-lines .CodeMirror-code div {\r\n  padding-left: 2px;\r\n}';

const code1 =
  '#include <iostream>\n    using namespace std;\n    \n    int main() {\n    \n        cout<<"Welcome! to Shoshin school"<<endl;\n        return 0;\n    }\n            ';
const code2 =
  '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n, t1 = 0, t2 = 1, nextTerm = 0;\n\n    cout << "Enter the number of terms: ";\n    cin >> n;\n\n    cout << "Fibonacci Series: ";\n\n    for (int i = 1; i <= n; ++i) {\n        // Prints the first two terms.\n        if(i == 1) {\n            cout << t1 << ", ";\n            continue;\n        }\n        if(i == 2) {\n            cout << t2 << ", ";\n            continue;\n        }\n        nextTerm = t1 + t2;\n        t1 = t2;\n        t2 = nextTerm;\n        \n        cout << nextTerm << ", ";\n    }\n    return 0;\n}';
const code =
  '#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int r, c, a[100][100], b[100][100], sum[100][100], i, j;\n\n    cout << "Enter number of rows (between 1 and 100): ";\n    cin >> r;\n\n    cout << "Enter number of columns (between 1 and 100): ";\n    cin >> c;\n\n    cout << endl << "Enter elements of 1st matrix: " << endl;\n\n    // Storing elements of first matrix entered by user.\n    for(i = 0; i < r; ++i)\n       for(j = 0; j < c; ++j)\n       {\n           cout << "Enter element a" << i + 1 << j + 1 << " : ";\n           cin >> a[i][j];\n       }\n\n    // Storing elements of second matrix entered by user.\n    cout << endl << "Enter elements of 2nd matrix: " << endl;\n    for(i = 0; i < r; ++i)\n       for(j = 0; j < c; ++j)\n       {\n           cout << "Enter element b" << i + 1 << j + 1 << " : ";\n           cin >> b[i][j];\n       }\n\n    // Adding Two matrices\n    for(i = 0; i < r; ++i)\n        for(j = 0; j < c; ++j)\n            sum[i][j] = a[i][j] + b[i][j];\n\n    // Displaying the resultant sum matrix.\n    cout << endl << "Sum of two matrix is: " << endl;\n    for(i = 0; i < r; ++i)\n        for(j = 0; j < c; ++j)\n        {\n            cout << sum[i][j] << "  ";\n            if(j == c - 1)\n                cout << endl;\n        }\n\n    return 0;\n}';

const DEFAULT_JSX_OPTIONS = {
  theme: 'custom-0',
  autoCloseBrackets: true,
  cursorScrollMargin: 48,
  mode: 'jsx',
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  lineWrapping: true,
  styleActiveLine: true,
  viewportMargin: 99
};

const DEFAULT_CSS_OPTIONS = {
  theme: 'custom-0',
  autoCloseBrackets: true,
  cursorScrollMargin: 48,
  mode: 'css',
  lineNumbers: true,
  lineWrapping: true,
  indentUnit: 2,
  tabSize: 2,
  styleActiveLine: true,
  viewportMargin: 99
};

export class StyledEditor extends React.Component {
  state = {
    jsValue: DEFAULT_JS_VALUE || this.props.jsValue,
    cssValue: DEFAULT_CSS_VALUE_DARK || this.props.cssValue,
    codeValue: code || this.props.codeValue
  };

  jsxOptions = {
    ...DEFAULT_JSX_OPTIONS,
    ...this.props.jsxOptions
  };

  cssOptions = {
    ...DEFAULT_CSS_OPTIONS,
    ...this.props.cssOptions
  };

  onChange = (which) => (editor, data, value) => {
    this.setState({ [`${which}Value`]: value });
  };

  render() {
    console.log('codeValue:', this.state.codeValue);
    return (
      <>
        <SplitPane
          style={{
            position: 'absolute'
          }}
          split="vertical"
          defaultSize="25%"
        >
          <Question dark={this.props.dark} />

          {0 ? (
            <Container sx={{ pt: 2.5 }} maxWidth="xl">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                  <AppTasks />
                </Grid>
              </Grid>
            </Container>
          ) : (
            <PureEditor
              name="js"
              value={this.state.codeValue}
              options={this.jsxOptions}
              onChange={this.onChange('code')}
            />
          )}
        </SplitPane>
        <Style css={this.props.dark ? DEFAULT_CSS_VALUE_DARK : DEFAULT_CSS_VALUE_LIGHT} />
      </>
    );
  }
}

class PureEditor extends React.PureComponent {
  render() {
    console.log(`code -> ${this.props.value}`);
    return (
      <div>
        <CodeMirror
          value={this.props.value}
          options={this.props.options}
          onBeforeChange={this.props.onChange}
          //   options={{
          //     lineWrapping:true,
          // }}
        />
      </div>
    );
  }
}

export const Style = (props) => (
  <style
    dangerouslySetInnerHTML={{
      __html: props.css
    }}
  />
);
