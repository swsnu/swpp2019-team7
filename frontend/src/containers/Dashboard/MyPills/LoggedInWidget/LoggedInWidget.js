import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';

import DemoWidget from '../../../Landing/DemoWidget/DemoWidget';
import Header from '../../../Header/Header';


const styles = (theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
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

// eslint-disable-next-line react/prefer-stateless-function
class LoggedInWidget extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="LoggedInWidget">
        <Header />
        <Container component="main" maxWidth="sm">
          <div className={classes.paper}>
            <DemoWidget backgroundColor="rgb(32,32,32)" />
          </div>
        </Container>
      </div>
    );
  }
}

export default (withStyles(styles)(LoggedInWidget));
