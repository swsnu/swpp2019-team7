import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Landing extends Component {
  clickLoginHandler = () => {
    this.props.history.push('/login');
  };

  clickSignupHandler = () => {
    this.props.history.push('/signup');
  };

  render() {
    return (
      <div className="Login">
        <h1> PillBox - Manage Your Pills With Ease </h1>
        <button id="login-button" type="submit" onClick={() => this.clickLoginHandler()}>Log in</button>
        <button id="signup-button" type="submit" onClick={() => this.clickSignupHandler()}>Sign in</button>
      </div>
    );
  }
}

export default withRouter(Landing);
