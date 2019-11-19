
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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


class SignupAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pw_input: '',
      pw_confirm_input: '',
      username_input: '',
      telegram_first_name_input: '',
      telegram_last_name_input: '',
      telegram_username_input: '',
      pw_error: false,
      pw_confirm_error: false,
      usernameError: false,
      telegramFirstNameError: false,
      telegramLastNameError: false,
      telegramUsernameError: false,
    };
  }

  credentialChecker = (e) => {
    e.preventDefault();
    const usernameReg = /^[A-Z][a-z]+$/;
    const telegramReg = /^([A-za-z0-9])+$/;
    // const emailReg = /^[^@\s]+@[^@.\s]+\.[a-z]{2,3}$/;
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    let passwordError = false;
    let passwordConfirmError = false;
    let usernameError = false;
    let telegramError = false;
    let telegramUsernameError = false;
    let telegramFirstNameError = false;
    let telegramLastNameError = false;
    if (this.state.pw_input !== '') {
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
    }
    if (this.state.username_input !== '') {
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
    }
    if (this.state.telegram_first_name_input !== '') {
      console.log(`first name is ${this.state.telegram_first_name_input}.`);
    }
    if (this.state.telegram_last_name_input !== '') {
      console.log(`last name is ${this.state.telegram_last_name_input}.`);
    }

    if (this.state.telegram_username_input !== '') {
      console.log(`user name is ${this.state.telegram_username_input}.`);
    }


    if (this.state.telegram_first_name_input !== ''
       || this.state.telegram_last_name_input !== ''
       || this.state.telegram_username_input !== ''
    ) {
      if (this.state.telegram_first_name_input === ''
      || !telegramReg.test(this.state.telegram_first_name_input)) {
        telegramFirstNameError = true;
        telegramError = true;
        this.setState({
          telegramFirstNameError,
        });
      } else {
        telegramFirstNameError = false;
        this.setState({
          telegramFirstNameError,
        });
      }
      if (this.state.telegram_last_name_input === ''
      || !telegramReg.test(this.state.telegram_last_name_input)) {
        telegramLastNameError = true;
        telegramError = true;
        this.setState({
          telegramLastNameError,
        });
      } else {
        telegramLastNameError = false;
        this.setState({
          telegramLastNameError,
        });
      }
      if (this.state.telegram_username_input === ''
      || !telegramReg.test(this.state.telegram_username_input)) {
        telegramUsernameError = true;
        telegramError = true;
        this.setState({
          telegramUsernameError,
        });
      } else {
        telegramUsernameError = false;
        this.setState({
          telegramUsernameError,
        });
      }
    }
    return (!passwordError) && (!passwordConfirmError) && (!usernameError) && (!telegramError);
  };

  onEditInfoButtonClick = (event) => {
    const correctForm = this.credentialChecker(event);
    if (correctForm === true) {
      const user = {
        password: this.state.pw_input,
        name: this.state.username_input,
        telegram_first_name: this.state.telegram_first_name_input,
        telegram_last_name: this.state.telegram_last_name_input,
        telegram_username: this.state.telegram_username_input,
      };
      console.log('Change user to ! %O', user);
      this.props.onEditUserInfo(user);
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
            <Typography component="h1" variant="h5">
              Change Account Settings
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
                <Grid item xx={12}>
                  <Typography component="h1" variant="h5">
                    Change Telegram Account
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.telegramFirstNameError}
                    helperText={this.state.telegramFirstNameError ? 'Must match Telegram Id.' : false}
                    variant="outlined"
                    required
                    fullWidth
                    name="telegram_first_name"
                    label="telegram_first_name"
                    id="telegram_first_name"
                    onChange={(event) => this.setState({ telegram_first_name_input: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.telegramLastNameError}
                    helperText={this.state.telegramLastNameError ? 'Must match Telegram Id.' : false}
                    variant="outlined"
                    required
                    fullWidth
                    name="telegram_last_name"
                    label="telegram_last_name"
                    id="telegram_last_name"
                    onChange={(event) => this.setState({ telegram_last_name_input: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.telegramUsernameError}
                    helperText={this.state.telegramUsernameError ? 'Must match Telegram Id.' : false}
                    variant="outlined"
                    required
                    fullWidth
                    name="telegram_username"
                    label="telegram_username"
                    id="telegram_username"
                    onChange={(event) => this.setState({ telegram_username_input: event.target.value })}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                id="editinfo-button"
                className={classes.submit}
                onClick={(event) => {
                  this.onEditInfoButtonClick(event);
                }}
              >
                Finish Change
              </Button>
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
  onEditUserInfo: (user) => { dispatch(userActionCreators.editUserInfo(user)); },
});

// export default Signup
export default connect(null, mapDispatchToProps)(withStyles(styles)(SignupAccount));
