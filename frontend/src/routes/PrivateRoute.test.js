import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { getMockStore, getMockStoreLoggedIn } from '../test-utils/mocks';
import PrivateRoute from './PrivateRoute';

const store = getMockStore();
const storeLoggedIn = getMockStoreLoggedIn();

describe('PrivateRoute', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const Dashboard = () => (<div>mock dashboard</div>);

  it('`PrivateRoute` should not show dashboard page if logged out', () => {
    mount(
      <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
        <PrivateRoute path="/dashboard" component={Dashboard} store={store} />
      </MemoryRouter>,
    );
  });

  it('`PrivateRoute` should show dashboard page if logged in', () => {
    mount(
      <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
        <PrivateRoute path="/dashboard" component={Dashboard} store={storeLoggedIn} />
      </MemoryRouter>,
    );
  });
});
