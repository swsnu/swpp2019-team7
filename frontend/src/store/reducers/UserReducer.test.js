import UserReducer from './UserReducer';

const reducer = UserReducer;
// const stubUser_1 = {id: 1, name: "testuser1"}

describe('User Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined);
    expect(newState).toEqual({ logged_in: false });
  });
  it('should get pills of a user', () => {
    const newState = reducer(undefined, {
      type: 'SIGNIN_USER',
      logged_in: true,
    });
    expect(newState.logged_in).toEqual(true);
  });
  it('should get pilldata of a specific pill', () => {
    const newState = reducer(undefined, {
      type: 'SIGNOUT_USER',
      logged_in: false,
    });
    expect(newState.logged_in).toEqual(false);
  });
});
