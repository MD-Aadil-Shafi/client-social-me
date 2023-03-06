import { privateRequest } from '../axios'
import {GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS, GET_SINGLE_USER_FAIL,
    GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAIL, 
    GET_FRIENDLIST_REQUEST, GET_FRIENDLIST_SUCCESS,
    GET_FRIENDLIST_FAIL,
    FOLLOW_UNFOLLOW_REQUEST, FOLLOW_UNFOLLOW_SUCCESS,
    FOLLOW_UNFOLLOW_FAIL
    } from '../constants/userConstants'

import { userLogoutAction } from './authAction'

export const getSingleUser = (uType,val) => async(dispatch)=>{
    try{
        dispatch({type: GET_SINGLE_USER_REQUEST})
        let data;
        if(uType === 'userId'){
            data = await privateRequest.get(`/user/info?userId=${val}`)
        }else if(uType === "username"){
            data = await privateRequest.get(`/user/info?username=${val}`)
        }
        dispatch({
            type: GET_SINGLE_USER_SUCCESS,
            payload: data?.data
        })
        return data?.data;
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({
            type: GET_SINGLE_USER_FAIL,
            payload: error?.response && error?.response?.data?.error
        })
    }

}

export const getFriendList = (username) => async(dispatch)=>{
    try{
        dispatch({type: GET_FRIENDLIST_REQUEST})
        const data = await privateRequest.get(`/user/friends`)
        dispatch({
            type: GET_FRIENDLIST_SUCCESS,
            payload: data?.data?.data
        })
        return data?.data;
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({
            type: GET_FRIENDLIST_FAIL,
            payload: error?.response && error?.response?.data?.error
        })
    }

}

export const getUserList = () => async(dispatch)=>{
    try{
        console.log('getUserlIst')
        dispatch({type: GET_ALL_USER_REQUEST})
        const {data} = await privateRequest.get(`/user/add/view`)
        dispatch({type: GET_ALL_USER_SUCCESS, payload: data?.data})
        return data;
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: GET_ALL_USER_FAIL, payload: error?.response && error?.response?.data?.error
        })
    }

}

export const followUnfollowAction = (username) => async(dispatch)=>{
    try{
        dispatch({type: FOLLOW_UNFOLLOW_REQUEST})
        const {data} = await privateRequest.patch(`/user/${username}/follow`);
        dispatch({
            type: FOLLOW_UNFOLLOW_SUCCESS,
            payload: data?.data?.message
        })
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({
            type: FOLLOW_UNFOLLOW_FAIL,
            payload: error?.response && error?.response?.data?.error
        })
    }
}