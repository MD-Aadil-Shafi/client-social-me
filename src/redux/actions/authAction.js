import { USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
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

import { privateRequest, publicRequest} from "../axios";
import qs from 'qs'
import AsyncLocalStorage from '@createnextapp/async-local-storage'

export const userLoginAction = (email, password) => async(dispatch)=>{
    console.log(email,password)
    try{
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };

        const data = await publicRequest.post('/auth/login',{email,password});
        // qs.stringify({
        //     email:email,
        //     password:password
        // }))
        
        // console.log('logindata',data.data)
        if(data?.data?.data){
            await AsyncLocalStorage.setItem("socialToken", JSON.stringify(data.data.data)).then(()=>{
               let item = AsyncLocalStorage.getItem("socialToken")
                if(item !== null && item !== undefined) dispatch(getUserProfileAction(data.data.data))
                
            })
            //localStorage.setItem("socialToken", JSON.stringify(data.data.data))
            //since it's runing before saving so passing as argments
            
        }

    }catch(error){
        console.log('error',error)
        // error?.response?.statusText === "Unauthorized" && dispatch(userLogoutAction());
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error?.response?.data?.error,
        });  
    }
}



export const getUserProfileAction = (token) => async(dispatch) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`//coming form args
        }
    }//=> it's coming in private request
    try{
        dispatch({type: LOAD_USER_REQUEST});
        const data = await privateRequest.get('/auth/me',config);//initially need to reload
        // console.log('get user data', data)
        if(data?.data){
            await AsyncLocalStorage.setItem("socialUser", JSON.stringify(data.data.data)).then(()=>{
                let item = AsyncLocalStorage.getItem("socialUser")
                if(item !== null && item !== undefined) dispatch({type: USER_LOGIN_SUCCESS, payload: data.data?.data})
                
            }).then(()=>{
                let item = AsyncLocalStorage.getItem("socialUser")
                if(data?.data?.data?._id !== null && item !== null && item !== undefined){
                    window.location.href = '/'
                }
            })
            //localStorage.setItem("socialUser", JSON.stringify(data.data?.data))
            
        }
        // if(data?.data?.data?._id !== null){
        //     window.location.href = '/'
        // }
        return data;
    }catch(error){
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response && error?.response?.data?.error,
        })
    }

    // const data = await privateRequest.get('/auth/me');
    // //console.log(data)
    // localStorage.setItem("socialUser", JSON.stringify(data.data))

    // dispatch({
    //     type: USER_LOGIN_SUCCESS,
    //     payload: data,
    // });
    // if (data.userId !== null) {
    //     document.location.href = "/dashboard";
    // }
    

}

export const userRegisterAction = (userData) => async(dispatch) =>{
    try{
        dispatch({type: USER_REGISTER_REQUEST})

        const data = await publicRequest.post('/auth/register', userData);

        dispatch({type: USER_REGISTER_SUCCESS, payload: data?.data})
        return data;
    }catch(error){
        console.log('err',error)
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error?.response && error?.response?.data?.error
        })
    }
}

export const userActivationAction = (userData) => async(dispatch) =>{
    try{
        dispatch({type: USER_ACTIVATION_REQUEST})
        const data = await publicRequest.post('/auth/activate', userData);
        dispatch({type: USER_ACTIVATION_SUCCESS,
        payload: data })
        return data;
    }catch(error){
        console.log('err',error)
        dispatch({type: USER_ACTIVATION_FAIL,
        payload: error?.response && error?.response?.data?.error})
    }
}

export const userResendActivationAction = (email) => async(dispatch) =>{
    try{
        dispatch({type: USER_RESEND_ACTIVATION_REQUEST})
        const data = await publicRequest.post('/auth/resend-activation', {email});
        dispatch({type: USER_RESEND_ACTIVATION_SUCCESS,
        payload: data })
        return data;
    }catch(error){
        console.log('err',error)
        dispatch({type: USER_RESEND_ACTIVATION_FAIL,
        payload: error?.response && error?.response?.data?.error})
    }
}


export const userInfoUpdateAction = (userData) => async(dispatch) =>{
    try{
        dispatch({type: UPDATE_USER_REQUEST})
        const data = await privateRequest.patch('/auth/update-details', userData);
        dispatch({type: UPDATE_USER_SUCCESS})
        // payload: data?.data?.data })
        localStorage.setItem("socialUser", JSON.stringify(data?.data?.data))
        return data?.data?.data;
    }catch(error){
        console.log('err',error)
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: UPDATE_USER_FAIL,
        payload: error?.response && error?.response?.data?.error})
    }
}

export const userDpUpdateAction = (userData) => async(dispatch) =>{
    try{
        dispatch({type: UPDATE_USER_REQUEST})
        const data = await privateRequest.patch('/auth/update-dp', userData);
        dispatch({type: UPDATE_USER_SUCCESS})
        // payload: data?.data?.data })
        localStorage.setItem("socialUser", JSON.stringify(data?.data?.data))
        return data?.data?.data;
    }catch(error){
        console.log('err',error)
        if (error.response && error?.response?.data?.error === "Not authorized. Strict Policy") return userLogoutAction()
        dispatch({type: UPDATE_USER_FAIL,
        payload: error?.response && error?.response?.data?.error})
    }
}


export const userLogoutAction = () =>{
    localStorage.removeItem("socialUser");
    localStorage.removeItem("socialToken");
    // dispatch({ type: USER_LOGOUT_SUCCESS });
    window.location.reload()
    // window.location.href = "/login";
} 


export const userforgotPasswordAction = (email) => async(dispatch) =>{
    try{
        // dispatch({type: USER_RESEND_ACTIVATION_REQUEST})
        const {data} = await publicRequest.post('/auth/forgot-password', {email});
        // dispatch({type: USER_RESEND_ACTIVATION_SUCCESS,
        // payload: data })
        return data;
    }catch(error){
        console.log('err',error)
        // dispatch({type: USER_RESEND_ACTIVATION_FAIL,
        // payload: error?.response && error?.response?.data?.error})
        return error?.response && error?.response?.data?.error;
    }
}