import axios from 'axios';

import * as actionCreators from './userAction';
import store from '../index';

// const stubUser1 = { id: 1, name: 'testuser1' };

describe('User Action', () => {
  let spyLog;
  beforeEach(() => {
    spyLog = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Signin User should login the user correctly', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 204,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.signinUser()).then(() => {
      const newState = store.getState();
      expect(newState.user.logged_in).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  function bodylessPromise(htmlCode, resolveOrNot) {
    return new Promise((resolve, reject) => {
      const result = {
        status: htmlCode,
      };
      if (resolveOrNot) resolve(result);
      else { reject(result); }
    });
  }

  function confirmLoginStatus(spy, expectedLogin) {
    const newState = store.getState();
    expect(newState.user.logged_in).toBe(expectedLogin);
    expect(spy).toHaveBeenCalledTimes(1);
  }


  it('Signin User should logout the user correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => bodylessPromise(204, true));
    store.dispatch(actionCreators.signoutUser()).then(() => {
      confirmLoginStatus(spy, false);
      done();
    });
  });
  it('SigupUser should accept new users', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => bodylessPromise(201, true));
    store.dispatch(actionCreators.signupUser()).then(() => {
      confirmLoginStatus(spy, true);
      done();
    });
  });

  it('SigninUser should deal with errors', (done) => {
    jest.spyOn(axios, 'post')
      .mockImplementation(() => bodylessPromise(405, false));
    store.dispatch(actionCreators.signinUser()).then(() => {
      expect(spyLog).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('SignoutUser should deal with errors', (done) => {
    jest.spyOn(axios, 'get')
      .mockImplementation(() => bodylessPromise(405, false));
    store.dispatch(actionCreators.signoutUser()).then(() => {
      expect(spyLog).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('SignupUser should deal with errors', (done) => {
    jest.spyOn(axios, 'post')
      .mockImplementation(() => bodylessPromise(405, false));
    store.dispatch(actionCreators.signupUser()).then(() => {
      expect(spyLog).toHaveBeenCalledTimes(2);
      done();
    });
  });
});
