import axios from 'axios';
import { getCommand } from './session.action';

export const CREATE_USER = 'CREATE_USER';
export const CONNEXION_STATUS = 'CONNEXION_STATUS';
export const DISCONNECT_USER = 'DISCONNECT_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const CREATE_USERSTORE = 'CREATE_USERSTORE';
export const CONNECTUSER = 'CONNECTUSE';

export const connectuseraction = (data) => {
    return (dispatch) => {
        return dispatch({ type: CONNECTUSER, payload: data });
    }
}

export const createUser = (data) => {
    return (dispatch) => {
        return axios.post('https://web.axel.mg/createaccount', data).then(() => {
            dispatch({ type: CREATE_USER, payload: data });
        });
    }
}

export const updateUser = (data) => {
    return (dispatch) => {
        return axios.put('https://web.axel.mg/updateinfo', data).then(() => {
            dispatch({ type: UPDATE_USER, payload: data });
        });
    }
}


export const connectUser = (data) => {
    return (dispatch) => {
        return axios.post('https://web.axel.mg/connectme', data).then((res) => {
            dispatch({ type: CONNEXION_STATUS, payload: res.data });
        });
    }
}

export const disconnectUser = () => {
    return (dispatch) => {
        return axios.get('https://web.axel.mg/disconnect').then((res) => {
            dispatch({type: DISCONNECT_USER, payload: res.data})
        })
    }
}
