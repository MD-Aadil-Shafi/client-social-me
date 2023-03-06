import React,{useState, useEffect} from 'react'
import './fu.scss'
import { Button } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { followUnfollowAction, getFriendList, getUserList } from '../../redux/actions/userActions';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'


const FriendsOrUser = ({item,type}) => {
  const dispatch = useDispatch()
  const {user} = useSelector((store)=>store.user)
  const {loading, message, error} = useSelector((store)=>store.followUnfollw)

  console.log(loading, message, error)
  useEffect(()=>{
    if(message === 'User Un-Followed Successfully'){
        toast.success(message)
        dispatch(getFriendList())
    }else if(message === 'User followed Successfully'){
      toast.success(message)
      dispatch(getUserList())
    } 
},[message])

useEffect(()=>{
    if(error) toast.error(error)
},[error])

const handleFollow = (username) =>{
    dispatch(followUnfollowAction(username))
}

  return (
    <div className='col-md-3 d-flex flex-column justify-content-center align-items-center h-100 bg-light shadow-sm p-3 rounded friendOrUser'>
        <img src={item?.profilePicture ? item?.profilePicture : './assets/blank.png'} alt='dp' className='card-img'/>
        <p className='fw-light'>{item?.username}</p>
        {type === 'f' ?
        <div className='d-flex justity-content-center'>
            <Button variant='contained' color='error'
            onClick={()=>handleFollow(item?.username)}
            disabled={loading}
            >
                <GroupRemoveIcon/>&nbsp; Un-Follow
            </Button>
            <Button variant='contained' color='secondary' className='mx-2'
            disabled={loading}>
               <ChatIcon/>&nbsp; Chat
            </Button>
        </div>
        :
        <div className='d-flex justity-content-center'>
            <Button variant='contained' color='secondary'
            onClick={()=>handleFollow(item?.username)}
            disabled={loading}>
               <GroupAddIcon/>&nbsp; Follow
            </Button>
        </div>
        }
    </div>
  )
}

export default FriendsOrUser