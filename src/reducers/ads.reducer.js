import { ADD_PUB, GET_PUB, SHOW_PUB } from "../action/ads.action";

const initialState = {
    myads: localStorage.getItem('myads') ? localStorage.getItem('myads') : '',
    adpos: 0,
    adstatus: false,
    id: ''
}


export const adsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PUB:
            localStorage.setItem('myads', JSON.stringify(action.payload));
            return {
                myads: JSON.parse(localStorage.getItem('myads')),
                adpos: 0,
                adstatus: false,
                id: ''
            }
        
        case GET_PUB:
            localStorage.setItem('myads', JSON.stringify(action.payload));
            return {
                myads: JSON.parse(localStorage.getItem('myads')),
                adpos: 0,
                adstatus: false,
                id: ''
            }
        
        case SHOW_PUB:
            return {
                myads: JSON.parse(localStorage.getItem('myads')),
                adpos: action.payload.adpos,
                adstatus: action.payload.adstatus,
                id: action.payload.id
            }
        default:
            return state;
    }
}