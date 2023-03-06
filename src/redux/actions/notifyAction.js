import {
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAIL,
    CLEAR_NOTIFICATION_REQUEST,
    CLEAR_NOTIFICATION_SUCCESS,
    CLEAR_NOTIFICATION_FAIL
} from '../constants/notificationConstants'
import { privateRequest } from '../axios'


export const getNotificationAction = () => async(dispatch)=>{
    try{
        dispatch({type:GET_NOTIFICATION_REQUEST})
        const {data} = await privateRequest.get('/notification')
        console.log('Ndata', data)
        dispatch({type: GET_NOTIFICATION_SUCCESS, payload: data?.data})
        return data?.data
    }catch(error){
        dispatch({type: GET_NOTIFICATION_FAIL,
        payload: error?.response && error?.response?.data?.error })
    }
}

export const clearNotificationAction = () => async(dispatch)=>{
    try{
        dispatch({type: CLEAR_NOTIFICATION_REQUEST})
        const {data} = await privateRequest.delete('/notification')
        console.log('Ndata', data)
        dispatch({type: CLEAR_NOTIFICATION_SUCCESS, payload: data?.message})
        return data?.message
    }catch(error){
        dispatch({type: CLEAR_NOTIFICATION_FAIL,
        payload: error?.response && error?.response?.data?.error })
    }
}