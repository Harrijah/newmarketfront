import axios from "axios";

export const ADD_SOUSCAT = 'ADD_SOUSCAT';
export const GET_SOUSCAT = 'GET_SOUSCAT';


export const addsouscat = (data) => {
    return (dispatch) => {
        return axios.post('https://web.axel.mg/addsouscat', data).then((res) => {
            dispatch({ type: ADD_SOUSCAT, payload: res.data });
        });
    }
}

export const getsouscat = () => {
    return (dispatch) => {
        return axios.get('https://web.axel.mg/getsouscat').then((res) => {
            dispatch({ type: GET_SOUSCAT, payload: res.data });
        });
    }
}