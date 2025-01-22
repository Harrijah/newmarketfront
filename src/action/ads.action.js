import { type } from "@testing-library/user-event/dist/type";
import axios from "axios"
export const ADD_PUB = 'ADD_PUB';
export const GET_PUB = 'GET_PUB';
export const SHOW_PUB = 'SHOW_PUB';
export const AD_STATE = 'AD_STATE';

export const addMyAds = (data) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('userid', data.userid);
        formData.append('storeid', data.storeid);
        formData.append('titre', data.titre);
        formData.append('texte', data.texte);
        formData.append('lien', data.lien);

        if (data.imagepub) formData.append('imagepub', data.imagepub);
        console.log(formData);
        return axios.post('https://web.axel.mg/addads', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
            dispatch({ type: ADD_PUB, payload: res.data })
        }).catch((error) => {
            console.error('Erreur lors de l\'envoi de la pub', error)
        });
    }
}

export const getMyAds = () => {
    return (dispatch) => {
        return axios.get('https://web.axel.mg/getads').then(res => (
            dispatch({ type: GET_PUB, payload: res.data })
        ));
    }
}

export const showad = (data) => {
    return (dispatch) => {
        return dispatch({ type: SHOW_PUB, payload: data });
    }
}

export const updateAdState = (data) => {
    return (dispatch) => {
        console.log(data);
        
        return axios.post(`https://web.axel.mg/updatead`, data).then(res => (
            dispatch({ type: AD_STATE, payload: res.data })
        ));
    }
}

