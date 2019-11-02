import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom';
// import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/reducers/index';

const mockStore = getMockStore({});

jest.mock('../containers/Landing/Landing', () => jest.fn((props) => (
  <div className="spyLanding">
    {props.title}
  </div>
)));

jest.mock('../containers/Landing/Login/Login', () => jest.fn((props) => (
  <div className="spyLogin">
    {props.title}
  </div>
)));

jest.mock('../containers/Landing/Signup/Signup', () => jest.fn((props) => (
  <div className="spySignup">
    {props.title}
  </div>
)));
jest.mock('../containers/Dashboard/Dashboard', () => jest.fn((props) => (
  <div className="spyDashboard">
    {props.title}
  </div>
)));
jest.mock('./upload/UploadWidget', () => jest.fn((props) => (
  <div className="spyUploadWidget">
    {props.title}
  </div>
)));

describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
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

  it('should goto landing', () => {
    history.push('/landing');
    const component = mount(app);
    expect(component.find('.spyLanding').length).toBe(1);
  });

  it('should goto landing', () => {
    history.push('/landing');
    const component = mount(app);
    expect(component.find('.spyLanding').length).toBe(1);
  });
  it('should goto login', () => {
    history.push('/login');
    const component = mount(app);
    expect(component.find('.spyLogin').length).toBe(1);
  });
  it('should goto signup', () => {
    history.push('/signup');
    const component = mount(app);
    expect(component.find('.spySignup').length).toBe(1);
  });
  it('should goto uploadwidget', () => {
    history.push('/uploadwidget');
    const component = mount(app);
    expect(component.find('.spyUploadWidget').length).toBe(1);
  });
  it('should goto dashboard', () => {
    history.push('/dashboard');
    const component = mount(app);
    expect(component.find('.spyDashboard').length).toBe(1);
  });
  it('should goto landing at wrong page', () => {
    history.push('/aaa');
    const component = mount(app);
    expect(component.find('.spyLanding').length).toBe(1);
  });
});
