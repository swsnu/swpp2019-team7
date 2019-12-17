import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import AccountSetting from './AccountSetting';
import { getMockStore } from '../../../test-utils/mocks';
import * as userActionCreator from '../../../store/actions/userAction';
import { history } from '../../../store/reducers/index';


const mockStore = getMockStore();

describe('SignupAccount', () => {
  let mockAccountSetting;
  let spyAcceptSignup;
  beforeEach(() => {
    spyAcceptSignup = jest.spyOn(userActionCreator, 'editUserInfo')
      .mockImplementation(() => ({ type: 'EDIT_USERINFO' }));
    mockAccountSetting = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <AccountSetting />
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render AccountSetting', () => {
    const component = mount(mockAccountSetting);
    expect(component.find('.Signup').length).toBe(1);
  });
  it('should accept edit account info', () => {
    const component = mount(mockAccountSetting);

    const wrapperPW = component.find({ id: 'new-password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'new-password-confirmation' }).at(1);
    const wrapperName = component.find({ id: 'name' }).at(1);
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperPW.props().onChange({ target: { value: 'Password123*' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'Password123*' } });
    wrapperName.props().onChange({ target: { value: 'Celine' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(1);
  });
  it('should NOT accept edit account info (i) - bad password', () => {
    const component = mount(mockAccountSetting);

    const wrapperPW = component.find({ id: 'new-password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'new-password-confirmation' }).at(1);
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperPW.props().onChange({ target: { value: 'pwd*' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'pwd*' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(0);
  });
  it('should NOT accept edit account info (ii) - bad name', () => {
    const component = mount(mockAccountSetting);

    const wrapperName = component.find({ id: 'name' }).at(1);
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperName.props().onChange({ target: { value: 'hull' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(0);
  });
  it('should NOT accept edit account info (iii) - passwords mismatch', () => {
    const component = mount(mockAccountSetting);

    const wrapperPW = component.find({ id: 'new-password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'new-password-confirmation' }).at(1);
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperPW.props().onChange({ target: { value: 'pwd111111' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'pwd11111' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(0);
  });
});
