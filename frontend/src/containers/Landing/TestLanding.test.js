import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../store/reducers';
import { getMockStore } from '../../test-utils/mocks';

import TestLanding from './TestLanding';

const mockStore = getMockStore();

describe('TestLanding', () => {
  let mockLanding;
  beforeEach(() => {
    mockLanding = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TestLanding />
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should goto login', () => {
    mount(mockLanding);
  });
});
