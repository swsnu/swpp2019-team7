import UserReducer from './UserReducer';
import * as stubs from '../../test-utils/mocks';

const reducer = UserReducer;
const stubUser = {
  email: 'test@test.com', name: 'Test', password: 'testpw', telegram_id: 'telegram',
};
const stubNoti = stubs.stubNotiState;

describe('User Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined);
    expect(newState).toEqual({ logged_in: null, current_user: null, noti_setting: null });
  });
  it('should get pills of a user', () => {
    const newState = reducer(undefined, {
      type: 'SIGNIN_USER',
      logged_in: true,
    });
    expect(newState.logged_in).toEqual(true);
  });
  it('should get pilldata of a specific pill', () => {
    const newState = reducer(undefined, {
      type: 'SIGNOUT_USER',
      logged_in: false,
    });
    expect(newState.logged_in).toEqual(false);
  });

  it('edit_userinfo', () => {
    const newState = reducer(undefined, {
      type: 'EDIT_USERINFO',
      loggedin: false,
      current_user: stubUser,
    });
    expect(newState.logged_in).toEqual(true);
    expect(newState.current_user).toEqual(stubUser);
  });

  it('edit_usernoti', () => {
    const newState = reducer(undefined, {
      type: 'EDIT_NOTI',
      noti_setting: stubNoti,
    });
    expect(newState.noti_setting).toEqual(stubNoti);
  });
});
