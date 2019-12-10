export const handleDialogClose = () => (dispatch) => {
  dispatch({
    type: 'CLOSE_DIALOG',
    open: false,
  });
};

export const handleDialogReset = () => (dispatch) => {
  dispatch({
    type: 'RESET_DIALOG',
    open: true,
  });
};
