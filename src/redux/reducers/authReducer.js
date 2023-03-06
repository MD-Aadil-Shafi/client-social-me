import { USER_REGISTER_REQUEST,
USER_REGISTER_SUCCESS,
USER_REGISTER_FAIL,
USER_LOGIN_REQUEST,
USER_LOGIN_SUCCESS,
USER_LOGIN_FAIL,
USER_LOGOUT_SUCCESS,
USER_LOGOUT_FAIL,
LOAD_USER_REQUEST,
LOAD_USER_FAIL,
LOAD_USER_SUCCESS,
USER_ACTIVATION_REQUEST,
USER_ACTIVATION_SUCCESS,
USER_ACTIVATION_FAIL,
USER_RESEND_ACTIVATION_REQUEST,
USER_RESEND_ACTIVATION_SUCCESS,
USER_RESEND_ACTIVATION_FAIL,
UPDATE_USER_FAIL,
UPDATE_USER_REQUEST,
UPDATE_USER_SUCCESS,
} from "../constants/authConstants";

const userInfoFromStorage = localStorage.getItem("socialUser") ? JSON.parse(localStorage.getItem("socialUser")) : null;

const initialState = {
    loading: false, user: userInfoFromStorage, isAuthenticated: userInfoFromStorage !== null ? true : false, message:null, error: null
}

// export const userLoginReducer = (state = initialState, action)=>{
//     switch(action.type){
//         case USER_LOGIN_REQUEST:
//             return {loading: true};
//         case USER_LOGIN_SUCCESS:
//             return {loading: false, userInfo: action.payload};
//         case USER_LOGIN_FAIL:
//             return {loading: false, error: action.payload};
//         default:
//             return state;
//     }
// }

// export const userLogoutReducer = (state = initialState, action)=>{
//     switch(action.type){
//         case USER_LOGOUT_SUCCESS:
//             return {};
//         case USER_LOGIN_FAIL:
//             return {
//                 userInfo: null,
//                 error: action.payload
//             }
//         default:
//             return state;
//     }
// }

// export const userRegisterReducer = (state = {}, action)=>{
//     switch(action.type){
//         case USER_REGISTER_REQUEST:
//             return {loading: true};
//         case USER_REGISTER_SUCCESS:
//             return {loading: false, userInfo: action.payload}
//         case USER_REGISTER_FAIL:
//             return {loading: false, error: action.payload}
//         default:
//             return state;
//     }
// }

// export const userLoadingReducer = ()

export const userReducer = (state = initialState, action)=>{
    switch (action.type){
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
        case USER_ACTIVATION_REQUEST:
        case USER_RESEND_ACTIVATION_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case USER_LOGIN_SUCCESS:
        // case USER_REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
        // case USER_ACTIVATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case USER_LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        case USER_RESEND_ACTIVATION_SUCCESS:
        case USER_ACTIVATION_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user:null,
                message: action.payload,
            };
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
        case USER_ACTIVATION_FAIL:
        case USER_RESEND_ACTIVATION_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOAD_USER_FAIL:
            return{
                loading: false,
                isAuthenticated: false,
                user:null,
                error:action.payload,
            }
        case USER_LOGOUT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}


export const updateUserInfoReducer = (state = {loading:false, message:null, error:null}, action)=>{
    switch(action.type){
        case UPDATE_USER_REQUEST:
            return{
                ...state,
                loading:true
            };
        case UPDATE_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                message: 'Updated Successfully!'
            };
        case UPDATE_USER_FAIL:
            return{
                ...state,
                loading:false,
                error: action.payload,
                message:null
            };
        default:
            return state
    }
}