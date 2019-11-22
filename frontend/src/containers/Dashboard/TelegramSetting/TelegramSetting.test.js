import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import TelegramSetting from './TelegramSetting';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/reducers/index';
import ax from '../../../api/index';

const mockStore = getMockStore();

describe('Telegram Setting', () => {
  let mockTelegramSetting;

  beforeEach(() => {
    mockTelegramSetting = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <TelegramSetting />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render TelegramSetting', (done) => {
    const component = mount(mockTelegramSetting);
    expect(component.find('.telegram-setting')).toHaveLength(1);
    done();
  });

  it('Should register telegram account', (done) => {
    const component = mount(mockTelegramSetting);

    const spy = jest.spyOn(ax, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: { auth_key: '필박스 조아 abcd' },
        };
        resolve(result);
      }));

    const firstNameTextField = component.find({ id: 'telegram_first_name' }).at(1);
    const lastNameTextField = component.find({ id: 'telegram_last_name' }).at(1);
    const userNameTextField = component.find({ id: 'telegram_username' }).at(1);
    const button = component.find({ id: 'submit-button' }).at(1);

    firstNameTextField.props().onChange({ target: { value: 'test' } });
    lastNameTextField.props().onChange({ target: { value: 'test' } });
    userNameTextField.props().onChange({ target: { value: 'test' } });
    button.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);

    firstNameTextField.props().onChange({ target: { value: '' } });
    lastNameTextField.props().onChange({ target: { value: '' } });
    userNameTextField.props().onChange({ target: { value: '' } });
    button.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);

    done();
  });
});
