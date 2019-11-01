const initState = {
  logged_in: false,
};

const UserReducer = (state = initState, action = null) => {
  switch (action.type) {
    case 'SIGNIN_USER':
      return { ...state, logged_in: action.logged_in };
    case 'SIGNOUT_USER':
      return { ...state, logged_in: action.logged_in };
    default:
      break;
  }
  return state;
};

export default UserReducer;
