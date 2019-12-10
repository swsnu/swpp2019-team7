export const changeDashboard = (number) => (dispatch) => {
  dispatch({
    type: 'CHANGE_DASHBOARD', itemNo: number,
  });
};

