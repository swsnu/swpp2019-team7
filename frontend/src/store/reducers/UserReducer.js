const initState = {
  logged_in: false,
};

const UserReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'SIGNIN_USER':
      return { ...state, logged_in: true};
    case 'SIGNOUT_USER':
      return { ...state, logged_in: false };
    case 'SIGNUP_USER':
      return { ...state, logged_in: false };
    default:
      break;
  }
  return state;
};

export default UserReducer;
