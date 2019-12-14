import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import IntervalSetting from './IntervalSetting';
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore();

const history = createBrowserHistory();

describe('<IntervalSetting />', () => {
  let mockIntervalSetting;
  beforeEach(() => {
    mockIntervalSetting = (
      <Provider store={mockStore}>
        <Router history={history}>
          <IntervalSetting />
        </Router>
      </Provider>
    );
  });
  it('should render IntervalSetting', () => {
    const component = mount(mockIntervalSetting);
    expect(component.find({ id: 'interval-time-select' }).length).toBe(2);
  });
});
