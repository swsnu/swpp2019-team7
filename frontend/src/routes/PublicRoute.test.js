import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { getMockStore, getMockStoreLoggedIn } from '../test-utils/mocks';
import PublicRoute from './PublicRoute';

const store = getMockStore();
const storeLoggedIn = getMockStoreLoggedIn();

describe('PublicRoute', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const Dashboard = () => (<div>mock dashboard</div>);

  it('`PublicRoute` should not show Landing page if logged in', () => {
    mount(
      <MemoryRouter initialEntries={['/dashboard/0']} initialIndex={0}>
        <PublicRoute path="/dashboard/0" component={Dashboard} store={store} />
      </MemoryRouter>,
    );
  });

  it('`PublicRoute` should show Landing page if logged out', () => {
    mount(
      <MemoryRouter initialEntries={['/dashboard/0']} initialIndex={0}>
        <PublicRoute path="/dashboard/0" component={Dashboard} store={storeLoggedIn} />
      </MemoryRouter>,
    );
  });
});
