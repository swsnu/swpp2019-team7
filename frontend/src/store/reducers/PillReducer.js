const initState = {
  user_id: -1,
  image_id: -1,
  render_custompill: false,
  pill_list: [],
  selected_pill: null,
  new_pill_id: -1,
};

const PillReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'GET_USER_PILLS':
      return { ...state, pill_list: action.pill_list };
    case 'SET_RENDER_CUSTOM':
      return { ...state, render_custompill: action.render_custompill };
    case 'ADD_USER_PILL':
    case 'ADD_CUSTOM_PILL':
      return { ...state, pill_list: state.pill_list.concat(action.payload) };
    case 'SET_IMAGE_ID':
      return { ...state, image_id: action.image_id };
    case 'DELETE_USERPILL':
      return { ...state, pill_list: state.pill_list.filter(({ id }) => id !== action.payload) };
    case 'GET_PILL':
    case 'ADD_USER_PILLIMAGE':
      return { ...state, selected_pill: action.selected_pill };
    case 'SET_NEW_PILL':
      return { ...state, new_pill_id: action.new_pill_id };
    case 'CLEAR_LAZY_PILL':
      return { ...state, new_pill_id: -1, image_id: -1 };
    default:
      break;
  }
  return state;
};

export default PillReducer;
