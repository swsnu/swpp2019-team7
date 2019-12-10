const initState = {
  open: true,
};

const DialogReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'CLOSE_DIALOG':
      return {
        ...state, open: false,
      };
    case 'RESET_DIALOG':
      console.log('reset dialog to TRUE');
      return {
        ...state, open: true,
      };
    default:
      break;
  }
  return state;
};

export default DialogReducer;
