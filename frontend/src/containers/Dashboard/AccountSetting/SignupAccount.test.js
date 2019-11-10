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
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperPW.props().onChange({ target: { value: 'Password123*' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'Password123*' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(1);
  });
  it('should NOT accept signup ', () => {
    const component = mount(mockSignup);

    const wrapperPW = component.find({ id: 'password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'password-confirmation' }).at(1);
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperPW.props().onChange({ target: { value: 'pwd*' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'pwd*' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(0);
  });
});
