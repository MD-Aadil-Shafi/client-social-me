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
    CLEAR_POST_OPERATIONS,CLEAR_POST_OPERATIONS_WITHOUT_POSTS,
} from '../constants/postConstants'

export const getPostReducer = (state={loading:false, posts:null, error:null}, action)=>{
    switch(action.type){
        case GET_USER_ALL_POST_REQUEST:
        case GET_OTHERS_TIMELINE_POST_REQUEST:
        case GET_SINGLE_POST_REQUEST:
            return {loading: true};
        case GET_USER_ALL_POST_SUCCESS:
        case GET_OTHERS_TIMELINE_POST_SUCCESS:
        case GET_SINGLE_POST_SUCCESS:
            return {loading: false, posts: action.payload};
        case GET_USER_ALL_POST_FAIL:
        case GET_OTHERS_TIMELINE_POST_FAIL:
        case GET_SINGLE_POST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
        
    }
}

export const createUpdateDeletePostReducer = (state={loading:false, posts:null,message:null, error:null}, action)=>{
    switch(action.type){
        case CREATE_POST_REQUEST:
        case UPDATE_POST_REQUEST:
        case DELETE_POST_REQUEST:
        case LIKE_POST_REQUEST:
            return {loading:true};
        case CREATE_POST_SUCCESS:
        case UPDATE_POST_SUCCESS:
            return {loading: false, posts:action.payload};
        case DELETE_POST_SUCCESS:
        case LIKE_POST_SUCCESS:
            return {loading: false, message: action.payload};
        case CREATE_POST_FAIL:
        case UPDATE_POST_FAIL:
        case DELETE_POST_FAIL:
        case LIKE_POST_FAIL:
            return {loading: false, posts:null, message:null, error:action.payload}
        case CLEAR_POST_OPERATIONS:
            return {loading: false, posts:null, message:null, error:null}
        case CLEAR_POST_OPERATIONS_WITHOUT_POSTS:
            return {loading: false, message:null, error:null}
        default:
            return state;
    }
}