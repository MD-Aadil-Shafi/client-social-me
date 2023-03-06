import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import React,{useEffect, useRef, useState} from 'react'
import './register.scss'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { userRegisterAction } from '../../redux/actions/authAction'

const Register = () => {
    const [off, setOff] = useState(false)
    const name = useRef();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confPassword = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading, error, isAuthenticated, user} = useSelector((state) => state.user);

    const handleSubmit = async()=>{
        if(!name.current.value ||
        !username.current.value ||
        !email.current.value ||
        !password.current.value ||
        !confPassword.current.value){
            return toast.error('All fields are required')
        }
        if(confPassword.current.value !== password.current.value){
            return toast.error('Both password value should exactly match.')
        }
        let userData = {name: name.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value}

        let res = await dispatch(userRegisterAction(userData))
        // console.log('res',res)
        if(res?.data?.success){
            toast.success(res?.data?.data?.message)
            setOff(true)
            setTimeout(()=>{
                navigate('/thank-you',{replace:true})
            },3000)
            
        }
        // else if(!loading && error){
        //     if(error === 'Duplicate field value found'){
        //         toast.error('User with this email/username already created.')
        //     }else{
        //         toast.error(error)
        //     }
            
        // }
}

useEffect(()=>{
    if(!loading && error){
        if(error === 'Duplicate field value found'){
            toast.error('User with this email already created.')
        }else{
            toast.error(error)
        }
        
    }
},[loading,error])


  return (
    <>
    <div className='container mt-5 login'>

    <div className='row justify-content-evenly px-0 mx-0'>
        <div className='col-md-5 pt-5 mb-3'>
            <h1 className='display-1' style={{color:'#9C27B0'}}>Social Me</h1>
            <h3 className='fw-light'>Get ready to dive in to hatefree social world. <br></br>
            Social Me is all about cool posts and friendly connectivity. We don't allow hate posts in our platform, so if encounterd one please report.</h3>

            <p className='fw-light my-3'>Social Me &copy; {new Date().getFullYear()}</p>
            <Button className='px-0 text-dark'>Terms &amp; Policy</Button>
        </div>
        <div className='col-md-4 shadow login-inp-div p-4 mb-3 register-field'>
            <h2 className='fw-light'>Sign up</h2>
            <p className='fw-light'>Stay updated to your social world.</p>

            <div className='my-3'>
                <label>Full Name</label>
                <input ref={name} className='form-control' type='text' placeholder='enter your full name' required/>
            </div>
            <div className='my-3'>
                <label>Username</label>
                <input ref={username} className='form-control' type='text' placeholder='enter unique username' required/>
            </div>
            <div className='my-3'>
                <label>Email</label>
                <input ref={email} className='form-control' type='email' placeholder='enter your email' required/>
            </div>
            <div className='mb-3'>
                <label>Password</label>
                <input ref={password} className='form-control' type='password' placeholder='enter your password' required/>
            </div>
            <div className=''>
                <label>Confirm Password</label>
                <input ref={confPassword} className='form-control' type='password' placeholder='confirm your password' required/>
            </div>

            <Button variant="contained" color='secondary' className='my-3 w-100' onClick={handleSubmit} disabled={loading || off}>Agree &amp; Join</Button>


                <p className='fw-light text-center mb-0 pb-0'>or</p>
                <hr className='mt-0 pt-0'></hr>
                {/* <Button variant="outlined" color='primary' className='my-3 w-100'><Google/> &nbsp; Proceed with Google Account</Button> */}

                <p className='text-center'>Already registered ? <Button color='secondary' onClick={()=>navigate('/login')}>Sign in</Button></p>
        </div>
    </div>
    </div>
    </>
  )
}

export default Register