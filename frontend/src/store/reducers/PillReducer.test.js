import PillReducer from './PillReducer';

const reducer = PillReducer;
const stubPill1 = { id: 1, name: 'testPill1' };
const stubPill2 = { id: 2, name: 'testPill2' };
const stubPill3 = { id: 3, name: 'testPill3' };
const stubPillList = [stubPill1, stubPill2];

describe('Pill Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined);
    expect(newState).toEqual({
      user_id: -1, image_id: -1, pill_list: [], selected_pill: null,
    });
  });
  xit('should get pills of a user', () => {
    const newState = reducer(undefined, {
      type: 'GET_USERPILLS',
      pill_list: stubPillList,
    });
    expect(newState).toEqual({
      user_id: -1,
      pill_list: stubPillList,
      selected_pill: null,
    });
  });
  it('should get pills of a user', () => {
    const initState = { user_id: -1, pill_list: stubPillList, selected_pill: null };
    const newState = reducer(initState, {
      type: 'DELETE_USERPILL',
      payload: 1,
    });
    expect(newState.pill_list).toEqual([{ id: 2, name: 'testPill2' }]);
  });
  it('should add pills of a user', () => {
    const initState = { user_id: -1, pill_list: stubPillList, selected_pill: null };
    const newState = reducer(initState, {
      type: 'ADD_USER_PILL',
      payload: stubPill3,
    });
    expect(newState.pill_list).toEqual([{ id: 1, name: 'testPill1' }, { id: 2, name: 'testPill2' }, { id: 3, name: 'testPill3' }]);
  });
});
