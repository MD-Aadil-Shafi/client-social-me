import { privateRequest } from "../axios";
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
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAIL,
    } from "../constants/chatConstants";
    import { userLogoutAction } from "./authAction";


    export const getConversationAction = () => async(dispatch)=>{
        try{
            dispatch({type:GET_CONVERSATION_REQUEST})

        const {data} = await privateRequest.get('/conversation')
        console.log('cdata', data)

        dispatch({type: GET_CONVERSATION_SUCCESS, payload: data?.data})
        return data?.data

        }catch(error){
            if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: GET_CONVERSATION_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
        }
    }

    export const addConversationAction = (convData) => async(dispatch)=>{
        try{
            dispatch({type:ADD_CONVERSATION_REQUEST})

        const {data} = await privateRequest.post('/conversation',convData)

        dispatch({type: ADD_CONVERSATION_SUCCESS, payload: data?.data})
        return data?.data
        }catch(error){
            if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: ADD_CONVERSATION_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
        }
    }

    export const addMessageAction = (msgData) => async(dispatch)=>{
        try{
            dispatch({type:ADD_MESSAGE_REQUEST})

        const {data} = await privateRequest.post('/message',msgData)

        dispatch({type: ADD_MESSAGE_SUCCESS, payload: data?.data})
        return data?.data
        }catch(error){
            if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: ADD_MESSAGE_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
        }
    }


    export const getMessageAction = (id) => async(dispatch)=>{
        try{
            dispatch({type:GET_MESSAGE_REQUEST})

        const {data} = await privateRequest.get(`/message/${id}`,)

        dispatch({type: GET_MESSAGE_SUCCESS, payload: data?.data})
        return data?.data
        }catch(error){
            if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: GET_MESSAGE_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
        }
    }

    export const deleteMessageAction = (id) => async(dispatch)=>{
        try{
            dispatch({type:DELETE_MESSAGE_REQUEST})

        const {data} = await privateRequest.delete(`/message/${id}`,)

        dispatch({type: DELETE_MESSAGE_SUCCESS, payload: data?.message})
        return data?.data
        }catch(error){
            if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: DELETE_MESSAGE_FAIL,
        payload: error?.response && error?.response?.data?.error
        })
        }
    }