import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Landing from "../containers/Landing/Landing";
import Login from "../containers/Landing/Login/Login";
import Signup from "../containers/Landing/Signup/Signup";
import Dashboard from "../containers/Dashboard/Dashboard";
import UploadWidget from "./upload/UploadWidget";
import TestLanding from "../containers/Landing/TestLanding"
import './App.css';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path='/testlanding' exact render={() => <TestLanding />} />
          <Route path='/landing' exact render={() => <Landing />} />
          <Route path='/login' exact render={() => <Login/>} />
          <Route path='/signup' exact render={() => <Signup />} />
          <Route path='/uploadwidget' exact render={() => <UploadWidget />} />
          <Route path='/dashboard' exact render={() => <Dashboard />} />
          <Redirect exact from='/' to='/landing' />
          <Route render={() =><Landing />} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;