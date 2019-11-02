import axios from 'axios';
import { push } from 'connected-react-router';

export const signupUser = (user) => (dispatch) => axios.post('/api/user/signup/', user)
  .then(() => {
    dispatch({ type: 'SIGNUP_USER' });
    dispatch(push('/login'));
  })
  .catch((err) => { console.log('error!'); console.log(err); });

export const signinUser = (user) => (dispatch) => axios.post('/api/user/signin/', user)
  .then(() => {
    dispatch({ type: 'SIGNIN_USER', logged_in: true });
    dispatch(push('/dashboard'));
  })
  .catch((err) => console.log(err));
// We need a button for this function!
export const signoutUser = () => (dispatch) => axios.get('/api/user/signout/')
  .then(() => {
    dispatch({ type: 'SIGNOUT_USER', logged_in: false });
    dispatch(push('/landing'));
  })
  .catch((err) => console.log(err));


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
