import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PillDetail from './PillDetail';
import { getMockStore } from '../../../../test-utils/mocks';

const mockStore = getMockStore();

const history = createBrowserHistory();

describe('<MyPills />', () => {
  let mockPillDetail;
  beforeEach(() => {
    mockPillDetail = (
      <Provider store={mockStore}>
        <Router history={history}>
          <PillDetail />
        </Router>
      </Provider>
    );
  });
  it('should render account setting', () => {
    const component = mount(mockPillDetail);
    expect(component.find('.PillDetail').length).toBe(1);
  });
});
