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

  it('Signin User should logout the user correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 204,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.signoutUser()).then(() => {
      const newState = store.getState();
      expect(newState.user.logged_in).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('SigninUser should deal with errors', (done) => {
    jest.spyOn(axios, 'post')
      .mockImplementation(() => new Promise((resolve, reject) => {
        const result = {
          status: 405,
        };
        reject(result);
      }));
    store.dispatch(actionCreators.signinUser()).then(() => {
      expect(spyLog).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('SignOutUser should deal with errors', (done) => {
    jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((resolve, reject) => {
        const result = {
          status: 405,
        };
        reject(result);
      }));
    store.dispatch(actionCreators.signoutUser()).then(() => {
      expect(spyLog).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
