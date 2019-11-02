import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import  './Landing.css'
import Header from '../Header/Header'


class TestLanding extends Component {
    render() {
        return (
            <Header />
        )

    }
}

export default TestLanding