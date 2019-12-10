import { push } from 'connected-react-router';
import ax from '../../api/index';
import { handleDialogClose } from './dialogAction';

export const getUserPills_ = (pillList) => ({ type: 'GET_USER_PILLS', pill_list: pillList });

export const getUserPills = () => (dispatch) => ax.get('/api/pill/')
  .then((res) => {
    dispatch(getUserPills_(res.data));
  });
export const addUserPill_ = (newPillObj) => ({ type: 'ADD_USER_PILL', payload: newPillObj });

export const addUserPill = (pillId) => (dispatch) => {
  ax.post(`/api/pill/${pillId}/`)
    .then((res) => {
      dispatch(addUserPill_(res.data));
      dispatch(push('/dashboard'));
      dispatch(handleDialogClose());
    })
    .catch((err) => { alert('This pill is already in your list. If not, contact the developers!'); console.log(err); });
};

export const addUserPillByName = (pillName) => (dispatch) => {
  ax.post('/api/pill/name/', { pill_name: pillName })
    .then((res) => {
      dispatch(addUserPill_(res.data));
      dispatch(push('/dashboard'));
    })
    .catch((err) => { alert(`Either this pill is already registered or the pill with this name doesn't exist in our database.\nPlease check again.`); console.log(err); });
};

export const deleteUserPill_ = (id) => ({ type: 'DELETE_USERPILL', payload: id });

export const deleteUserPill = (id) => (dispatch) => {
  ax.delete(`/api/pill/${id}/`)
    .then(() => {
      dispatch(deleteUserPill_(id));
    });
};

export const getPill_ = (selectedPill) => ({ type: 'GET_PILL', selected_pill: selectedPill });

export const getPill = (id) => (dispatch) => {
  ax.get(`/api/pill/${id}/`)
    .then((res) => {
      dispatch(getPill_(res.data));
    });
};
