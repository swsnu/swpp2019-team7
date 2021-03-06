import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Signup, { mapDispatchToProps } from './Signup';
import { getMockStore } from '../../../test-utils/mocks';
import * as userActionCreator from '../../../store/actions/userAction';
import { history } from '../../../store/reducers/index';


const mockStore = getMockStore();

describe('Signup', () => {
  let mockSignup;
  let spyAcceptSignup;
  let spyRegisterDevice;
  beforeEach(() => {
    spyAcceptSignup = jest.spyOn(userActionCreator, 'signupUser')
      .mockImplementation(() => ({ type: 'SIGNUP_USER' }));
    spyRegisterDevice = jest.spyOn(userActionCreator, 'registerUserDevice')
      .mockImplementation();
    mockSignup = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Signup />
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
    const dispatch = jest.fn();
    const component = mount(mockSignup);

    const wrapperEmail = component.find({ id: 'email' }).at(1);
    const wrapperPW = component.find({ id: 'password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'password-confirmation' }).at(1);
    const wrapperName = component.find({ id: 'name' }).at(1);

    wrapperEmail.props().onChange({ target: { value: 'swpp@snu.com' } });
    wrapperPW.props().onChange({ target: { value: 'Password123*' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'Password123*' } });
    wrapperName.props().onChange({ target: { value: 'Peter' } });

    const wrapperButton = component.find({ id: 'signup-button' }).find('button').at(1);
    wrapperButton.simulate('click');

    mapDispatchToProps(dispatch).onSignupUser();
    mapDispatchToProps(dispatch).onRegisterToken();

    expect(spyAcceptSignup).toHaveBeenCalledTimes(1);
    expect(spyRegisterDevice).toHaveBeenCalledTimes(1);
  });
  it('should NOT accept signup', () => {
    const component = mount(mockSignup);

    const wrapperEmail = component.find({ id: 'email' }).at(1);
    const wrapperPW = component.find({ id: 'password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'password-confirmation' }).at(1);
    const wrapperName = component.find({ id: 'name' }).at(1);
    const wrapperButton = component.find({ id: 'signup-button' }).find('button').at(1);

    wrapperEmail.props().onChange({ target: { value: 'swppsnu.com' } });
    wrapperPW.props().onChange({ target: { value: 'Password123*' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'password123*' } });
    wrapperName.props().onChange({ target: { value: 'peter' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(0);
  });
  it('should NOT accept signup 2', () => {
    const component = mount(mockSignup);

    const wrapperEmail = component.find({ id: 'email' }).at(1);
    const wrapperPW = component.find({ id: 'password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'password-confirmation' }).at(1);
    const wrapperName = component.find({ id: 'name' }).at(1);
    const wrapperButton = component.find({ id: 'signup-button' }).find('button').at(1);

    wrapperEmail.props().onChange({ target: { value: 'swppsnu.com' } });
    wrapperPW.props().onChange({ target: { value: 'pwd*' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'pwd*' } });
    wrapperName.props().onChange({ target: { value: 'peter' } });
    wrapperButton.simulate('click');

    expect(spyAcceptSignup).toHaveBeenCalledTimes(0);
  });
});
