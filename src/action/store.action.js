import axios from "axios";

export const CREATE_STORE = 'CREATE_STORE';
export const GET_STOREDATA = 'GET_STOREDATA';
export const UPDATE_STORE = 'UPDATE_STORE';
export const GET_ALLSTORE = 'GET_ALLSTORE';

export const createstore = (data) => {
    return (dispatch) => {
        return axios.post('https://web.axel.mg/createnewstore', data).then(() => {
            dispatch({ type: CREATE_STORE, payload: data });
        });
    }
}
export const getstoredata = (id) => {
    return (dispatch) => {
        return axios.get(`https://web.axel.mg/getstore/${id}`).then((res) => {
            dispatch({ type: GET_STOREDATA, payload: res.data });
        });
    }
}
export const getallstore = () => {
    return (dispatch) => {
        return axios.get('https://web.axel.mg/getallstore').then((res) => {
            dispatch({ type: GET_ALLSTORE, payload: res.data });
        });
    }
}
export const updatestore = (data) => {
    return (dispatch) => {
        return axios.put('https://web.axel.mg/updatestoreinfo', data).then(() => {
            dispatch({type: UPDATE_STORE, payload: data});
         });
    }
}