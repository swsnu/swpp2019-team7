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

  it('delete User Pill', () => {
    ax.delete = jest.fn(() => new Promise((resolve) => {
      const result = {
        status: 200,
        data: [],
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.deleteUserPill(1));
  });
});
