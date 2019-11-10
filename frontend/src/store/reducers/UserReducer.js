const initState = {
  current_user: null,
  logged_in: false,
};

const UserReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'SIGNIN_USER':
      localStorage.setItem('loggedInnStatus', JSON.stringify(action.logged_in));
      return { ...state, current_user: action.user, logged_in: action.logged_in };
    case 'SIGNOUT_USER':
      localStorage.clear();
      return { ...state, current_user: action.user, logged_in: action.logged_in };
    case 'SIGNUP_USER':
      return { ...state, current_user: action.user, logged_in: false };
    case 'EDIT_USERINFO':
      localStorage.setItem('loggedInnStatus', JSON.stringify(action.logged_in));
      return { ...state, current_user: action.user, logged_in: true}
    default:
      break;
  }
  return state;
};

export default UserReducer;
