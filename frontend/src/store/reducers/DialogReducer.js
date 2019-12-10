const initState = {
  open: true,
};

const DialogReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'CLOSE_DIALOG':
      console.log('reducer');
      return {
        ...state, open: false,
      };
    default:
      break;
  }
  return state;
};

export default DialogReducer;
