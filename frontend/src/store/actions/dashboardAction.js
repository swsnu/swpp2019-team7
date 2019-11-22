export const changeDashboard = (number) => (dispatch) => {
  console.log(number);
  dispatch({
    type: 'CHANGE_DASHBOARD', itemNo: number,
  });
};
