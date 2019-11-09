const initState = {
  logged_in: false,
};

const UserReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'SIGNIN_USER':
      localStorage.setItem('loggedInnStatus', JSON.stringify(action.logged_in));
      return { ...state, logged_in: action.logged_in };
    case 'SIGNOUT_USER':
      localStorage.clear();
      return { ...state, logged_in: action.logged_in };
    case 'SIGNUP_USER':
      return { ...state, logged_in: false };
    default:
      break;
  }
  return state;
};

export default UserReducer;
