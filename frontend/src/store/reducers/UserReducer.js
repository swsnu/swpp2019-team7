const initState = {
  logged_in: false,
};

const UserReducer = (action, state = initState) => {
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
