import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom';
// import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/reducers/index';
import { testPushBehavior } from '../test-utils/functions';

const mockStore = getMockStore({});

function mockComponent(props, className) {
  return (
    <div className={className}>
      {props.title}
    </div>
  );
}
jest.mock('../containers/Landing/TestLanding', () => jest.fn((props) => (
  mockComponent(props, 'spyLanding')
)));

jest.mock('../containers/Landing/Login/Login', () => jest.fn((props) => (
  mockComponent(props, 'spyLogin')
)));

jest.mock('../containers/Landing/Signup/Signup', () => jest.fn((props) => (
  mockComponent(props, 'spySignup')
)));
jest.mock('../containers/Dashboard/Dashboard', () => jest.fn((props) => (
  mockComponent(props, 'spyDashboard')
)));
jest.mock('../containers/Landing/DemoWidget/DemoWidget', () => jest.fn((props) => (
  mockComponent(props, 'spyDemowidget')
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
    testPushBehavior('/landing', '.spyLanding', app);
  });
  it('should goto login', () => {
    testPushBehavior('/login', '.spyLogin', app);
  });
  it('should goto signup', () => {
    testPushBehavior('/signup', '.spySignup', app);
  });
  it('should goto dashboard', () => {
    testPushBehavior('/dashboard', '.spyDashboard', app);
  });
  it('should goto demowidget', () => {
    testPushBehavior('/demowidget', '.spyDemowidget', app);
  });
  it('should goto landing at wrong page', () => {
    testPushBehavior('/aaa', '.spyLanding', app);
  });
});


/*
jest.mock('./UploadWidget/UploadWidget', () => jest.fn((props) => (
  <div className="spyUploadWidget">
    {props.title}
  </div>
)));

it('should goto uploadwidget', () => {
  history.push('/uploadwidget');
  const component = mount(app);
  expect(component.find('.spyUploadWidget').length).toBe(1);
});

*/
