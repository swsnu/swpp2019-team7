import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import DemoWidget from './DemoWidget';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/reducers/index';


const mockStore = getMockStore();

describe('DemoWidget', () => {
  let mockDemoWidget;
  let spyPush;
  beforeEach(() => {
    spyPush = jest.spyOn(history, 'push')
      .mockImplementation(() => { });
    /* spyResultModal = jest.spyOn(userActionCreator, 'signupUser')
      .mockImplementation(() => ({ type: 'SIGNUP_USER' })); */
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

  xit('should click green button', () => {
    const component = mount(mockDemoWidget);
    const buttonWrapper = component.find({ id: 'loginGreen' }).at(1);
    buttonWrapper.simulate('click');
    expect(spyPush).toHaveBeenCalledTimes(1);
  });

  xit('should click red button', () => {
    const component = mount(mockDemoWidget);
    const wrappedcomp = component.find(DemoWidget.WrappedComponent).instance();
    expect(wrappedcomp.state.resultModalOpen).toEqual(false);
    wrappedcomp.setState({ resultModalOpen: true });
    wrappedcomp.setState({ productInfo: { productName: 'hello' } });
    expect(wrappedcomp.state.resultModalOpen).toEqual(true);
    expect(wrappedcomp.state.productInfo.productName).toEqual('hello');
    const modalWrapper = component.find({ id: 'Modal' });
    expect(modalWrapper.length).toBe(1);
    expect(modalWrapper.open).toBe(true);
    expect(component.find({ id: 'actiontwo' }).length).toBe(1);
    const buttonWrapper = component.find({ id: 'productRed' }).at(1);
    buttonWrapper.simulate('click');
    expect(wrappedcomp.find({ id: 'modal' }).length).toBe(0);
  });
});


/*
it('should click redirect-landing', () => {
  const spyLanding = jest.spyOn(history, 'push')
    .mockImplementation(() => { });
  const component = mount(mockHeader);
  const buttonWrapper = component.find({ id: 'redirect-landing' }).at(1);
  buttonWrapper.simulate('click');
  expect(spyLanding).toHaveBeenCalledTimes(1);

// import {getMockStoreArticleCreate} from '../../mocks'
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
//
// import ArticleCreate from "./ArticleCreate";
// import {history} from '../../mockStore';
// import * as actionCreators from '../../actions'
// import WriteTab from "./WriteTab";
// import {ax} from '../../actions'
// import axios from 'axios';
import Header from './Header';
import { getMockStore } from '../../test-utils/mocks';

const mockStore = getMockStore();

describe('<Header />', () => {
  let mockHeader;
  let history;
  beforeEach(() => {
    history = createBrowserHistory();
    mockHeader = (
      <Provider store={mockStore}>
        <Router history={history}>
          <Header title="TODOLIST_TEST_TITLE" localStorage="loggedInnStatus:true" />
        </Router>
      </Provider>
    );
  });
  it('should render logged out Header', () => {
    const component = mount(mockHeader);
    expect(component.find('.Component-root-1').length).toBe(1);
  });
  it('should click redirect-landing', () => {
    const spyLanding = jest.spyOn(history, 'push')
      .mockImplementation(() => { });
    const component = mount(mockHeader);
    const buttonWrapper = component.find({ id: 'redirect-landing' }).at(1);
    buttonWrapper.simulate('click');
    expect(spyLanding).toHaveBeenCalledTimes(1);
  });
  it('should click login', () => {
    const spyLanding = jest.spyOn(history, 'push')
      .mockImplementation(() => { });
    const component = mount(mockHeader);
    const buttonWrapper = component.find({ id: 'login-button' }).at(1);
    buttonWrapper.simulate('click');
    expect(spyLanding).toHaveBeenCalledTimes(1);
  });
  it('should click signup', () => {
    const spyLanding = jest.spyOn(history, 'push')
      .mockImplementation(() => { });
    const component = mount(mockHeader);
    const buttonWrapper = component.find({ id: 'signup-button' }).at(1);
    buttonWrapper.simulate('click');
    expect(spyLanding).toHaveBeenCalledTimes(1);
  });
});
/*

it('should render Login', () => {
    const component = m// import {getMockStoreArticleCreate} from '../../mocks'
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
//
// import ArticleCreate from "./ArticleCreate";
// import {history} from '../../mockStore';
// import * as actionCreators from '../../actions'
// import WriteTab from "./WriteTab";
// import {ax} from '../../actions'
// import axios from 'axios';
import Header from './Header';
import { getMockStore } from '../../test-utils/mocks';

const mockStore = getMockStore();

describe('<Header />', () => {
  let mockHeader
  let history
  beforeEach(() => {

  history = createBrowserHistory();
    mockHeader = (
      <Provider store={mockStore}>
        <Router history={history}>
          <Header title="TODOLIST_TEST_TITLE" localStorage={'loggedInnStatus:true'}/>
        </Router>
      </Provider>
    );
  });
  it('should render logged out Header', () => {
    const component = mount(mockHeader);
    expect(component.find('.Component-root-1').length).toBe(1);
    expect(localStorage.getItem).toBeCalledWith('loggedInnStatus')
  });
  it('should click redirect-landing', () => {
    const spyLanding = jest.spyOn(history, 'push')
      .mockImplementation(() => { })
    const component = mount(mockHeader);
    const buttonWrapper = component.find({ id: 'redirect-landing' }).at(1)
    buttonWrapper.simulate('click');
    expect(spyLanding).toHaveBeenCalledTimes(1);
  })
  it('should click login', () => {
    const spyLanding = jest.spyOn(history, 'push')
      .mockImplementation(() => { })
    const component = mount(mockHeader);
    const buttonWrapper = component.find({ id: 'login-button' }).at(1)
    buttonWrapper.simulate('click');
    expect(spyLanding).toHaveBeenCalledTimes(1);
  })
  it('should click signup', () => {
    const spyLanding = jest.spyOn(history, 'push')
      .mockImplementation(() => { })
    const component = mount(mockHeader);
    const buttonWrapper = component.find({ id: 'signup-button' }).at(1)
    buttonWrapper.simulate('click');
    expect(spyLanding).toHaveBeenCalledTimes(1);
  })
});
/*

it('should render Login', () => {
    const component = mount(mockLogin);
    expect(component.find('.Login').length).toBe(1);
  });
  it('should accept login', () => {
    const dispatch = jest.fn();
    const component = mount(mockLogin);
    const wrapperEmail = component.find({ id: 'email' }).at(1);
    const wrapperPW = component.find({ id: 'password' }).at(1);
    // const wrapperButton = component.find({ id: 'login-button' }).at(1);

    wrapperEmail.props().onChange({ target: { value: 'swpp@snu.ac.kr' } });
    wrapperPW.props().onChange({ target: { value: 'password' } });
    // wrapperButton.simulate('click');


    const wrapperButton = component.find({ id: 'login-button' }).find('button').at(1);
    wrapperButton.simulate('click');

    mapDispatchToProps(dispatch).onLoginUser();
    mapDispatchToProps(dispatch).onRegisterToken();

    expect(spyAcceptLogin).toHaveBeenCalledTimes(1);
    expect(spyRegisterDevice).toHaveBeenCalledTimes(1);
  });
});
*/
