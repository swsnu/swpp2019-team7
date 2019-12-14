import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LoggedInWidget from './LoggedInWidget';
import { getMockStore } from '../../../../test-utils/mocks';

const mockStore = getMockStore();

const history = createBrowserHistory();

describe('<LoggedInWidget />', () => {
  let mockLoggedInWidget;
  beforeEach(() => {
    mockLoggedInWidget = (
      <Provider store={mockStore}>
        <Router history={history}>
          <LoggedInWidget />
        </Router>
      </Provider>
    );
  });
  it('should render LoggedInWidget', () => {
    const component = mount(mockLoggedInWidget);
    expect(component.find('.LoggedInWidget').length).toBe(1);
  });
  xit('should push to addpill correctly', () => {
    const component = mount(mockLoggedInWidget);
    const spyPush = jest.spyOn(history, 'push')
      .mockImplementation(() => { });
    const buttonWrapper = component.find({ id: 'addpill' }).at(1);
    buttonWrapper.simulate('click');
    expect(spyPush).toHaveBeenCalledTimes(1);
    // expect(spyDelete).toHaveBeenCalledTimes(1)
  });
});
