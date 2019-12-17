import Cookies from 'js-cookie';
import { push } from 'connected-react-router';

import ax from '../../api/index';

export const signinUser = (user) => (dispatch) => ax.post('/api/user/signin/', user)
  .then((res) => {
    ax.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');
    localStorage.setItem('localCsrf', JSON.stringify(Cookies.get('csrftoken')));
    dispatch({
      type: 'SIGNIN_USER', logged_in: true, noti_setting: res.data.noti, current_user: res.data.user,
    });
    dispatch(push('/dashboard'));
  })
  .catch((err) => { alert('Either your email or password is wrong. Please try again.'); console.log(err); });

export const getUserInfo = () => (dispatch) => ax.get('/api/user/')
  .then((res) => {
    dispatch({
      type: 'GET_USERINFO', current_user: res.data,
    });
  });

export const signoutUser = () => (dispatch) => ax.get('/api/user/signout/')
  .then(() => {
    localStorage.setItem('localCsrf', JSON.stringify(''));
    dispatch({ type: 'SIGNOUT_USER', logged_in: false, current_user: null });
    dispatch(push('/landing'));
  })
  .catch((err) => console.log(err));

export const signupUser = (user) => (dispatch) => ax.post('/api/user/signup/', user)
  .then((res) => {
    ax.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');
    localStorage.setItem('localCsrf', JSON.stringify(Cookies.get('csrftoken')));
    dispatch({
      type: 'SIGNUP_USER', logged_in: true, noti_setting: res.data.noti, current_user: res.data.user,
    });
    dispatch(push('/dashboard'));
  })
  .catch((err) => { alert('The email already exists. Please log in if you are a returning user.\n If not, please double check your email'); console.log(err); });

export const editUserInfo = (user) => (dispatch) => ax.put('/api/user/', user)
  .then((res) => {
    dispatch({ type: 'EDIT_USERINFO', logged_in: true, current_user: res.data });
    alert('Successfully changed!');
  })
  .catch((err) => { alert('Internal Error'); console.log(err); });

export const editNoti = (noti) => (dispatch) => ax.put('/api/user/noti-setting/', noti)
  .then((res) => {
    dispatch({ type: 'EDIT_NOTI', logged_in: true, noti_setting: res.data });
  });

export const registerUserDevice = (token) => () => {
  console.log('token is {token}');
  console.log(token);
  ax.post('/api/registerdevice/', token)
    .catch((err) => console.log(err));
};

export const deleteUserDevice = (token) => () => {
  ax.delete('/api/registerdevice/', token)
    .catch((err) => console.log(err));
};
