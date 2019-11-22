import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MyPills from './MyPills';
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore();

const history = createBrowserHistory();

describe('<MyPills />', () => {
  let mockMyPills;
  beforeEach(() => {
    mockMyPills = (
      <Provider store={mockStore}>
        <Router history={history}>
          <MyPills id={1} />
        </Router>
      </Provider>
    );
  });
  it('should render account setting', () => {
    const component = mount(mockMyPills);
    expect(component.find('.MyPills').length).toBe(1);
  });
  it('should delete correctly', () => {
    const component = mount(mockMyPills);
    const spyPush = jest.spyOn(history, 'push')
      .mockImplementation(() => { });
    const buttonWrapper = component.find({ id: 'addpill' }).at(1);
    buttonWrapper.simulate('click');
    expect(spyPush).toHaveBeenCalledTimes(1);
    // expect(spyDelete).toHaveBeenCalledTimes(1)
  });
});
