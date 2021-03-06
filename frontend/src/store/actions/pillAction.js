import { push } from 'connected-react-router';
import ax from '../../api/index';
import { handleDialogClose } from './dialogAction';

export const getUserPills_ = (pillList) => ({ type: 'GET_USER_PILLS', pill_list: pillList });

export const getUserPills = () => (dispatch) => ax.get('/api/pill/')
  .then((res) => {
    dispatch(getUserPills_(res.data));
  });
export const addUserPill_ = (newPillObj) => ({ type: 'ADD_USER_PILL', payload: newPillObj });

export const clearLazyPill_ = () => ({ type: 'CLEAR_LAZY_PILL' });
export const addUserPill = (pillId) => (dispatch) => {
  ax.post(`/api/pill/${pillId}/`)
    .then((res) => {
      dispatch(addUserPill_(res.data));
      dispatch(clearLazyPill_());
      console.log(res.data);
      dispatch(push('/dashboard'));
      dispatch(handleDialogClose());
    })
    .catch((err) => { alert('This pill is already in your list. If not, contact the developers!'); console.log(err); });
};

export const addLazyPill = (pillId, imageId) => (dispatch) => {
  ax.put('/api/vision/', {
    image_id: imageId,
  })
    .then(() => {
      ax.post(`/api/pill/${pillId}/`)
        .then((res) => {
          dispatch(addUserPill_(res.data));
          dispatch(clearLazyPill_());
        })
        .catch((err) => { alert('This pill is already in your list. If not, contact the developers!'); console.log(err); });
    });
};

export const setNewPill_ = (pillId) => ({ type: 'SET_NEW_PILL', new_pill_id: pillId });

export const setNewPill = (pillId) => (dispatch) => {
  dispatch(setNewPill_(pillId));
};
export const setRenderCustomPill_ = (key) => ({ type: 'SET_RENDER_CUSTOM', render_custompill: key });

export const setRenderCustomPill = (key) => (dispatch) => {
  dispatch(setRenderCustomPill_(key));
};

export const addCustomPill_ = (newPillObj) => ({ type: 'ADD_CUSTOM_PILL', payload: newPillObj });

export const addCustomPill = (newPillObj, imageId) => (dispatch) => {
  console.log('at ac');
  console.log(imageId);
  ax.post('/api/custompill/', {
    take_method: newPillObj.take_method,
    product_name: newPillObj.product_name,
    expiration_date: newPillObj.expiration_date,
    functions: newPillObj.take_method,
    store_method: newPillObj.store_method,
    company_name: newPillObj.company_name,
    standards: newPillObj.standards,
    precautions: newPillObj.precautions,
    take_method_preprocessed: newPillObj.take_method,
    image_id: imageId,
  })
    .then((res) => {
      dispatch(addCustomPill_(res.data));
      dispatch(push('/dashboard'));
    })
    .catch(() => { alert('Error in adding custom pill'); });
};

export const setImageId_ = (imageId) => ({ type: 'SET_IMAGE_ID', image_id: imageId });

export const setImageId = (imageId) => (dispatch) => {
  dispatch(setImageId_(imageId));
};

export const addUserPillByNameAndCompany = (pillName, pillCompany) => (dispatch) => {
  ax.post('/api/pill/name/', { pill_name: pillName, pill_company: pillCompany })
    .then((res) => {
      dispatch(addUserPill_(res.data));
      dispatch(push('/dashboard'));
    })
    .catch((err) => { alert('Either this pill is already registered or the pill with this name doesn\'t exist in our database.\nPlease check again.'); console.log(err); });
};

export const addUserPillImage_ = (newPillObj) => ({ type: 'ADD_USER_PILLIMAGE', selected_pill: newPillObj });

export const addUserPillImage = (pillImage, id) => (dispatch) => {
  ax.post(`/api/pill/${id}/image`, pillImage, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      console.log(res.data);
      dispatch(addUserPillImage_(res.data));
    })
    .catch((err) => { console.log(err); alert('Your image file is not valid. Please check again.'); });
};

export const deleteUserPill_ = (id) => ({ type: 'DELETE_USERPILL', payload: id });

export const deleteUserPill = (id) => (dispatch) => {
  console.log('hw');
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
