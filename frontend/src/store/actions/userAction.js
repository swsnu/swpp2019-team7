import { push } from 'connected-react-router';

import ax from '../../api/index';

export const signinUser = (user) => (dispatch) => ax.post('/api/user/signin/', user)
  .then(() => {
    dispatch({ type: 'SIGNIN_USER', logged_in: true });
    dispatch(push('/dashboard'));
  })
  .catch((err) => { alert('Either your email or password is wrong. Please try again.'); console.log(err); });
// We need a button for this function!
export const signoutUser = () => (dispatch) => ax.get('/api/user/signout/')
  .then((response) => {
    console.log(response);
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

export const registerUserDevice = (token) => (dispatch) => {
  console.log(token); axios.post('/api/registerdevice/', token)
    .then(() => {

    })
    .catch((err) => console.log(err));
}
/*
export const getUserInfo_ = (current_user) => {
    return { type: "GET_USERINFO", current_user: current_user }
}

export const getUserInfo = (id) => {
    return dispatch => {
        return axios.get('/api/user/' + id)
            .then(res => dispatch(getUserInfo_(res.data.current_user)))
    }
}

export const editUserInfo_ = (current_user) => {
    return { type: "EDIT_USERINFO", current_user: current_user }
}

export const editUserInfo = (id, user) => {
    return dispatch => {
        return axios.put('/api/user/' + id, user)
            .then(res => {
                dispatch(editUserInfo_(res.data.current_user));
            })
    }
}

*/
