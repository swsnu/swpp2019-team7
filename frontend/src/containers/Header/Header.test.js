import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './Header';
import { getMockStore } from '../../test-utils/mocks';
// import * as userActionCreator from '../../store/actions/userAction';

const mockStore = getMockStore();
// const mockStoreLoggedIn = getMockStoreLoggedIn();

describe('<Header />', () => {
  let mockHeader;
  let history;
  // let spyOnSignOut;
  // let spyOnGetUser;
  // let mockHeaderWithProps;
  // let onDeleteToken;

  beforeEach(() => {
    history = createBrowserHistory();
    // spyOnSignOut = jest.spyOn(userActionCreator, 'signoutUser')
    //   .mockImplementation(() => ({ type: 'SIGNOUT_USER' }));
    // spyOnGetUser = jest.spyOn(userActionCreator, 'getUserInfo')
    //   .mockImplementation(() => ({ type: 'GET_USERINFO' }));
    mockHeader = (
      <Provider store={mockStore}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>
    );
    // mockHeaderWithProps = (
    //   <Provider store={mockStoreLoggedIn}>
    //     <Router history={history}>
    //       <Header />
    //     </Router>
    //   </Provider>
    // );
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
  // it('should call getUserInfo actioncreator', () => {
  //   const mockProps = {
  //     logged_in: true,
  //   };
  //   const component = mount(mockHeaderWithProps);
  //   expect(spyOnGetUser).toHaveBeenCalledTimes(1);
  // });
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
