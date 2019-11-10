import PillReducer from './PillReducer';

const reducer = PillReducer;
const stubPill1 = { id: 1, name: 'testPill1' };
const stubPill2 = { id: 2, name: 'testPill2' };
const stubPillList = [stubPill1, stubPill2];

describe('Pill Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined);
    expect(newState).toEqual({ user_id: -1, pill_list: [], selected_pill: null });
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
  xit('should get pilldata of a specific pill', () => {
    const newState = reducer(undefined, {
      type: 'GET_PILLDATA',
      selected_pill: stubPill1,
    });
    expect(newState.selected_pill).toEqual(stubPill1);
  });
});
