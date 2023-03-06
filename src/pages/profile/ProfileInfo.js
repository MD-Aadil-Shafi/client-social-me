import { Edit } from '@mui/icons-material'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import React, { useState } from 'react'
import ProfileEdit from './ProfileEdit'
import './profileInfo.scss'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import DpModal from './DpModal';

const ProfileInfo = ({notMe}) => {
    const [edit, setEdit] = useState(false)
    const {user} = useSelector((store) => store.user)
    const {username} = useParams();
    const [show, setShow] = useState(false)
  return (
    <div className='profileInfo'>
        <div className='patientInfo-content'>
            <div className='banner-div'>
        <img src={user?.coverPicture ? user?.coverPicture : 'https://cdn.pixabay.com/photo/2022/09/07/10/01/landscape-7438429_960_720.jpg'} className='profile-banner' alt='cover picture'/>

        <img src={user?.profilePicture ? user?.profilePicture : '/assets/blank.png'} alt='profile image' className='dp'
        onClick={()=>setShow(true)}
        />
        </div>

        <h2 className='fw-light text-center mt-4'>{user?.username}</h2>
        <p className='fw-light text-center'>{user?.desc ? user?.desc : 'No user description added'}</p>
        
    </div>
    <div className='px-4'>
        <div className='d-flex'>
        <h3 className='fw-light'>Profile Details</h3>
        {user?.username === username ?
        <button className='btn btn-sm mx-5' onClick={()=>setEdit(!edit)}><Edit/></button>
        :null}
        </div>
        
        <hr className='w-50 mt-0'></hr>

        {edit ?
        <ProfileEdit/>
    :
<div className='row justify-content-between'>
            <div className='col-md-5'>
            <div className='mb-3'>
            <p className='fw-light mb-0'>Full Name</p>
            <h5 className='fw-light'>{user?.name}</h5>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>DOB</p>
            <h5 className='fw-light'>{user?.dob ? user?.dob : <QuestionMarkIcon/>}</h5>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>Email</p>
            <h5 className='fw-light'>{user?.email}</h5>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>Mobile</p>
            <h5 className='fw-light'>{user?.mobile ? user?.mobile : <QuestionMarkIcon/>}</h5>
        </div>
            </div>

            <div className='col-md-5'>
            <div className='mb-3'>
            <p className='fw-light mb-0'>Country</p>
            <h5 className='fw-light'>{user?.country ? user?.country : <QuestionMarkIcon/>}</h5>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>State</p>
            <h5 className='fw-light'>{user?.state ? user?.state : <QuestionMarkIcon/>}</h5>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>City</p>
            <h5 className='fw-light'>{user?.city ? user?.city : <QuestionMarkIcon/>}</h5>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>About</p>
            <h5 className='fw-light'>{user?.desc ? user?.desc : <QuestionMarkIcon/>}</h5>
        </div>
            </div>
        </div>
    }

        
        
    </div>
    {show ?
    <DpModal show={show} setShow={setShow}/>
    : null }
    </div>
  )
}

export default ProfileInfo