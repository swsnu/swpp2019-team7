import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom';
import App from './App';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/reducers/index';


const mockStore = getMockStore({});

describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
  });

  xit('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });


  xit('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(app, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
