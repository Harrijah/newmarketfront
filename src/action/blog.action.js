import axios from "axios";

export const ADD_BLOG = 'ADD_BLOG';
export const GET_BLOG = 'GET_BLOG';

export const addNewBlog = (data) => {
    return (dispatch) => {
        const formdata = new FormData();
        formdata.append('userid', data.userid);
        formdata.append('storeid', data.storeid);
        formdata.append('title', data.title);
        formdata.append('categorie', data.categorie);
        formdata.append('content', data.content);
        if (data.couverture) formdata.append('couverture', data.couverture);
        
        return axios.post('https://web.axel.mg/addblog', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => dispatch({ type: ADD_BLOG, payload: res.data }))
            .catch((e) => console.error('Erreur lors de l\'envoi', e)); 
    }

}

export const getBlogs = () => {
    return (dispatch) => {
        return axios.get('https://web.axel.mg/getblog').then((res) => dispatch({type: GET_BLOG, payload: res.data})
        );
    }
}