import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import React,{useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './login.scss'
import { toast} from 'react-toastify'
import { userforgotPasswordAction, userLoginAction } from '../../redux/actions/authAction'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {loading, error, user} = useSelector((state)=> state.user);
    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate()

const handleLogin = async()=>{
    if(!email.current.value || !password.current.value) return toast.error('Email and Password is required.')
    let res = await dispatch(userLoginAction(email.current.value,password.current.value));
    // if(res?.data?.success === true){
    //     console.log(res.data)
    // }
}

const handleGuestLogin = async(val)=>{
    if(val === 1 ){
        await dispatch(userLoginAction('guest.one.sm@yopmail.com','guest@123456'));
    }else{
        await dispatch(userLoginAction('guest.two.sm@yopmail.com','two@123456'));
    }

}

useEffect(()=>{
    if(error) toast.error(error)
},[error])

const handleResetPassword = async()=>{
    if(!email.current.value) return toast.error('Please enter email.')
   let res = await dispatch(userforgotPasswordAction(email.current.value))
   toast.warning(res)
}

  return (
    <>
    <div className='container mt-5 login'>
        <br></br>
        <br></br>

    <div className='row justify-content-evenly px-0 mx-0'>
        <div className='col-md-5 pt-5 mb-3'>
            <h1 className='display-1' style={{color:'#9C27B0'}}>Social Me</h1>
            <h3 className='fw-light'>Social Me is all about cool posts and friendly connectivity. We don't allow hate posts in our platform, so if encounterd one please report.</h3>

            <p className='fw-light my-3'>Social Me &copy; {new Date().getFullYear()}</p>
            <Button className='px-0 text-dark'>Terms &amp; Policy</Button>
        </div>
        <div className='col-md-4 shadow login-inp-div p-4 mb-3'>
            <h2 className='fw-light'>Sign in</h2>
            <p className='fw-light'>Stay updated to your social world.</p>

            <div className='my-3'>
                <label>Email</label>
                <input ref={email} className='form-control' type='email' placeholder='enter your email' required/>
            </div>
            <div className=''>
                <label>Password</label>
                <input ref={password} className='form-control' type='password' placeholder='enter your password' required/>
            </div>
            <Button color='primary' onClick={handleResetPassword}>Forgot Password ?</Button>

            <Button variant="contained" color='secondary' className='my-3 w-100' onClick={handleLogin} disabled={loading}>Login</Button>
            <p className='fw-light text-center mb-0 pb-0'>or</p>
                <hr className='mt-0 pt-0'></hr>
                <Button variant="contained"  className='my-2 w-100 bg-primary' onClick={()=>handleGuestLogin(1)} disabled={loading}>Login As Guest One</Button>
                <Button variant="contained"  className='my-2 w-100 bg-info' onClick={()=>handleGuestLogin(2)} disabled={loading}>Login As Guest Two</Button>

                <p className='fw-light text-center mb-0 pb-0'>or</p>
                <hr className='mt-0 pt-0'></hr>
                {/* <Button variant="outlined" color='primary' className='my-3 w-100'><Google/> &nbsp; Sign in with Google</Button> */}

                <p className='text-center'>New to Social Me ? <Button color='secondary' onClick={()=> navigate('/register')}>Join now</Button></p>
        </div>
    </div>
    </div>
    </>
  )
}

export default Login