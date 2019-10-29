import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class Login extends Component {

    state = {
        email_input: '',
        pw_input: '',
    }

    credentialChecker = () => {

    }


    render () {
        return (
            <div className="Login">
                <h1>PillBox - Manage Your Pills With Ease</h1>
                <h2>Login</h2>
                <h3>Email</h3>
                <input type="input" id='email-input' value={this.state.email_input}
                        onChange={(event) => this.setState({email_input: event.target.value })}></input>

                <h3>Password</h3>
                <input type="password" id='pw-input' value={this.state.pw_input}
                        onChange={(event) => this.setState({pw_input: event.target.value })}></input>
                <button id='login-button' onClick={() => this.credentialChecker()}>Log in</button>
                
            </div>
        )
    }
}

export default Login