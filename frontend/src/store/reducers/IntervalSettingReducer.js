const initState = {
  intervalsList: [],
  editSendHour: '',
  editSendMin: '',
};


const IntervalSettingReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'GET_INTERVALS':
      return { ...state, intervalsList: action.intervalsList };
    case 'POST_INTERVALS':
      return { ...state, intervalsList: state.intervalsList.concat(action.intervalItem) };
    case 'DELETE_INTERVAL':
      return { ...state, intervalsList: state.intervalsList.filter(({ id }) => id !== action.deleteId.id) };
    case 'EDIT_INTERVAL':
      return {
        ...state,
        intervalsList: state.intervalsList.map(
          (interval) => (interval.id === action.intervalItem.id ? action.intervalItem : interval),
        ),
      };
    case 'EDIT_SEND_TIME':
      return { ...state, editSendHour: action.sendItem.sendHour, editSendMin: action.sendItem.sendMin };
    default:
      break;
  }
  return state;
};

export default IntervalSettingReducer;
