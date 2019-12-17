import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import DemoWidget from './DemoWidget';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/reducers/index';

import * as pillActionCreator from '../../../store/actions/pillAction';

const stubUserLogin = {
  current_user: {
    name: '',
  },
  noti_setting: {
    enable_noti: false,
    enable_segregation: false,
    enable_kakao: false,
  },
  logged_in: true,
};

const mockData = {
  take_method: '',
  product_name: 'asdf',
  expiration_date: '',
  functions: '',
  store_method: '',
  company_name: '',
  precautions: '',
  file: 'asdf',
};

jest.mock('../../../components/UploadWidget/UploadWidget', () => jest.fn((props) => (
  <div className="spyUploadWidget">
    <button
      className="finishUpload"
      type="button"
      onClick={() => { props.toggleResultModal(true); }}
    >
hello
    </button>
    <button
      className="retrieveProduct"
      type="button"
      onClick={() => { props.updateProductInfo(mockData); }}
    >
world
    </button>
  </div>
)));


describe('DemoWidget', () => {
  let mockDemoWidget;
  const mockStore = getMockStore();
  beforeEach(() => {
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

  it('should click save button', () => {
    const mockDemoWidgetLogin = (
      <Provider store={getMockStore('user', stubUserLogin)}>
        <ConnectedRouter history={history}>
          <DemoWidget />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(mockDemoWidgetLogin);
    const spyAction = jest.spyOn(pillActionCreator, 'addUserPill')
      .mockImplementation(() => ({ type: 'SIGNIN_USER', logged_in: true }));

    const wrapperUploadWidget = component.find('.spyUploadWidget');
    const wrapperRetrieveProduct = wrapperUploadWidget.find('.retrieveProduct');
    wrapperRetrieveProduct.simulate('click');
    const wrapperOpenButton = wrapperUploadWidget.find('.finishUpload');
    wrapperOpenButton.simulate('click');

    const wrapperButton = component.find({ id: 'add-new-pill' }).at(1);
    wrapperButton.simulate('click');
    expect(spyAction).toHaveBeenCalledTimes(0);
  });

  it('should click login-to-save button', () => {
    const component = mount(mockDemoWidget);

    const wrapperUploadWidget = component.find('.spyUploadWidget');
    const wrapperRetrieveProduct = wrapperUploadWidget.find('.retrieveProduct');
    wrapperRetrieveProduct.simulate('click');
    const wrapperOpenButton = wrapperUploadWidget.find('.finishUpload');
    wrapperOpenButton.simulate('click');

    const wrapperButton = component.find({ id: 'login-to-save' }).at(0);
    const spyAction = jest.spyOn(history, 'push');
    wrapperButton.simulate('click');
    expect(spyAction).toHaveBeenCalledTimes(1);
  });

  it('should click retry button', () => {
    const component = mount(mockDemoWidget);

    const wrapperUploadWidget = component.find('.spyUploadWidget');
    const wrapperRetrieveProduct = wrapperUploadWidget.find('.retrieveProduct');
    wrapperRetrieveProduct.simulate('click');
    const wrapperOpenButton = wrapperUploadWidget.find('.finishUpload');
    wrapperOpenButton.simulate('click');

    const wrapperButton = component.find({ id: 'retry' }).at(0);
    wrapperButton.simulate('click');
    const wrapperModal = component.find({ id: 'result-modal' }).at(1);
    expect(wrapperModal.length).toBe(0);
  });

  it('should click goback button', () => {
    const component = mount(mockDemoWidget);

    const wrapperUploadWidget = component.find('.spyUploadWidget');
    const wrapperOpenButton = wrapperUploadWidget.find('.finishUpload');
    wrapperOpenButton.simulate('click');

    const buttonWrapper = component.find({ id: 'go-back' }).at(1);
    buttonWrapper.simulate('click');
    const wrapperModal = component.find({ id: 'result-modal' }).at(1);
    expect(wrapperModal.length).toBe(0);
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
