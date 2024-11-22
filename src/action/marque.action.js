import axios from "axios";

export const GET_MARQUE = "GET_MARQUE";
export const ADD_MARQUE = 'ADD_MARQUE';

export const getMarque = () => {
    return (dispatch) => {
        return axios.get('https://web.axel.mg/getmarque').then((res) => {
            dispatch({ type: GET_MARQUE, payload: res.data });
        });
    }
}

export const addMarque = (data) => {
    return (dispatch) => {
        return axios.post('https://web.axel.mg/addmarque', data).then((res) => {
            dispatch({type: ADD_MARQUE, payload: res.data});
         });
    }
}