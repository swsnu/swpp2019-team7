
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import Header from '../../Header/Header';

import * as userActionCreators from '../../../store/actions/userAction';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright ©
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email_input: '',
      pw_input: '',
      pw_confirm_input: '',
      username_input: '',
      emailError: false,
      pw_error: false,
      pw_confirm_error: false,
      usernameError: false,
    };
  }

  credentialChecker = (e) => {
    e.preventDefault();
    console.log('email: ', this.state.email_input);
    console.log('pw: ', this.state.pw_input);
    // const emailReg = /^[^@\s]+@[^@.\s]+\.[a-z]{2,3}$/;
    const emailReg = /^[^@\s]+@[^@.\s]+\.[^@\s]+$/;
    const passwordReg = /^(?=.*[a-z])(?=.*\d).{8,}$/;
    const usernameReg = /^[A-Z][a-z]+$/;
    let emailError = false;
    let passwordError = false;
    let passwordConfirmError = false;
    let usernameError = false;
    if (!emailReg.test(this.state.email_input)) {
      emailError = true;
      this.setState({
        emailError,
      });
    } else {
      emailError = false;
      this.setState({
        emailError,
      });
    }
    if (!passwordReg.test(this.state.pw_input)) {
      passwordError = true;
      this.setState({
        pw_error: passwordError,
      });
    } else {
      passwordError = false;
      this.setState({
        pw_error: passwordError,
      });
    }
    if (this.state.pw_input !== this.state.pw_confirm_input) {
      passwordConfirmError = true;
      this.setState({
        pw_confirm_error: passwordConfirmError,
      });
    } else {
      passwordConfirmError = false;
      this.setState({
        pw_confirm_error: passwordConfirmError,
      });
    }
    if (!usernameReg.test(this.state.username_input)) {
      usernameError = true;
      this.setState({
        usernameError,
      });
    } else {
      usernameError = false;
      this.setState({
        usernameError,
      });
    }
    return (!emailError) && (!passwordError) && (!passwordConfirmError) && (!usernameError);
  };

  onSignupButtonClick = (event) => {
    console.log('Is this clicked?');
    const correctForm = this.credentialChecker(event);
    if (correctForm === true) {
      const user = {
        email: this.state.email_input,
        password: this.state.pw_input,
        name: this.state.username_input,
      };
      console.log('Signing this user up!');
      this.props.onSignupUser(user);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="Signup">
        <Header />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.usernameError}
                    helperText={this.state.usernameError ? 'Start with a capital letter, followed by one or more lowercase letters. Should only contain alphabets (A-Z, a-z)' : false}
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    onChange={(event) => this.setState({ username_input: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.emailError}
                    helperText={this.state.emailError ? 'Please use a valid email address.' : false}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => this.setState({ email_input: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.pw_error}
                    helperText={this.state.pw_error ? 'Must contain at least one number and one lowercase letter, and at least 8 or more characters.' : false}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => this.setState({ pw_input: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.pw_confirm_error}
                    helperText={this.state.pw_confirm_error ? 'Must match password.' : false}
                    variant="outlined"
                    required
                    fullWidth
                    name="password-confirmation"
                    label="Password Confirmation"
                    type="password"
                    id="password-confirmation"
                    autoComplete="current-password"
                    onChange={(event) => this.setState({ pw_confirm_input: event.target.value })}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                id="signup-button"
                className={classes.submit}
                onClick={(event) => {
                  this.onSignupButtonClick(event);
                }}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSignupUser: (user) => { dispatch(userActionCreators.signupUser(user)); },
});

// export default Signup
export default connect(null, mapDispatchToProps)(withStyles(styles)(Signup));
