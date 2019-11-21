import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';

import PublicRoute from '../routes/PublicRoute';
import PrivateRoute from '../routes/PrivateRoute';
import Login from '../containers/Landing/Login/Login';
import Signup from '../containers/Landing/Signup/Signup';
import Dashboard from '../containers/Dashboard/Dashboard';
import TestLanding from '../containers/Landing/TestLanding';
import DemoWidget from '../containers/Landing/DemoWidget/DemoWidget';
import LoggedInWidget from '../containers/Dashboard/MyPills/LoggedInWidget/LoggedInWidget';
import PillDetail from '../containers/Dashboard/MyPills/PillDetail/PillDetail';
import './App.css';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <PublicRoute path="/landing" exact component={TestLanding} />
          <PublicRoute path="/login" exact component={Login} />
          <PublicRoute path="/signup" exact component={Signup} />
          <PublicRoute path="/demowidget" exact component={DemoWidget} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/loggedinwidget" exact component={LoggedInWidget} />
          <PrivateRoute path="/pillDetail" exact component={PillDetail} />
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
