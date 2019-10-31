import axios from 'axios';
import { push } from 'connected-react-router';

export const getUserPills_ = (pillList) => {
    return { type: "GET_USERPILLS", pill_list: pillList }
}

export const getUserPills = (id) => {
    return dispatch => {
        return axios.get('/api/pill/user_id/'+id)
            .then(res => dispatch(getUserPills_(res.data)))
    }
}

export const getPillData_ = (selectedPill) => {
    return { type: "GET_PILLDATA", selected_pill: selectedPill }
}

export const getPillData = (id) => {
    return dispatch => {
        return axios.get('/api/pill/'+id)
            .then(res => dispatch(getPillData_(res.data)))
    }
}

export const addUserPill_ = () => {
    return { type: "ADD_USERPILL"}
}

export const addUserPill = (id, pill) => {
    return dispatch => {
        return axios.post('/api/pill/user_id/'+id, pill)
            .then(res => {
                dispatch(addUserPill_());   //You have to think of the backend!
            })
    }
}

export const editPillSetting_ = () => {
    return { type: "EDIT_PILLSETTING"}
}

export const editPillSetting = (id, pill) => {
    return dispatch => {
        return axios.put('/api/pill'+id, pill)
            .then(res => {
                dispatch(editPillSetting_());
            })
    }
}

export const deleteUserPill_ = () => {
    return { type: "DELETE_USERPILL"}
}

export const deleteUserPill = (id) => {
    return dispatch => {
        return axios.delete('/api/pill/user_id'+id)
            .then(res => {
                dispatch(deleteUserPill_());
            })
    }
}