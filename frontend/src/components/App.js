import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';

import Login from '../containers/Landing/Login/Login';
import Signup from '../containers/Landing/Signup/Signup';
import Dashboard from '../containers/Dashboard/Dashboard';
import TestLanding from '../containers/Landing/TestLanding';
import DemoWidget from '../containers/Landing/DemoWidget/DemoWidget';
import './App.css';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path="/landing" exact render={() => <TestLanding />} />
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/signup" exact render={() => <Signup />} />
          <Route path="/demowidget" exact render={() => <DemoWidget />} />
          <Route path="/dashboard" exact render={() => <Dashboard />} />
          <Redirect exact from="/" to="/landing" />
          <Route render={() => <TestLanding />} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

const mapStateToProps = (state) => ({
  logged_in: state.user.logged_in,
});

export default connect(mapStateToProps, null)(App);
