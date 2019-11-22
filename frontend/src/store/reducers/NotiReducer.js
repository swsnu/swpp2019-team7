/** *
 * Reducer logic for web notifications(per pill)
 * This reducer stores every WebNotification, along with their time,
 * of a user in the following format
 * [{id: 0, activated: true, time: [0900]},
 * {id: 1, activated: false, time: [1000, 1500]}]
 */
const initState = {
  webnoti_list: null,
};

const UserReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'GET_WEBNOTI':
    case 'EDIT_WEBNOTI':
      return { ...state, webnoti_list: action.webnoti_list };
    default:
      break;
  }
  return state;
};

export default UserReducer;
