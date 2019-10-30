import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import  './Landing.css'


class Landing extends Component {
  clickLoginHandler = () => {
    this.props.history.push('/login')
  }
  clickSignupHandler = () => {
    this.props.history.push('/signup')
  }
  render () {
    return (
      <div className="Login">
          {/*<div className="center-container">*/}
              <h1> PillBox - Manage Your Pills With Ease </h1>
              <button id='login-button' onClick={() => this.clickLoginHandler()}>Log in</button>
              <button id='signup-button' onClick={() => this.clickSignupHandler()}>Sign in</button>
          {/*</div>*/}

      </div>
    )
  }
}

export default withRouter(Landing)