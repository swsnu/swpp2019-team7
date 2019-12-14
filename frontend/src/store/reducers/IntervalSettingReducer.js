const initState = {
  intervalsList: [],
};


const IntervalSettingReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'GET_INTERVALS':
      return { ...state, intervalsList: action.intervalsList };
    case 'POST_INTERVALS':
      return { ...state, intervalsList: state.intervalsList.concat(action.intervalItem) };
    default:
      break;
  }
  return state;
};

export default IntervalSettingReducer;
