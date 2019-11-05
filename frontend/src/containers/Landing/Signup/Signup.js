
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
      email_error: false,
      pw_error: false,
      pw_confirm_error: false,
      username_error: false,
    };
  }

  credentialChecker = (e) => {
    e.preventDefault();
    console.log('email: ', this.state.email_input);
    console.log('pw: ', this.state.pw_input);
    var email_reg = /^[^@\s]+@[^@\.\s]+\.[a-z]{2,3}$/;
    var password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    var username_reg = /^[A-Z][a-z]+$/;
    var email_error=false;
    var password_error=false;
    var password_confirm_error=false;
    var username_error = false;
    if(!email_reg.test(this.state.email_input)){
      email_error = true
      this.setState({
        email_error: email_error,
      })
    }
    else{
      email_error = false
      this.setState({
        email_error: email_error,
      })
    }
    if(!password_reg.test(this.state.pw_input)){
      password_error = true;
      this.setState({
        pw_error: password_error,
      })
    }
    else{
      password_error = false
      this.setState({
        pw_error: password_error,
      })
    }
    if(this.state.pw_input !== this.state.pw_confirm_input){
      password_confirm_error = true;
      this.setState({
        pw_confirm_error: password_confirm_error,
      })
    }
    else{
      password_confirm_error = false
      this.setState({
        pw_confirm_error: password_confirm_error,
      })
    }
    if(!username_reg.test(this.state.username_input)){
      username_error = true;
      this.setState({
        username_error: username_error,
      })
    }
    else{
      username_error = false
      this.setState({
        username_error: username_error,
      })
    }
    return (!email_error) && (!password_error) && (!password_confirm_error)
  };

  onSignupButtonClick = (event) => {
    var correct_form = this.credentialChecker(event);
    if (correct_form === true) {
      const user = {
        email: this.state.email_input,
        password: this.state.pw_input,
        name: this.state.username_input,
      };
      console.log('Signing this user up!')
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
                    error = {this.state.username_error}
                    helperText={this.state.username_error ? "Start with a capital letter, followed by one or more lowercase letters. Should only contain alphabets (A-Z, a-z)": false}
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
                    error = {this.state.email_error}
                    helperText={this.state.email_error ? "Should be in the format of 'characters@characters.domain'. No spaces should be included" : false}
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
                    error = {this.state.pw_error}
                    helperText={this.state.pw_error? "Must contain at least one number and one uppercase and one lowercase letter, and at least 6 or more characters." : false}
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
                    error = {this.state.pw_confirm_error}
                    helperText={this.state.pw_confirm_error? "Must match password." : false}
                    variant="outlined"
                    required
                    fullWidth
                    name="password-confirmation"
                    label="Password Confirmation"
                    type="password"
                    id="password"
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
