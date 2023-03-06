import React,{useEffect, useRef} from 'react'
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { userActivationAction } from '../../redux/actions/authAction';
import { ToastContainer, toast } from 'react-toastify';

const Activate = () => {
    const {email, otp} = useParams()
    // console.log('email',email, 'otp',otp)
    const dispatch = useDispatch()
    const {loading, error} = useSelector((state) => state.user);
    const navigate = useNavigate()
    // console.log('error',error)


    useEffect(()=>{
        if(!email || !otp){
            return toast.error('Invalid Link. Plese check your mail box')
        }else{
            (async()=>{
                let res = await dispatch(userActivationAction({token:otp,email}))
                // console.log('res',res)
                if(res?.data?.success === true){ 
                    toast.success('Account activated successfully. Please login to continue')
                    setTimeout(()=>{
                        navigate('/login',{replace: true})
                    },3000)
                }
            })();
            
        }
    },[])

    useEffect(()=>{
        if(error === "Already Activated"){
            toast.error(error)
            setTimeout(()=>{
                navigate('/login',{replace: true})
            },3000)
            
        }else{
            toast.error(error)
        }
    },[error])

  return (
    <>
    <div className='container p-5 text-center'>

            <h1 className='display-1' style={{color:'#9C27B0'}}>Social Me</h1>
            <h4>Account Activation</h4>
            <br></br>
            <h4 className='fw-light'>You are just one step away to activate your account.</h4>
            <br></br>
            <h3>Please wait while your account is being activated.</h3>
            <br></br>

            <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>

        </div>
        <ToastContainer/>
    </>
  )
}

export default Activate