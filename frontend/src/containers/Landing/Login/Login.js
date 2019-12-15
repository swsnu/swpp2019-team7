/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import Header from '../../Header/Header';
import * as userActionCreators from '../../../store/actions/userAction';
import * as pillActionCreators from '../../../store/actions/pillAction';
import { withFirebase } from '../../../components/Firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright ©
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {` ${new Date().getFullYear()}.`}
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email_input: '',
      pw_input: '',
    };
  }

  credentialChecker = (e) => {
    e.preventDefault();
  };

  handlerSignup = () => {
    this.props.history.push('/signup');
  };

  onLoginButtonClick = async () => {
    const user = { email: this.state.email_input, password: this.state.pw_input };
    this.setState({
      email_input: '',
      pw_input: '',
    });
    this.props.onLoginUser(user).then(() => {
      if (this.props.newPillId > 0) {
        this.props.onAddLazyPill(this.props.newPillId, this.props.imageId);
      }
      this.props.firebase.getToken().then((token) => {
        this.props.onRegisterToken(token);
      })

    });

    //
    // this.props.firebase.getToken().then((token) => {
    //   console.log('token from firebase is');
    //   console.log(token);
    //   this.props.onLoginUser(user).then(() => {
    //     if (this.props.newPillId > 0) this.props.onAddLazyPill(this.props.newPillId, this.props.imageId);
    //     this.props.onRegisterToken(token);
    //   });
    // });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="Login">
        <Header />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email_input}
                onChange={(event) => { this.setState({ email_input: event.target.value }); }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.pw_input}
                onChange={(event) => this.setState({ pw_input: event.target.value })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                id="login-button"
                onClick={(event) => { this.credentialChecker(event); this.onLoginButtonClick(); }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" onClick={() => this.handlerSignup()}>
                    Don&apos;t have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  onLoginUser: async (user) => { await dispatch(userActionCreators.signinUser(user)); },
  onRegisterToken: (FCMToken) => { dispatch(userActionCreators.registerUserDevice({ fcmtoken: FCMToken })); },
  onAddLazyPill: (newPillId, imageId) => { dispatch(pillActionCreators.addLazyPill(newPillId, imageId)); },
});

const mapStateToProps = (state) => ({
  newPillId: state.pill.new_pill_id,
  imageId: state.pill.image_id,
});
export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(withFirebase(Login))));
