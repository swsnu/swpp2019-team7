import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom';
// import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/reducers/index';


const mockStore = getMockStore({});

describe('App', () => {
  let app;
  // let appInstance;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    // appInstance = mount(app).find(App).instance();
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
