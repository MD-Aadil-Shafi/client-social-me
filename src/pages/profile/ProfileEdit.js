import React, { useEffect } from 'react'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { userInfoUpdateAction } from '../../redux/actions/authAction'
import { Button } from '@mui/material'

const ProfileEdit = () => {
    const {user} = useSelector((store) => store.user)
    const {loading, error, message} = useSelector((store) => store.updateUserReducer)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        name:user?.name,
        dob:user?.dob ? user?.dob : '',
        mobile:user?.mobile ? user?.mobile : '',
        country: user?.country ? user?.country : '',
        state: user?.state ? user?.state : '',
        city: user?.city ? user?.city : '',
        desc: user?.desc ? user?.desc : '',
        relationship: user?.relationship ? user?.relationship : ''
    })

    const handleChange = (e) =>{
        setState({...state, [e.target.name]:e.target.value})
    }

    const handleUpdate = ()=>{
        dispatch(userInfoUpdateAction(state))
    }
    // const handleChange = (e) => {
    //     let value = e.target.value;
    //     let name = e.target.name;
      
    //     setState((prevalue) => {
    //       return {
    //         ...prevalue,             
    //         [name]: value
    //       }
    //     })
    //   }

    useEffect(()=>{
        if(error) toast.error(error)
    },[error])

    useEffect(()=>{
        if(message){
            toast.success(message)
        setTimeout(()=>{
            window.location.href = `/profile/${user?.username}`
        },1000)
    }
    },[message])

  return (
    <>
    <div className='row justify-content-between'>
            <div className='col-md-5'>
            <div className='mb-3'>
            <p className='fw-light mb-0'>Full Name</p>
            <input type='text'
            name='name'
            value={state?.name}
            onChange={handleChange}
            placeholder='test user name' className='form-control'/>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>DOB</p>
            <input type='date'
            name='dob'
            value={state?.dob}
            onChange={handleChange}
            className='form-control'/>
        </div>
        {/* <div className='mb-3'>
            <p className='fw-light mb-0'>Email</p>
            <input type='email' placeholder='test.user@email.com' className='form-control'/>
        </div> */}
        <div className='mb-3'>
            <p className='fw-light mb-0'>Mobile</p>
            <input type='number'
            name='mobile'
            value={state?.mobile}
            onChange={handleChange}
            placeholder='1234567890' className='form-control'/>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>Relationship Status</p>
            <select className='form-select' name='relationship' value={state?.relationship}
            onChange={handleChange}
            >
                <option></option>
                <option>single</option>
                <option>married</option>
                <option>don't want to say</option>
            </select>
        </div>
            </div>

            <div className='col-md-5'>
<div className='mb-3'>
            <p className='fw-light mb-0'>Country</p>
            <input type='text'
            name='country'
            value={state?.country}
            onChange={handleChange}
            placeholder='Country' className='form-control'/>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>State</p>
            <input type='text'
            name='state'
            value={state?.state}
            onChange={handleChange}
            placeholder='State' className='form-control'/>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>City</p>
            <input type='text'
            name='city'
            value={state?.city}
            onChange={handleChange}
            placeholder='City' className='form-control'/>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>About</p>
            <textarea
            name='desc'
            value={state?.desc}
            onChange={handleChange}
            placeholder='test user name' className='form-control'>

            </textarea>
        </div>
            </div>
        </div>
        <div className='d-flex justify-content-center my-2'>
            <Button variant="contained" color='secondary' disabled={loading}
            onClick={handleUpdate}
            >Update</Button>
        </div>
        </>
  )
}

export default ProfileEdit