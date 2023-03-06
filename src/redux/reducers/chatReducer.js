import { GET_CONVERSATION_REQUEST,
GET_CONVERSATION_SUCCESS,
GET_CONVERSATION_FAIL,
ADD_CONVERSATION_REQUEST,
ADD_CONVERSATION_SUCCESS,
ADD_CONVERSATION_FAIL,
GET_MESSAGE_REQUEST,
GET_MESSAGE_SUCCESS,
GET_MESSAGE_FAIL,
ADD_MESSAGE_REQUEST,
ADD_MESSAGE_SUCCESS,
ADD_MESSAGE_FAIL,
GET_ONLINE_USERS,
} from "../constants/chatConstants";


export const getConversatinReducer = (state={loading:false, conversation:null, error:null}, action)=>{

    switch(action.type){
        case GET_CONVERSATION_REQUEST:
            return {loading:true};
        case GET_CONVERSATION_SUCCESS:
            return {loading:false, conversation: action.payload};
        case GET_CONVERSATION_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
}

export const addConversationReducer = (state={loading:false, conversation:null, error:null}, action)=>{
    switch(action.type){
        case ADD_CONVERSATION_REQUEST:
            return {loading:true};
        case ADD_CONVERSATION_SUCCESS:
            return {loading:false, conversation:action.payload};
        case ADD_CONVERSATION_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
}

export const getMessagesReducer = (state={loading:false, messages:null, error:null}, action)=>{

    switch(action.type){
        case GET_MESSAGE_REQUEST:
            return {loading:true};
        case GET_MESSAGE_SUCCESS:
            return {loading:false, messages:action.payload};
        case GET_MESSAGE_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
}

export const addMessagesReducer = (state={loading:false, messages:null, error:null}, action)=>{
    switch(action.type){
        case ADD_MESSAGE_REQUEST:
            return {loading:true};
        case ADD_MESSAGE_SUCCESS:
            return {loading:false, messages:action.payload};
        case ADD_MESSAGE_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
}

export const getOnlineReducer = (state={onlineUsers:[]}, action)=>{
    switch(action.type){
        case GET_ONLINE_USERS:
            return {onlineUsers: action.payload};
        default:
            return state;

    }
}