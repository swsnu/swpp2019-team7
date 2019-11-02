// import {getMockStoreArticleCreate} from '../../mocks'
import React from 'react';
import { mount } from 'enzyme';
// import { Provider } from "react-redux";
// import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
//
// import ArticleCreate from "./ArticleCreate";
// import {history} from '../../mockStore';
// import * as actionCreators from '../../actions'
// import WriteTab from "./WriteTab";
// import {ax} from '../../actions'
// import axios from 'axios';
import Dashboard from './Dashboard';

let dashboard;


describe('<Dashboard />', () => {
  beforeEach(() => {
    dashboard = (
      <Route path="/dashboard" exact render={() => <Dashboard title="TODOLIST_TEST_TITLE" />} />
    );
  });
  it('should render account setting', () => { mount(dashboard); });
});
