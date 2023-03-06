import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@mui/material'
import './thank.scss'
import { useDispatch, useSelector } from 'react-redux'
import { userResendActivationAction } from '../../redux/actions/authAction'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const Thank = () => {
    const email = useRef();
    const navigate = useNavigate()
    const [unlock, setUnLock] = useState(false)
    const [time, setTime] = useState(0)
    const dispatch = useDispatch()
    const {loading, error, message} = useSelector((state)=>state.user);

    const handleReSend = async() =>{
        if(!email.current.value) return toast.error('Email is required.')
        let res = await dispatch(userResendActivationAction(email.current.value))
        if(res?.data?.success){
            toast.success(res?.data?.data?.message)
            setUnLock(false)
            setTime(0)
            counter()
        }
        // setUnLock(false)
        // setTime(0)
        // counter()
    }

    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
        //1000 ms = 1 sec
    }
    
    async function counter(){
        for(let i = 100; i >= 0; i--){
            if(i === 0){
                setUnLock(true)
            }
            setTime(i)
            await sleep(1000)
            // console.log(i)
        }
    }

    useEffect(()=>{
    counter()
    },[])

    useEffect(()=>{
        if(error === "User already activated"){
            toast.error(error)
            setTimeout(()=>{
                navigate('/login',{replace:true})
            },3000)
        }else{
           toast.error(error)
        }
    },[error])

  return (
    <div className='container-fluid p-5 thank-div login'>
    <div className='row justify-content-evenly px-0 mx-0'>
        <div className='col-md-5 pt-5 mb-3'>
            <h1 className='display-1' style={{color:'#9C27B0'}}>Social Me</h1>
            <h3 className='fw-light'>Thank you for creating an account with us. <br></br>
            We wish you a wonderful journey up ahead</h3>
            <h2>Please check your <span className='text-primary'>mail box</span> for account activation.</h2>

            <p className='fw-light my-3'>Social Me &copy; {new Date().getFullYear()}</p>
            <br></br>
            {time !== 0 &&
            <>
            <p className='mb-0 pb-0'>Please wait for : <span className='fw-bold h3 text-primary'>{time}</span> seconds.</p>
            <p className='fw-light'>In case you haven't got mail yet.</p>
            </>
            }
        </div>
        <div className='col-md-4 my-3 left-thank-div'>
            <img src='/assets/login.jpg' className='thank-img' alt='welcome'/>
            <p className='pb-0 mb-0'>Haven't got the mail yet? </p>
            <div className='mb-3'>
                <label>Email :</label>
                <input ref={email} type='email' className='form-control' placeholder='enter your email' disabled={!unlock || time !== 0 || loading}/>
            </div>
            <Button variant="contained" color='secondary' className='my-3 w-100' disabled={!unlock || time !== 0 || loading} onClick={handleReSend}>Re-send Activation Mail</Button>

        </div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default Thank