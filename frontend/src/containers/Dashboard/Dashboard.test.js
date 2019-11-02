// import {getMockStoreArticleCreate} from '../../mocks'
import React from 'react';
import { mount } from 'enzyme';
// import { ConnectedRouter } from 'connected-react-router';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
//
// import ArticleCreate from "./ArticleCreate";
// import {history} from '../../mockStore';
// import * as actionCreators from '../../actions'
// import WriteTab from "./WriteTab";
// import {ax} from '../../actions'
// import axios from 'axios';
import Dashboard from './Dashboard';

let dashboard;
const history = createBrowserHistory();

describe('<Dashboard />', () => {
  beforeEach(() => {
    dashboard = (
      <Router history={history}>
        <Dashboard history={history} title="TODOLIST_TEST_TITLE" />
      </Router>
    );
  });
  it('should render account setting', () => { mount(dashboard); });
});
