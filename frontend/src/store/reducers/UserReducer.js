const initState = {
  logged_in: JSON.parse(localStorage.getItem('loggedInStatus')),
};

const UserReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'SIGNIN_USER':
      localStorage.setItem('loggedInStatus', JSON.stringify(action.logged_in));
      return { ...state, logged_in: action.logged_in };
    case 'SIGNOUT_USER':
      localStorage.setItem('loggedInStatus', JSON.stringify(action.logged_in));
      return { ...state, logged_in: action.logged_in };
    case 'SIGNUP_USER':
      return { ...state, logged_in: false };
    default:
      break;
  }
  return state;
};

export default UserReducer;
