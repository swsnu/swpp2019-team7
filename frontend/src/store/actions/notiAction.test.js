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
});
