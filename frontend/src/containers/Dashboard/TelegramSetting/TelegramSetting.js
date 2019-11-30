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

import ax from '../../../api/index';


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


class TelegramSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      telegram_first_name_input: '',
      telegram_last_name_input: '',
      telegram_username_input: '',
      telegramFirstNameError: false,
      telegramLastNameError: false,
      telegramUsernameError: false,
    };
  }

  registerTelegramAccount = (telegramUser) => {
    ax.post('api/register-telegram/', telegramUser).then((res) => {
      console.log(res.data.auth_key);
      // TODO show the auth_key such that user can type this in telegram
    });
  };

  credentialCheckHelper = (name) => {
    const telegramReg = /^([A-za-z0-9])+$/;
    console.log('NAME:', name);
    console.log(telegramReg.test(name));
    return name.length !== 0 && telegramReg.test(name);
  };

  credentialCheck = () => {
    const usernameError = !this.credentialCheckHelper(this.state.telegram_username_input);
    const firstNameError = !this.credentialCheckHelper(this.state.telegram_first_name_input);
    const lastNameError = !this.credentialCheckHelper(this.state.telegram_last_name_input);

    const result = !(usernameError || firstNameError || lastNameError);

    this.setState((prevState) => ({
      ...prevState,
      telegramUsernameError: usernameError,
      telegramFirstNameError: firstNameError,
      telegramLastNameError: lastNameError,
    }));

    return result;
  };

  onEditButtonClick = (event) => {
    event.preventDefault();
    const correct = this.credentialCheck();

    if (correct) {
      const telegramUser = {
        telegram_first_name: this.state.telegram_first_name_input,
        telegram_last_name: this.state.telegram_last_name_input,
        telegram_username: this.state.telegram_username_input,
      };
      console.log('Change user to ! %O', telegramUser);
      this.registerTelegramAccount(telegramUser);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="telegram-setting">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>

            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5" align="center">
                    Change Telegram Account
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={this.state.telegramFirstNameError}
                    helperText={this.state.telegramFirstNameError ? 'Please check your first name again.' : false}
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
                    helperText={this.state.telegramLastNameError ? 'Please check your last name again.' : false}
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
                    helperText={this.state.telegramUsernameError ? 'Please check your username again.' : false}
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
                id="submit-button"
                className={classes.submit}
                onClick={(event) => {
                  this.onEditButtonClick(event);
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

export default connect(null)(withStyles(styles)(TelegramSetting));
