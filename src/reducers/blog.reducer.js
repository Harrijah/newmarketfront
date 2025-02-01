import { ADD_BLOG, GET_BLOG } from "../action/blog.action";

const initialState = {
    articles: null
}

export const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BLOG:
            sessionStorage.setItem('blog', JSON.stringify(action.payload));
            return {
                articles: JSON.parse(sessionStorage.getItem('blog'))
            }
        case GET_BLOG:
            sessionStorage.setItem('blog', JSON.stringify(action.payload));
            return {
                articles: JSON.parse(sessionStorage.getItem('blog'))
            }
        default:
            return state;
    }
}