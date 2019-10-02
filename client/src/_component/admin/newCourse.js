
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CheckboxLabels from "./checkbox";


function NewCourse() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'NewCourse © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}> */}
          {/* <LockOutlinedIcon /> */}
        {/* </Avatar> */}
        <Typography component="h1" variant="h5">
          NewCourse
        </Typography>
        <form className={classes.form} noValidate>
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="course number"
            label="course number"
            name="course number"
            autoComplete="course number"
            autoFocus
          /> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="course name"
            label="course name"
            type="course name"
            id="course name"
            autoComplete="current-course name"
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="teacher name"
            label="teacher name"
            type="teacher name"
            id="teacher name"
            autoComplete="current-teacher name"
          />
           {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="teacher assistance name"
            label="teacher assistance name"
            type="teacher assistance name"
            id="teacher assistance name"
            autoComplete="current-teacher assistance name"
          /> */}
          <div><h3>Course days:</h3></div>
           <CheckboxLabels/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
  
        </form>
      </div>
      <Box mt={8}>
        <NewCourse />
      </Box>
    </Container>
  );
}