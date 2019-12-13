import ax from '../../api/index';

import * as actionCreators from './pillAction';
import store from '../index';

const stubCustomPill = {
  take_method: 'asdf',
  product_name: 'asdf',
  expiration_date: 'asdf',
  functions: 'asdf',
  store_method: 'asdf',
  company_name: 'asdf',
  standards: 'asdf',
  precautions: 'asdf',
  take_method_preprocessed: 'asdf',
  image_id: 1,
};

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

  it('add Custom Pill', () => {
    const spy = jest.spyOn(ax, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: [],
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.addCustomPill(stubCustomPill));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('add Pill By Name Pill', () => {
    const spy = jest.spyOn(ax, 'post')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: [],
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.addUserPillByNameAndCompany());
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
