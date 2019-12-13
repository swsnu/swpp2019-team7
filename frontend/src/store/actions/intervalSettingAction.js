import ax from '../../api/index';

export const getIntervals = () => (dispatch) => ax.get('/api/notification-interval/')
  .then((res) => {
    dispatch({ type: 'GET_INTERVALS', intervalsList: res.data });
  });

export const postInterval = (intervalItem) => (dispatch) => ax.post('/api/notification-interval/', intervalItem)
  .then((res) => {
    console.log('intervalSettingAction: ', res.data);
    dispatch({ type: 'POST_INTERVALS', intervalItem: res.data });
  });

export const editInterval = (webnotiItem) => (dispatch) => ax.put(`/api/webnoti/${webnotiItem.id}/`, webnotiItem)
  .then((res) => {
    dispatch({ type: 'EDIT_WEBNOTI', webnoti_list: res.data });
  });
