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
  .then(() => {
    localStorage.setItem('localCsrf', JSON.stringify(''));
    dispatch({ type: 'SIGNOUT_USER', logged_in: false });
    dispatch(push('/landing'));
  })
  .catch((err) => console.log(err));

export const signupUser = (user) => (dispatch) => ax.post('/api/user/signup/', user)
  .then(() => {
    dispatch({ type: 'SIGNUP_USER', logged_in: false });
    dispatch(push('/login'));
  })
  .catch((err) => { alert('The email already exists. Please log in if you are a returning user.\n If not, please double check your email'); console.log('error!'); console.log(err); });
  console.log("Delete user device:", token);
  ax.delete('/api/registerdevice/', token)
    .catch((err) => console.log(err))
};
