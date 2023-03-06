import {
    GET_USER_ALL_POST_REQUEST,
    GET_USER_ALL_POST_SUCCESS,
    GET_USER_ALL_POST_FAIL,
    GET_OTHERS_TIMELINE_POST_REQUEST,
    GET_OTHERS_TIMELINE_POST_SUCCESS,
    GET_OTHERS_TIMELINE_POST_FAIL,
    GET_SINGLE_POST_REQUEST,
    GET_SINGLE_POST_SUCCESS,
    GET_SINGLE_POST_FAIL,
    CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL,
    UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, UPDATE_POST_FAIL,
    DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAIL,
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAIL,
} from '../constants/postConstants'

import { privateRequest, publicRequest } from '../axios'
import { userLogoutAction } from './authAction'



export const getUserAllPostAction =()=> async(dispatch)=>{
    try{
        dispatch({type:GET_USER_ALL_POST_REQUEST})

        const data = await privateRequest.get('/post/all');

        dispatch({type: GET_USER_ALL_POST_SUCCESS, payload: data?.data})
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: GET_USER_ALL_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}

export const getOthersTimelinePostAction =(username)=> async(dispatch)=>{
    try{
        // dispatch({type:GET_OTHERS_TIMELINE_POST_REQUEST}) //commented to show instant result

        const data = await privateRequest.get(`/post/timeline/${username}`);

        dispatch({type: GET_OTHERS_TIMELINE_POST_SUCCESS, payload: data?.data})
        return data?.data;
    }catch(error){
        console.log(error?.response?.data?.error)
        //if (error?.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: GET_OTHERS_TIMELINE_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}

export const getSinglePostAction =(id)=> async(dispatch)=>{
    try{
        dispatch({type:GET_SINGLE_POST_REQUEST})

        const data = await privateRequest.get(`/post/${id}`);

        dispatch({type: GET_SINGLE_POST_SUCCESS, payload: data?.data})
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: GET_SINGLE_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}

export const createPostAction =(postData)=> async(dispatch)=>{
    try{
        dispatch({type:CREATE_POST_REQUEST})

        const data = await privateRequest.post(`/post`,postData);

        dispatch({type: CREATE_POST_SUCCESS, payload: data?.data})
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: CREATE_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}

export const updatePostAction =(id,postData)=> async(dispatch)=>{
    try{
        dispatch({type:UPDATE_POST_REQUEST})

        const data = await privateRequest.patch(`/post/${id}`,postData);

        dispatch({type: UPDATE_POST_SUCCESS, payload: data?.data})
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: UPDATE_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}

export const likeUnlikePostAction =(id,type)=> async(dispatch)=>{
    try{
        dispatch({type:LIKE_POST_REQUEST})

        const {data} = await privateRequest.patch(`/post/like/${id}`,{likeType:type});

        dispatch({type: LIKE_POST_SUCCESS, payload: data?.message})
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: LIKE_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}


export const deletePostAction =(id)=> async(dispatch)=>{
    try{
        dispatch({type:DELETE_POST_REQUEST})

        const {data} = await privateRequest.delete(`/post/${id}`);
        console.log('datadel',data)

        dispatch({type: DELETE_POST_SUCCESS, payload: data?.data?.message})
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: DELETE_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}


export const commentPostAction =(id,comment)=> async(dispatch)=>{
    try{
        dispatch({type:LIKE_POST_REQUEST})

        const {data} = await privateRequest.post(`/post/comment/${id}`,{comment});

        dispatch({type: LIKE_POST_SUCCESS, payload: data?.message})
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: LIKE_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}



export const commentLikeUnlikeAction =(id,commentId)=> async(dispatch)=>{
    try{
        dispatch({type:LIKE_POST_REQUEST})

        const {data} = await privateRequest.patch(`/post/comment/${id}`,{commentId});

        dispatch({type: LIKE_POST_SUCCESS, payload: data?.message})
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: LIKE_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}


export const commentDeleteAction =(id,commentId)=> async(dispatch)=>{
    try{
        dispatch({type:LIKE_POST_REQUEST})

        const {data} = await privateRequest.delete(`/post/comment/${id}/${commentId}`);

        dispatch({type: LIKE_POST_SUCCESS, payload: data?.message})
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: LIKE_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}


export const commentReportAction =(id,commentId, reportMessage)=> async(dispatch)=>{
    try{
        dispatch({type:LIKE_POST_REQUEST})

        const {data} = await privateRequest.patch(`/post/comment/report/${id}`,{commentId, reportMessage});

        dispatch({type: LIKE_POST_SUCCESS, payload: data?.message})
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: LIKE_POST_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
    }
}