
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import React,{useEffect} from 'react'
import '../profile/profileInfo.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getSingleUser } from '../../redux/actions/userActions';
import Spinner from 'react-bootstrap/Spinner';

const FriendProfileInfo = () => {
    const dispatch = useDispatch();
    const {username} = useParams();
    
    const {loading, users, error} = useSelector((store)=>store.userList)

    useEffect(()=>{
       username && dispatch(getSingleUser("username", username))
    },[username])

  return (
    <>
    {
    loading ?
    <div className='profileInfo py-5'>
        <div className='d-flex justify-content-center text-center mt-5'>
        <Spinner animation="grow"/>
        <Spinner animation="grow" className='mx-3'/>
        <Spinner animation="grow"/>
      </div>
      </div>
    : users?.data ?
    <div className='profileInfo mt-5'>
        <div className='patientInfo-content'>
            <div className='banner-div'>
        <img src={users?.data?.coverPicture ? users?.data?.coverPicture : 'https://cdn.pixabay.com/photo/2022/09/07/10/01/landscape-7438429_960_720.jpg'} className='profile-banner' alt='cover picture'/>

        <img src={users?.data?.profilePicture ? users?.data?.profilePicture : '/assets/blank.png'} alt='profile image' className='dp'/>
        </div>

        <h2 className='fw-light text-center mt-4'>{users?.data?.username}</h2>
        <p className='fw-light text-center'>{users?.data?.desc ? users?.data?.desc : 'No user description added'}</p>
        
    </div>
    <div className='px-4'>
        <div className='d-flex'>
        <h3 className='fw-light'>Profile Details</h3>
        </div>
        
        <hr className='w-50 mt-0'></hr>
<div className='row justify-content-between'>
            <div className='col-md-5'>
            <div className='mb-3'>
            <p className='fw-light mb-0'>Full Name</p>
            <h5 className='fw-light'>{users?.data?.name}</h5>
        </div>
        {/* <div className='mb-3'>
            <p className='fw-light mb-0'>DOB</p>
            <h5 className='fw-light'>{users?.data?.dob ? users?.data?.dob : <QuestionMarkIcon/>}</h5>
        </div> */}
        <div className='mb-3'>
            <p className='fw-light mb-0'>Email</p>
            <h5 className='fw-light'>{users?.data?.email}</h5>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>Mobile</p>
            <h5 className='fw-light'>{users?.data?.mobile ? users?.data?.mobile : <QuestionMarkIcon/>}</h5>
        </div>
            </div>

            <div className='col-md-5'>
            <div className='mb-3'>
            <p className='fw-light mb-0'>Country</p>
            <h5 className='fw-light'>{users?.data?.country ? users?.data?.country : <QuestionMarkIcon/>}</h5>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>State</p>
            <h5 className='fw-light'>{users?.data?.state ? users?.data?.state : <QuestionMarkIcon/>}</h5>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>City</p>
            <h5 className='fw-light'>{users?.data?.city ? users?.data?.city : <QuestionMarkIcon/>}</h5>
        </div>
        <div className='mb-3'>
            <p className='fw-light mb-0'>About</p>
            <h5 className='fw-light'>{users?.data?.desc ? users?.data?.desc : <QuestionMarkIcon/>}</h5>
        </div>
            </div>
        </div>

    </div>

    </div>
    :
    <>
    <div className='profileInfo py-5'>
    <h3 className='text-center mt-5 text-secondary'>Unable to Load User Data</h3>
    </div>
    
    </>
    }
    </>
  )
}

export default FriendProfileInfo