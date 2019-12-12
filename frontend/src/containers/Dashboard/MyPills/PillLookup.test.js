import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PillLookup from './PillLookup';
import { getMockStore } from '../../../test-utils/mocks';
// import * as pillActionCreator from '../../../store/actions/pillAction';

const mockStore = getMockStore();

const history = createBrowserHistory();

describe('<PillLookup />', () => {
  let mockPillLookup;
  beforeEach(() => {
    mockPillLookup = (
      <Provider store={mockStore}>
        <Router history={history}>
          <PillLookup />
        </Router>
      </Provider>
    );
  });
  it('should render account setting', () => {
    const component = mount(mockPillLookup);
    expect(component.find('.PillLookup').length).toBe(1);
  });
});
