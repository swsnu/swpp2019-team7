import ax from '../../api/index';

import * as actionCreators from './notiAction';
import store from '../index';

describe('Noti Action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get web noti', () => {
    const spy = jest.spyOn(ax, 'get')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.getWebnoti());
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('edit web noti', () => {
    const spy = jest.spyOn(ax, 'put')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: [],
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.editWebnoti(1));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
