import DialogReducer from './DialogReducer';

const reducer = DialogReducer;

const initState = { open: true };
describe('Dialog Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined);
    expect(newState).toEqual({ open: true });
  });
  it('should change at close action', () => {
    const newState = reducer(initState, {
      type: 'CLOSE_DIALOG',
    });
    expect(newState).toEqual({
      open: false,
    });
  });
  it('should change at open action', () => {
    const newState = reducer(initState, {
      type: 'RESET_DIALOG',
    });
    expect(newState).toEqual({
      open: true,
    });
  });
});
