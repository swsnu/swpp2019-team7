import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import DemoWidget from './DemoWidget';
import { getMockStore } from '../../../test-utils/mocks';
import * as userActionCreator from '../../../store/actions/userAction';
import { history } from '../../../store/reducers/index';


const mockStore = getMockStore();

describe('DemoWidget', () => {
  let mockDemoWidget;
  beforeEach(() => {
    /*spyResultModal = jest.spyOn(userActionCreator, 'signupUser')
      .mockImplementation(() => ({ type: 'SIGNUP_USER' }));*/
    mockDemoWidget = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <DemoWidget />
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render DemoWidget', () => {
    const component = mount(mockDemoWidget);
    expect(component.find('.DemoWidget').length).toBe(1);
  });
});
