const initState = {
  itemNo: 0,
};

const DashboardReducer = (state = initState, action = null) => {
  if (action == null) return state;
  switch (action.type) {
    case 'CHANGE_DASHBOARD':
      console.log('reducer');
      console.log(action.itemNo);
      return {
        ...state, itemNo: action.itemNo,
      };
    default:
      break;
  }
  return state;
};

export default DashboardReducer;
