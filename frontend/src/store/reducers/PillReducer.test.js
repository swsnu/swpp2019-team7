import PillReducer from './PillReducer';

const reducer = PillReducer;
const stubPill1 = { id: 1, name: 'testPill1' };
const stubPill2 = { id: 2, name: 'testPill2' };
const stubPill3 = { id: 3, name: 'testPill3' };
const stubPillList = [stubPill1, stubPill2];
const initState = {
  user_id: -1, pill_list: stubPillList, selected_pill: null, render_custompill: false,
};
describe('Pill Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined);
    expect(newState).toEqual({
      user_id: -1, image_id: -1, pill_list: [], selected_pill: null, render_custompill: false,
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

  it('should change customrender setting', () => {
    const newState = reducer(initState, {
      type: 'SET_RENDER_CUSTOM',
      render_custompill: true,
    });
    expect(newState.render_custompill).toEqual(true);
  });

  it('should add pills of a user', () => {
    const newState = reducer(initState, {
      type: 'ADD_USER_PILL',
      payload: stubPill3,
    });
    expect(newState.pill_list).toEqual([stubPill1, stubPill2, stubPill3]);
  });

  it('should add pills of a user', () => {
    const newState = reducer(initState, {
      type: 'ADD_CUSTOM_PILL',
      payload: stubPill3,
    });
    expect(newState.pill_list).toEqual([stubPill1, stubPill2, stubPill3]);
  });

  it('should change customrender setting', () => {
    const newState = reducer(initState, {
      type: 'SET_IMAGE_ID',
      image_id: 1,
    });
    expect(newState.image_id).toEqual(1);
  });

  it('should get pills of a user', () => {
    const newState = reducer(initState, {
      type: 'DELETE_USERPILL',
      payload: 1,
    });
    expect(newState.pill_list).toEqual([stubPill2]);
  });

  it('should change customrender setting', () => {
    const newState = reducer(initState, {
      type: 'GET_PILL',
      selected_pill: stubPill1,
    });
    expect(newState.selected_pill).toEqual(stubPill1);
  });


  it('should change customrender setting', () => {
    const newState = reducer(initState, {
      type: 'ADD_USER_PILLIMAGE',
      selected_pill: stubPill1,
    });
    expect(newState.selected_pill).toEqual(stubPill1);
  });
});
