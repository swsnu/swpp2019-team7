const initState = {
  user_id: -1,
  pill_list: [],
  selected_pill: null,
};

const PillReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'GET_USER_PILLS':
      // eslint-disable-next-line no-console
      console.log('[reducer] GET_USER_PILLS -- pill_list:', action.pill_list);
      return { ...state, pill_list: action.pill_list };
    case 'ADD_USER_PILL':
      console.log('[reducer] ADD_USER_PILL: ', state.pill_list.concat(action.payload));
      return { ...state, pill_list: state.pill_list.concat(action.payload) };
    case 'DELETE_USERPILL':
      return { ...state, pill_list: state.pill_list.filter(({ id }) => id !== action.payload) };
    default:
      break;
  }
  return state;
};

export default PillReducer;
