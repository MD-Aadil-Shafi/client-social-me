import React,{useEffect, useState} from 'react'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector} from 'react-redux'
import { followUnfollowAction, getUserList } from '../../../redux/actions/userActions'
import { toast } from 'react-toastify'
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom'
import { CLEAR_FOLLOW_UNFOLLOW_FAIL } from '../../../redux/constants/userConstants'
import { getOthersTimelinePostAction } from '../../../redux/actions/postAction'

const CloseFriend = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((store)=>store.user)
    const [tempUserLength, setTempUserLength] = useState(0)
    const {loading, users, error} = useSelector((store)=>store.allUserList)
    const {loading:fLoading, message, error:fError} = useSelector((store)=>store.followUnfollw)

    const navigate = useNavigate()
    useEffect(()=>{
        if(message && message !== 'User Un-Followed Successfully'){
            toast.success(message)
            dispatch({type:CLEAR_FOLLOW_UNFOLLOW_FAIL})
            dispatch(getUserList())
            
        } 
    },[message])

    useEffect(()=>{
        if(error) toast.error(error)
        if(fError) toast.error(fError)
    },[error, fError])

    const handleFollow = async(username) =>{
       await dispatch(followUnfollowAction(username)).then(()=>{
        dispatch(getOthersTimelinePostAction(user?.username))
       })
    }

    useEffect(()=>{
        if(users?.length) setTempUserLength(users?.length)
    },[users])
  
    return (
    <div className='sidebar-friends'>
        <h5 className='text-center'>Make New Friends</h5>
        {
        loading?
        <div className='d-flex justify-content-center my-4'>
        <Spinner animation='grow' size='sm'/>
        <Spinner animation='grow' className='mx-2' size='sm'/>
        <Spinner animation='grow' size='sm'/>
        </div> 
        :
        users?.length ?
        users?.slice(0,5).map((item, idx)=>(
            <span className='d-flex align-items-center my-3' key={idx}>
                <Avatar
                onClick={()=>navigate(`/user/profile/${item?.username}`)}
                style={{cursor:'pointer'}}
                alt='img' src={item?.profilePicture ? item?.profilePicture : '/assets/blank.png'}/>
                <div>
                <p className='mb-0 fw-light mx-3'>{item?.name}</p>
                <button className='btn btn-sm shadow rounded shadow mx-3 btn-primary'
                onClick={()=>handleFollow(item?.username)}
                disabled={fLoading}>Follow</button>
                </div>
            </span>
    ))
    :
<p className='text-center text-secondary fw-light'>No New Users Found</p>
    }
    {tempUserLength > 5 ?
            <p className='fw-bold text-center mt-3 shadow text-secondary' style={{cursor:'pointer'}}
            onClick={()=>navigate('/add/friends')}
            >View More</p>
            : null }
            
            {/* <span className='d-flex align-items-center'>
                <Avatar alt='img' src='https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'/>
                <p className='pt-3 fw-light mx-3'>Test User Name</p>
            </span> */}

        </div>
  )
}

export default CloseFriend