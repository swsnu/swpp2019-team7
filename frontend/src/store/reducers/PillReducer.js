const initState = {
  user_id: -1,
  image_id: -1,
  pill_list: [],
  selected_pill: null,
};

const PillReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'GET_USER_PILLS':
      return { ...state, pill_list: action.pill_list };
    case 'ADD_USER_PILL':
      return { ...state, pill_list: state.pill_list.concat(action.payload) };
    case 'ADD_CUSTOM_PILL':
      return { ...state, pill_list: state.pill_list.concat(action.payload) };
    case 'SET_IMAGE_ID':
      return { ...state, image_id: action.image_id };
    case 'DELETE_USERPILL':
      return { ...state, pill_list: state.pill_list.filter(({ id }) => id !== action.payload) };
    case 'GET_PILL':
      return { ...state, selected_pill: action.selected_pill };
    case 'ADD_USER_PILLIMAGE':
      return { ...state, selected_pill: action.selected_pill };
    default:
      break;
  }
  return state;
};

export default PillReducer;
