import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Dashboard from './Dashboard';
import { getMockStore } from '../../test-utils/mocks';
// import * as dashAction from '../../store/actions/dashboardAction';

const mockStore = getMockStore();
let dashboard;
const history = createBrowserHistory();
describe('<Dashboard />', () => {
  // let mockChangeDashboard;
  beforeEach(() => {
    // mockChangeDashboard = jest.spyOn(dashAction, 'changeDashboard')
    // .mockImplementation((number) => ({ type: 'CHANGE_DASHBOARD', itemNo: number }));
    dashboard = (
      <Provider store={mockStore}>
        <Router history={history}>
          <Dashboard history={history} title="TODOLIST_TEST_TITLE" />
        </Router>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render various settings', () => {
    const component = mount(dashboard);
    const buttonOne = component.find({ id: 'My Pills' }).at(1);
    buttonOne.simulate('click');
    expect(component.find('MyPills').length).toBe(1);

    const buttonTwo = component.find({ id: 'Notification Settings' }).at(1);
    buttonTwo.simulate('click');
    // expect(component.find('NotiSetting').length).toBe(1);

    const buttonThree = component.find({ id: 'Telegram Settings' }).at(1);
    buttonThree.simulate('click');
    // expect(component.find('TelegramSetting').length).toBe(1);

    const buttonFour = component.find({ id: 'Account Settings' }).at(1);
    buttonFour.simulate('click');
    // expect(component.find('AccountSetting').length).toBe(1);
  });
});
