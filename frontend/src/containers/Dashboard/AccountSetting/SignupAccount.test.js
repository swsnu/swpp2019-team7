import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import SignupAccount from './SignupAccount';
import { getMockStore } from '../../../test-utils/mocks';
import * as userActionCreator from '../../../store/actions/userAction';
import { history } from '../../../store/reducers/index';


const mockStore = getMockStore();

describe('SignupAccount', () => {
  let mockSignup;
  let spyAcceptSignup;
  beforeEach(() => {
    spyAcceptSignup = jest.spyOn(userActionCreator, 'editUserInfo')
      .mockImplementation(() => ({ type: 'EDIT_USERINFO' }));
    mockSignup = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <SignupAccount />
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Signup', () => {
    const component = mount(mockSignup);
    expect(component.find('.Signup').length).toBe(1);
  });
  it('should accept signup', () => {
    const component = mount(mockSignup);

    const wrapperPW = component.find({ id: 'password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'password-confirmation' }).at(1);
    const wrapperName = component.find({ id: 'name' }).at(1);
    // const wrapperFirst = component.find({ id: 'telegram_first_name' }).at(1);
    // const wrapperLast = component.find({ id: 'telegram_last_name' }).at(1);
    // const wrapperUser = component.find({ id: 'telegram_username' }).at(1);
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperPW.props().onChange({ target: { value: 'Password123*' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'Password123*' } });
    wrapperName.props().onChange({ target: { value: 'Peter' } });
    // wrapperFirst.props().onChange({ target: { value: 'first' } });
    // wrapperLast.props().onChange({ target: { value: 'last' } });
    // wrapperUser.props().onChange({ target: { value: 'username' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(1);
  });
  it('should NOT accept signup - bad pw', () => {
    const component = mount(mockSignup);

    const wrapperPW = component.find({ id: 'password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'password-confirmation' }).at(1);
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperPW.props().onChange({ target: { value: 'pwd*' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'pwd*' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(0);
  });
  it('should NOT accept signup2 - bad name', () => {
    const component = mount(mockSignup);

    const wrapperName = component.find({ id: 'name' }).at(1);
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperName.props().onChange({ target: { value: 'asdf' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(0);
  });
  it('should NOT accept signup3 - pwd mismatch', () => {
    const component = mount(mockSignup);

    const wrapperPW = component.find({ id: 'password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'password-confirmation' }).at(1);
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperPW.props().onChange({ target: { value: 'pwd111111' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'pwd11111' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(0);
  });

  //
  // it('should NOT accept signup4 - telegramname mismatch', () => {
  //   const component = mount(mockSignup);
  //
  //   const wrapperFirst = component.find({ id: 'telegram_first_name' }).at(1);
  //   const wrapperLast = component.find({ id: 'telegram_last_name' }).at(1);
  //   const wrapperUser = component.find({ id: 'telegram_username' }).at(1);
  //   const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);
  //
  //   wrapperFirst.props().onChange({ target: { value: '' } });
  //   wrapperLast.props().onChange({ target: { value: '@!3@@!#' } });
  //   wrapperUser.props().onChange({ target: { value: '!1!' } });
  //   wrapperButton.simulate('click');
  //
  //   expect(spyAcceptSignup).toHaveBeenCalledTimes(0);
  // });
});
