const initState = {
    current_user: null,
    noti_setting: null,
    logged_in: JSON.parse(localStorage.getItem('loggedInStatus')),
  };
  
  const UserReducer = (state = initState, action = null) => {
    if (action == null) return state;
    switch (action.type) {
      case 'GET_WEBNOTI':
      case 'EDIT_WEBNOTI':
        return { ...state, webnoti_list: action.webnoti_list};
      default:
        break;
    }
    return state;
  };
  
  export default UserReducer;
  