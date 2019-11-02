import axios from 'axios';
// import { push } from 'connected-react-router';

export const getUserPills_ = (pillList) => ({ type: 'GET_USERPILLS', pill_list: pillList });

export const getUserPills = (id) => (dispatch) => axios.get(`/api/pill/user_id/${id}`)
  .then((res) => dispatch(getUserPills_(res.data)));

export const getPillData_ = (selectedPill) => ({ type: 'GET_PILLDATA', selected_pill: selectedPill });

export const getPillData = (id) => (dispatch) => axios.get(`/api/pill/${id}`)
  .then((res) => dispatch(getPillData_(res.data)));

/*
export const addUserPill_ = () => ({ type: 'ADD_USERPILL' });

export const addUserPill = (id, pill) => (dispatch) => axios.post(`/api/pill/user_id/${id}`, pill)
  .then(() => {
    dispatch(addUserPill_()); // You have to think of the backend!
  });

export const editPillSetting_ = () => ({ type: 'EDIT_PILLSETTING' });

export const editPillSetting = (id, pill) => (dispatch) => axios.put(`/api/pill${id}`, pill)
  .then(() => {
    dispatch(editPillSetting_());
  });

export const deleteUserPill_ = () => ({ type: 'DELETE_USERPILL' });

export const deleteUserPill = (id) => (dispatch) => axios.delete(`/api/pill/user_id${id}`)
  .then(() => {
    dispatch(deleteUserPill_());
  });
*/