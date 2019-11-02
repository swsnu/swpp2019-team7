import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom';
import App from './App';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/reducers/index';

import { MemoryRouter } from 'react-router-dom';


const mockStore = getMockStore({});

describe('App', () => {
  let app;
  let app_instance;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    app_instance = mount(app).find(App).instance()
  });

  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(app, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  /*
  it('renders correct routes', () => {
    app = (
      <MemoryRouter initialEntries={['/login']}>
        <Provider store={mockStore}>
          <App />
        </Provider>
      </MemoryRouter>
    )
    const component = mount(app);
  })
  it('renders correct routes', () => {
    app = (
      <MemoryRouter initialEntries={['/signup']}>
        <App/>
      </MemoryRouter>
    )
    const component = mount(app);
  })

  it('renders correct routes', () => {
    app = (
      <MemoryRouter initialEntries={['/uploadwidget']}>
        <App/>
      </MemoryRouter>
    )
    const component = mount(app);
  })

  it('renders correct routes', () => {
    app = (
      <MemoryRouter initialEntries={['/dashboard']}>
        <App/>
      </MemoryRouter>
    )
    const component = mount(app);
  })
  */
});
