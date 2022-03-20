import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
// import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Box, Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'absolute',

    // transform: 'translate(50%, 50%)',
    // minWidth: 275,
    maxwidth: '50em',
    width: 'auto',
    // height: "20em",
    // backgroundColor: "#dae6e8"
    padding: '1em'
  },
  card: {
    // minWidth: 275,
    width: '50em',
    // height: "15em",
    // textAlign: 'center',
    opacity: '0.9',
    backgroundColor: '#dae6e8'
  },
  formControl: {
    margin: theme.spacing(3, 0)
  },
  button: {
    margin: theme.spacing(2, 0, 0, 70),
    color: '#03a9f4',
    borderColor: '#03a9f4'
  },
  title: {
    fontSize: 12,
    color: '#03a9f4'
  },
  question: {
    fontSize: 18,
    color: '#024252',
    margin: theme.spacing(3, 0, 4, 0)
  },
  box1: {
    margin: theme.spacing(0, -6.8, -0.1, -2),
    padding: theme.spacing(1, 1, 1, 5),
    borderColor: '#9eb5b1'
  }
  // form:{
  //   marginLeft: -40,
  // },
}));

export default function ErrorRadios() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const codeString =
    '#include<bits\\stdc++> \r\nusing namespace std;\r\nint main() {\r\n  int x = 5;\r\n  cout<<x;\r\n}';

  // 'import React from \'react\'; \r\n const names = [\'James\', \'John\', \'Paul\', \'Ringo\', \'George\']; \r\n function App() { \r\n return ( \r\n <div> \r\n { names.filter( \r\n name => name.includes(\'J\')) \r\n.map(filteredName => ( \r\n <li> {filteredName} </li> \r\n ))} \r\n </div> \r\n); \r\n} \r\nexport default App;';

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === 'best') {
      setHelperText('You got it!');
      setError(false);
    } else if (value === 'worst') {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ paddingTop: '5rem' }}
    >
      <Card className={classes.card} variant="outlined" m={1}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            Quiz Question
          </Typography>

          <Typography className={classes.question} variant="body2" component="p">
            Which of the following choices does the same thing as .filter function ?
          </Typography>

          <SyntaxHighlighter language="javascript">{codeString}</SyntaxHighlighter>

          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={error} className={classes.formControl}>
              <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                {/* <Divider/> */}

                <Box
                  className={classes.box1}
                  component="span"
                  borderTop={1}
                  borderBottom={1}
                  display="block"
                  style={{ border: '1' }}
                >
                  <FormControlLabel
                    value="best"
                    control={<Radio />}
                    label="The best to loop over elements "
                  />
                </Box>

                {/* <Divider/> */}

                <Box
                  className={classes.box1}
                  component="span"
                  borderTop={1}
                  borderBottom={1}
                  display="block"
                >
                  <FormControlLabel
                    value="worst"
                    control={<Radio />}
                    label="The worst way to filter out the elements "
                  />
                </Box>
              </RadioGroup>

              <FormHelperText>{helperText}</FormHelperText>
              <Button type="submit" variant="outlined" className={classes.button}>
                Check Answer
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
