export const handleDialogClose = () => (dispatch) => {
  dispatch({
    type: 'CLOSE_DIALOG',
    open: false,
  });
};
