// import {getMockStoreArticleCreate} from '../../mocks'
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
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
import { getMockStore } from '../../test-utils/mocks';

const mockStore = getMockStore();

let dashboard;
const history = createBrowserHistory();

describe('<Dashboard />', () => {
  beforeEach(() => {
    dashboard = (
      <Provider store={mockStore}>
        <Router history={history}>
          <Dashboard history={history} title="TODOLIST_TEST_TITLE" />
        </Router>
      </Provider>
    );
  });
  it('should render account setting', () => {
    const component = mount(dashboard);
    const buttonOne = component.find({ id: 'MyPills' }).at(1);
    buttonOne.simulate('click');
    const buttonTwo = component.find({ id: 'NotificationSettings' }).at(1);
    buttonTwo.simulate('click');
    const buttonThree = component.find({ id: 'AccountSettings' }).at(1);
    buttonThree.simulate('click');
  });
});
