import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import SettingItem from './SettingItem';
import { getMockStore } from '../../../test-utils/mocks';
// import * as userActionCreator from '../../../store/actions/userAction';
import { history } from '../../../store/reducers/index';


const mockStore = getMockStore();

describe('SettingItem', () => {
  let mockSettingItem;

  // let spyEditNoti;
  beforeEach(() => {
    // spyEditNoti = jest.spyOn(userActionCreator, 'editNoti')
    // .mockImplementation(() => ({ type: 'EDIT_NOTI' }));
    mockSettingItem = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <SettingItem index={1} />
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render SettingItem', () => {
    const component = mount(mockSettingItem);
    expect(component.find('.SettingItem').length).toBe(1);
  });
  /*
  it('should change switch', () => {
    const component = mount(mockSettingItem);

    const wrapperSwitch = component.find({ id: 'onoff-switch' }).at(0);

    wrapperSwitch.props().onChange({target: { value: false }})

    expect(spyEditNoti).toHaveBeenCalledTimes(1);
  }); */
  /*
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
