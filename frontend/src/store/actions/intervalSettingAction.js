import ax from '../../api/index';

export const getIntervals = () => (dispatch) => ax.get('/api/notification-interval/')
  .then((res) => {
    dispatch({ type: 'GET_INTERVALS', intervalsList: res.data });
  });

export const postInterval = (intervalItem) => (dispatch) => ax.post('/api/notification-interval/', intervalItem)
  .then((res) => {
    dispatch({ type: 'POST_INTERVALS', intervalItem: res.data });
  });

export const deleteInterval = (intervalId) => (dispatch) => ax.delete('/api/notification-interval/', { data: intervalId })
  .then(() => {
    dispatch({ type: 'DELETE_INTERVAL', deleteId: intervalId });
  });

export const editInterval = (intervalItem) => (dispatch) => ax.put('/api/notification-interval/', intervalItem)
  .then(() => {
    dispatch({ type: 'EDIT_INTERVAL', intervalItem });
  });

export const editSendTime = (sendItem) => (dispatch) => {
  dispatch({ type: 'EDIT_SEND_TIME', sendItem });
};
