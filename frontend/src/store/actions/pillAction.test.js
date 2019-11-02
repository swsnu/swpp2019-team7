import axios from 'axios';

import * as actionCreators from './pillAction';
import store from '../index';

const stubPill1 = { id: 1, name: 'testPill1' };
const stubPill2 = { id: 2, name: 'testPill2' };
const stubPillList = [stubPill1, stubPill2];

describe('Pill Action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get User Pills should fetch pill list correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubPillList,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.getUserPills()).then(() => {
      const newState = store.getState();
      expect(newState.pill.pill_list).toBe(stubPillList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('getPill should fetch single pills correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(() => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubPill1,
        };
        resolve(result);
      }));
    store.dispatch(actionCreators.getPillData()).then(() => {
      const newState = store.getState();
      expect(newState.pill.selected_pill).toBe(stubPill1);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
