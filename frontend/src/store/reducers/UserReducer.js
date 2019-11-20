const initState = {
  current_user: null,
  noti_setting: null,
  logged_in: JSON.parse(localStorage.getItem('loggedInStatus')),
};

const UserReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'SIGNIN_USER':
      localStorage.setItem('loggedInStatus', JSON.stringify(action.logged_in));
      return { ...state, logged_in: action.logged_in, current_user: action.current_user };
    case 'SIGNOUT_USER':
      localStorage.setItem('loggedInStatus', JSON.stringify(action.logged_in));
      return { ...state, logged_in: action.logged_in, current_user: null};
    case 'SIGNUP_USER':
      return { ...state, current_user: null, logged_in: false };
    case 'EDIT_USERINFO':
    case 'GET_USERINFO':
      return { ...state, current_user: action.current_user, logged_in: true };
    case 'EDIT_NOTI':
    case 'GET_NOTI':
      return { ...state, noti_setting: action.noti_setting, logged_in: true };
    default:
      break;
  }
  return state;
};

export default UserReducer;
