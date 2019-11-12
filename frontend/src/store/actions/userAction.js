import Cookies from 'js-cookie';
import { push } from 'connected-react-router';

import ax from '../../api/index';

export const signinUser = (user) => (dispatch) => ax.post('/api/user/signin/', user)
  .then(() => {
    ax.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');
    localStorage.setItem('localCsrf', JSON.stringify(Cookies.get('csrftoken')));
    dispatch({ type: 'SIGNIN_USER', logged_in: true });
    dispatch(push('/dashboard'));
  })
  .catch((err) => { alert('Either your email or password is wrong. Please try again.'); console.log(err); });

export const signoutUser = () => (dispatch) => ax.get('/api/user/signout/')
  .then((response) => {
    localStorage.setItem('localCsrf', JSON.stringify(''));
    dispatch({ type: 'SIGNOUT_USER', logged_in: false, current_user: null });
    dispatch(push('/landing'));
  })
  .catch((err) => console.log(err));

export const signupUser = (user) => (dispatch) => ax.post('/api/user/signup/', user)
  .then(() => {
    dispatch({ type: 'SIGNUP_USER', logged_in: false, current_user: null });
    dispatch(push('/login'));
  })
  .catch((err) => { alert('The email already exists. Please log in if you are a returning user.\n If not, please double check your email'); console.log('error!'); console.log(err); });


export const editUserInfo = (user) => (dispatch) => {
  console.log(user); ax.put('/api/user/', user)
    .then((res) => {
      dispatch({ type: 'EDIT_USERINFO', logged_in: true, current_user: res.data });
    });
};

export const getUser = () => (dispatch) => ax.get('/api/user/')
  .then((res) => {
    dispatch({ type: 'GET_USER', logged_in: true, current_user: res.data });
  })
  .catch(() => { alert('Cannot find user in backend to /api/user/'); });

export const editNoti = (noti) => (dispatch) => {
  console.log(noti);
  ax.put('/api/user/notisetting/', noti)
    .then((res) => {
      dispatch({ type: 'EDIT_NOTI', logged_in: true, noti_setting: res.data });
    });
};

export const getNoti = () => (dispatch) => ax.get('/api/user/notisetting/')
  .then((res) => {
    console.log(res.data);
    dispatch({ type: 'GET_NOTI', logged_in: true, noti_setting: res.data });
  })
  .catch(() => { alert('Cannot find notification in backend to /api/user/notisetting/'); });
