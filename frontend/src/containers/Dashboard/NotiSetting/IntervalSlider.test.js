import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import IntervalSlider from './IntervalSlider';
import { getMockStore } from '../../../test-utils/mocks';

const mockStore = getMockStore();

const history = createBrowserHistory();

describe('<IntervalSlider />', () => {
  let mockIntervalSlider;
  beforeEach(() => {
    mockIntervalSlider = (
      <Provider store={mockStore}>
        <Router history={history}>
          <IntervalSlider />
        </Router>
      </Provider>
    );
  });
  it('should render IntervalSlider', () => {
    const component = mount(mockIntervalSlider);
    expect(component.find('.IntervalSlider').length).toBe(1);
  });
  it('should change interval', () => {
    const component = mount(mockIntervalSlider);
    const wrapperSlider = component.find({ id: 'select-interval-slider' }).at(0);
    wrapperSlider.simulate('change', [1000, 1200, 100, 100]);
  });
});
