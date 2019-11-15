import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../components/Firebase';
import * as userActionCreators from '../../store/actions/userAction';

const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});


class Header extends Component {
  clickLoginHandler = () => {
    this.props.history.push('/login');
  };

  clickSignupHandler = () => {
    this.props.history.push('/signup');
  };

  clickRedirectToLanding = () => {
    this.props.history.push('/landing');
  };

  clickRedirectToDashboard = () => {
    this.props.history.push('/dashboard');
  };

  onSignOutButtonClick = () => {
    this.props.onDeleteToken(this.props.firebase.token);
    this.props.onSignout();
  };

  render() {
    const { classes } = this.props;
    const loggedInnStatus = JSON.parse(localStorage.getItem('loggedInnStatus'));
    if (!loggedInnStatus || loggedInnStatus.logged_in === false) {
      return (
        <div className={classes.root}>
          <AppBar position="static" className={classes.appBar} style={{ background: 'white', boxShadow: 'black' }}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                onClick={() => this.clickRedirectToLanding()}
                aria-label="menu"
              >
                <Typography variant="h6" className={classes.title} style={{ color: 'black' }}>
                  PillBox
                </Typography>
              </IconButton>
              <Typography variant="h6" className={classes.title} style={{ color: 'black' }} />
              <Button id="login-button" color="inherit" style={{ color: 'black' }} onClick={() => this.clickLoginHandler()}>Log in</Button>
              <Button id="signup-button" color="inherit" style={{ color: 'black' }} onClick={() => this.clickSignupHandler()}>Sign Up</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
    }

    return (
      <AppBar position="fixed" className={classes.appBar} style={{ background: 'white', boxShadow: 'black' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={() => this.clickRedirectToDashboard()}
            aria-label="menu"
          >
            <Typography variant="h6" className={classes.title} style={{ color: 'black' }}>
                  PillBox
            </Typography>
          </IconButton>
          <Typography variant="h6" className={classes.title} style={{ color: 'black' }} />
          <Button
            id="signout-button"
            color="inherit"
            style={{ color: 'black' }}
            onClick={() => this.onSignOutButtonClick()}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  logged_in: state.user.logged_in,
});

const mapDispatchToProps = (dispatch) => ({
  onSignout: () => { dispatch(userActionCreators.signoutUser()); },
  onDeleteToken: (FCMToken) => { dispatch(userActionCreators.deleteUserDevice({ data: { fcmtoken: FCMToken } })); },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter((withStyles(styles)(withFirebase(Header)))));
