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
      console.log('[reducer] GET_USER_PILLS -- pill_list:', state.pill_list);
      return { ...state, pill_list: action.pill_list };
    // case 'GET_PILL_DATA':
    //   return { ...state, selected_pill: action.selected_pill };
    default:
      break;
  }
  return state;
};

export default PillReducer;
