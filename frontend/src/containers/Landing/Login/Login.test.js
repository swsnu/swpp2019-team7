import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Login from './Login';
import { getMockStore } from '../../../test-utils/mocks';
import * as userActionCreator from '../../../store/actions/userAction';
import { history } from '../../../store/reducers/index';


const mockStore = getMockStore();

describe('Login', () => {
  let mockLogin; let
    spyAcceptLogin;
  beforeEach(() => {
    spyAcceptLogin = jest.spyOn(userActionCreator, 'signinUser')
      .mockImplementation(() => () => {});
    mockLogin = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Login />
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Login', () => {
    const component = mount(mockLogin);
    expect(component.find('.Login').length).toBe(1);
  });
  it('should accept login', () => {
    const component = mount(mockLogin);
    const wrapperEmail = component.find({ id: 'email' }).at(1);
    const wrapperPW = component.find({ id: 'password' }).at(1);
    const wrapperButton = component.find({ id: 'login-button' }).at(1);

    wrapperEmail.props().onChange({ target: { value: 'swpp@snu.ac.kr' } });
    wrapperPW.props().onChange({ target: { value: 'password' } });
    wrapperButton.simulate('click');

    expect(spyAcceptLogin).toHaveBeenCalledTimes(1);
  });
});
