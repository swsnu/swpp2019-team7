import Cookies from 'js-cookie';
import ax from '../../api/index';

export const getUserPills_ = (pillList) => ({ type: 'GET_USER_PILLS', pill_list: pillList });

export const getUserPills = (id) => (dispatch) => ax.get(`/api/pill/${id}`)
  .then((res) => {
    // eslint-disable-next-line no-console
    console.log('[action] getUserPills -- res: ', res);
    dispatch(getUserPills_(res.data));
  });

// export const getPillData_ = (selectedPill) => ({ type: 'GET_PILLDATA', selected_pill: selectedPill });
//
// export const getPillData = (id) => (dispatch) => axios.get(`/api/pill/${id}`)
//   .then((res) => dispatch(getPillData_(res.data)));


export const addUserPill_ = (newPillObj) => ({ type: 'ADD_USER_PILL', payload: newPillObj });

export const addUserPill = (pillId) => (dispatch) => {
  ax.defaults.headers['X-CSRFToken'] = Cookies.get('csrftoken');
  console.log(ax.defaults.headers['X-CSRFToken']);
  ax.post(`/api/pill/${pillId}/`)
    .then((res) => {
      console.log('[action] addUserPill -- res.data: ', res.data);
      dispatch(addUserPill_(res.data));
    });
};

/*
export const editPillSetting_ = () => ({ type: 'EDIT_PILLSETTING' });

export const editPillSetting = (id, pill) => (dispatch) => axios.put(`/api/pill${id}`, pill)
  .then(() => {
    dispatch(editPillSetting_());
  });
*/
export const deleteUserPill_ = (id) => ({ type: 'DELETE_USERPILL', payload: id });

export const deleteUserPill = (id) => (dispatch) => {
  ax.defaults.headers['X-CSRFToken'] = Cookies.get('csrftoken');
  ax.delete(`/api/pill/${id}`)
    .then(() => {
      dispatch(deleteUserPill_(id));
    });
};
