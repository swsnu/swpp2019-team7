import ax from '../../api/index';

import * as actionCreators from './pillAction';
import store from '../index';

describe('Pill Action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get User Pills', (done) => {
    ax.get = jest.fn(() => new Promise((resolve) => {
      const result = {
        status: 200,
        data: [],
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.getUserPills()).then(() => done());
  });

  it('add User Pill', () => {
    const spy = jest.spyOn(ax, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: [],
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.addUserPill());
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('add User Pill by name and company', () => {
    const spy = jest.spyOn(ax, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: [],
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.addUserPillByNameAndCompany('asdf', 'asdf'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('add User Pill Image', () => {
    const spy = jest.spyOn(ax, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: [],
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.addUserPillImage('asdf', 1));
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('delete User Pill', () => {
    const spy = jest.spyOn(ax, 'delete')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: [],
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.deleteUserPill(1));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('get specific User Pill', () => {
    ax.get = jest.fn(() => new Promise((resolve) => {
      const result = {
        status: 200,
        data: [],
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.getPill(1));
    expect(ax.get).toHaveBeenCalledTimes(1);
  });
});
