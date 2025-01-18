import { ADD_PUB, GET_PUB } from "../action/ads.action";

const initialState = { myads: null }


export const adsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PUB:
            return { myads: action.payload }
        
        case GET_PUB:
            return { myads: action.payload }
        default:
            return state;
    }
}