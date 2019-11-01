const initState = {
  user_id: -1,
  pill_list: [],
  selected_pill: null,
};

const PillReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_USERPILLS':
      return { ...state, pill_list: action.pill_list };
    case 'GET_PILLDATA':
      return { ...state, selected_pill: action.selected_pill };
    default:
      break;
  }
  return state;
};

export default PillReducer;
