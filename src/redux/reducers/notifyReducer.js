import {
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAIL,
    CLEAR_NOTIFICATION_REQUEST,
    CLEAR_NOTIFICATION_SUCCESS,
    CLEAR_NOTIFICATION_FAIL,
    CLEAR_NOTIFICATION_STATE,
} from '../constants/notificationConstants'


export const notifyReducer = (state={loading:false, notification:null, message:null, error:null}, action)=>{
        switch(action.type){
            case GET_NOTIFICATION_REQUEST:
            case CLEAR_NOTIFICATION_REQUEST:
                return {loading: true};
            case GET_NOTIFICATION_SUCCESS:
                return {loading: false, notification: action.payload};
            case CLEAR_NOTIFICATION_SUCCESS:
                return {loading: false, notification:null, message: action.payload};
            case GET_NOTIFICATION_FAIL:
            case CLEAR_NOTIFICATION_FAIL:
                return {loading:false, error:action.payload};
            case CLEAR_NOTIFICATION_STATE:
                return {loading:false,message:null, error:null};
            default:
                return state;
        }
}