import { AD_STATE, ADD_PUB, GET_PUB, SHOW_PUB } from "../action/ads.action";

const initialState = {
    myads: sessionStorage.getItem('myads') ? sessionStorage.getItem('myads') : '',
    adpos: 0,
    adstatus: false,
    id: ''
}


export const adsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PUB:
            sessionStorage.setItem('myads', JSON.stringify(action.payload));
            return {
                myads: JSON.parse(sessionStorage.getItem('myads')),
                adpos: 0,
                adstatus: false,
                id: ''
            }
        
        case GET_PUB:
            sessionStorage.setItem('myads', JSON.stringify(action.payload));
            console.log(JSON.parse(sessionStorage.getItem('myads')));
            return {
                myads: JSON.parse(sessionStorage.getItem('myads')),
                adpos: 0,
                adstatus: false,
                id: ''
            }
        
        case SHOW_PUB:
            return {
                myads: JSON.parse(sessionStorage.getItem('myads')),
                adpos: action.payload.adpos,
                adstatus: action.payload.adstatus,
                id: action.payload.id
            }
        
        case AD_STATE:
            sessionStorage.setItem('myads', JSON.stringify(action.payload));
            console.log(action.payload);
            
            return {
                myads: JSON.parse(sessionStorage.getItem('myads')),
                adpos: 0,
                adstatus: false,
                id: ''
            }
        
        default:
            return state;
    }
}