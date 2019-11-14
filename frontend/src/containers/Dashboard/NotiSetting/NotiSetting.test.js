import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import NotiSetting from './NotiSetting';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/reducers/index';


const mockStore = getMockStore();

describe('NotiSetting', () => {
  let mockNotiSetting;
  beforeEach(() => {
    mockNotiSetting = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <NotiSetting />
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render NotiSetting', () => {
    const component = mount(mockNotiSetting);
    expect(component.find('.NotiSetting').length).toBe(1);
  });
  /*
  it('should accept signup', () => {
    const component = mount(mockSignup);

    const wrapperPW = component.find({ id: 'password' }).at(1);
    const wrapperPWConfirm = component.find({ id: 'password-confirmation' }).at(1);
    const wrapperName = component.find({ id: 'name' }).at(1);
    const wrapperButton = component.find({ id: 'editinfo-button' }).at(1);

    wrapperPW.props().onChange({ target: { value: 'Password123*' } });
    wrapperPWConfirm.props().onChange({ target: { value: 'Password123*' } });
    wrapperName.props().onChange({ target: { value: 'Peter' } })
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

    wrapperName.props().onChange({ target: { value: 'asdf' } })
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
  }); */
});
