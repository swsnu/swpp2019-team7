import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
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

  it('should render various settings', () => {
    const component = mount(dashboard);
    const buttonOne = component.find({ id: 'My Pills' }).at(1);
    buttonOne.simulate('click');
    const buttonTwo = component.find({ id: 'Notification Settings' }).at(1);
    buttonTwo.simulate('click');
    const buttonThree = component.find({ id: 'Account Settings' }).at(1);
    buttonThree.simulate('click');
  });
});
