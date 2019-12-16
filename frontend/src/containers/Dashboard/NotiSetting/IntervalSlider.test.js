import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SimpleTable from './IntervalSlider';
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore();

const history = createBrowserHistory();

describe('<IntervalSlider />', () => {
  let mockIntervalSlider;
  beforeEach(() => {
    mockIntervalSlider = (
      <Provider store={mockStore}>
        <Router history={history}>
          <SimpleTable />
        </Router>
      </Provider>
    );
  });
  it('should render IntervalSlider', () => {
    const component = mount(mockIntervalSlider);
    expect(component.find({ id: 'interval-slider' }).length).toBe(3);
  });
});
