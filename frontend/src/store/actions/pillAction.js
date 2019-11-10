import Cookies from 'js-cookie';
import ax from '../../api/index';

export const getUserPills_ = (pillList) => ({ type: 'GET_USER_PILLS', pill_list: pillList });

export const getUserPills = (id) => (dispatch) => ax.get(`/api/pill/${id}`)
  .then((res) => {
    dispatch(getUserPills_(res.data));
  });
export const addUserPill_ = (newPillObj) => ({ type: 'ADD_USER_PILL', payload: newPillObj });

export const addUserPill = (pillId) => (dispatch) => {
  ax.post(`/api/pill/${pillId}/`)
    .then((res) => {
      dispatch(addUserPill_(res.data));
    });
};

export const deleteUserPill_ = (id) => ({ type: 'DELETE_USERPILL', payload: id });

export const deleteUserPill = (id) => (dispatch) => {
  ax.delete(`/api/pill/${id}`)
    .then(() => {
      dispatch(deleteUserPill_(id));
    });
};
