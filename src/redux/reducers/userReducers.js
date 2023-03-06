import {GET_SINGLE_USER_REQUEST,
GET_SINGLE_USER_SUCCESS, GET_SINGLE_USER_FAIL,
GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS,
GET_ALL_USER_FAIL, 
GET_FRIENDLIST_REQUEST, GET_FRIENDLIST_SUCCESS,
GET_FRIENDLIST_FAIL,
FOLLOW_UNFOLLOW_REQUEST, FOLLOW_UNFOLLOW_SUCCESS,
FOLLOW_UNFOLLOW_FAIL, CLEAR_FOLLOW_UNFOLLOW_FAIL
} from '../constants/userConstants'


export const userListReducers = (state={},action)=>{
    switch(action.type){
        case GET_SINGLE_USER_REQUEST:
        case GET_FRIENDLIST_REQUEST:
            return {loading: true};
        case GET_SINGLE_USER_SUCCESS:
        case GET_FRIENDLIST_SUCCESS:
            return {loading:false, users:action.payload};
        case GET_SINGLE_USER_FAIL:
        case GET_FRIENDLIST_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

export const allUserListReducers = (state={}, action)=>{
    switch(action.type){
        case GET_ALL_USER_REQUEST:
            return {loading: true};
        case GET_ALL_USER_SUCCESS:
            return {loading:false, users:action.payload};
        case GET_ALL_USER_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

export const followUnfollowReducer = (state={},action)=>{
    switch(action.type){
        case FOLLOW_UNFOLLOW_REQUEST:
            return {loading: true};
        case FOLLOW_UNFOLLOW_SUCCESS:
            return {loading: false, message:action.payload};
        case FOLLOW_UNFOLLOW_FAIL:
            return {loading: false, error: action.payload};
        case CLEAR_FOLLOW_UNFOLLOW_FAIL:
            return {loading:false}
        default:
            return state;
    }
}