
import ax from '../../api/index';

export const getWebnoti = () => (dispatch) => ax.post('/api/webnoti/')
  .then((res) => {
    dispatch({ type: 'GET_WEBNOTI', web_noti: res.data });
  });


/*
* webnoti_item is a specific item for a specific pill
* {id: 1, activated: true, time: [0900, 1200]}
*/
export const editWebnoti = (webnotiItem) => (dispatch) => ax.put(`/api/webnoti/${webnotiItem.id}`, webnotiItem)
  .then((res) => {
    dispatch({ type: 'EDIT_WEBNOTI', web_noti: res.data });
  });
