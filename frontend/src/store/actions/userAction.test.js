import ax from '../../api/index';

import * as actionCreators from './userAction';
import store from '../index';
import { bodylessPromise, confirmLoginStatus } from '../../test-utils/functions';

// const stubUser1 = { id: 1, name: 'testuser1' };
const stubNoti = { enable_noti: true, enable_segregate: true, enable_kakao: false };
const stubUser = {
  email: 'test@test.com', name: 'Test', password: 'testpw', telegram_id: 'telegram',
};

describe('User Action', () => {
  let spyLog;
  beforeEach(() => {
    spyLog = jest.spyOn(console, 'log');
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Signin User should login the user correctly', (done) => {
    const spy = jest.spyOn(ax, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.signinUser()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('Signout User should logout the user correctly', (done) => {
    const spy = jest.spyOn(ax, 'get')
      .mockImplementation(() => bodylessPromise(204, true));
    store.dispatch(actionCreators.signoutUser()).then(() => {
      confirmLoginStatus(spy, false, store);
      done();
    });
  });
  it('SigupUser should accept new users', (done) => {
    const spy = jest.spyOn(ax, 'post')
      .mockImplementation(() => bodylessPromise(201, true));
    store.dispatch(actionCreators.signupUser()).then(() => {
      confirmLoginStatus(spy, false, store);
      done();
    });
  });

  it('SigninUser should deal with errors', (done) => {
    jest.spyOn(ax, 'post')
      .mockImplementation(() => bodylessPromise(405, false));
    store.dispatch(actionCreators.signinUser()).then(() => {
      expect(spyLog).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('SignoutUser should deal with errors', (done) => {
    jest.spyOn(ax, 'get')
      .mockImplementation(() => bodylessPromise(405, false));
    store.dispatch(actionCreators.signoutUser()).then(() => {
      expect(spyLog).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('SignupUser should deal with errors', (done) => {
    jest.spyOn(ax, 'post')
      .mockImplementation(() => bodylessPromise(405, false));
    store.dispatch(actionCreators.signupUser()).then(() => {
      expect(spyLog).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('EditNotification ', (done) => {
    const spy = jest.spyOn(ax, 'put')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubNoti,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.editNoti(stubNoti)).then(() => {
      const newState = store.getState();
      expect(newState.user.noti_setting).toBe(stubNoti);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });


  it('Edit User Info ', (done) => {
    const spy = jest.spyOn(ax, 'put')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubUser,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.editUserInfo(stubUser)).then(() => {
      const newState = store.getState();
      expect(newState.user.current_user).toBe(stubUser);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
