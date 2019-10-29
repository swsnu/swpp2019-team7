import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class Signup extends Component {

  state = {
      email_input: '',
      pw_input: '',
      username_input: '',
  }

  credentialChecker = () => {

  }


  render () {
      return (
        <div className="Signup">
            <h1>PillBox - Manage Your Pills With Ease</h1>
            <h2>Login</h2>
            <input type="input" id='email-input' value={this.state.email_input}
                    onChange={(event) => this.setState({email_input: event.target.value })} />
            <input type="password" id='pw-input' value={this.state.pw_input}
                    onChange={(event) => this.setState({pw_input: event.target.value })} />
            <input type="username" id='username-input' value={this.state.username_input}
                    onChange={(event) => this.setState({username_input: event.target.value })} />
            <button id='signup-button' onClick={() => this.credentialChecker()}>Sign up</button>    
        </div>
      )
  }
}

export default Signup