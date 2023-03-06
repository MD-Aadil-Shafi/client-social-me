import React,{useEffect} from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector} from 'react-redux'
import FriendsOrUser from '../../components/friends&Users/FriendsOrUser'
import FriendsOrUser2 from '../../components/friends&Users/FriendsOrUser2';
import Topbar from '../../components/topbar/Topbar'
import DrawerAppBar from '../../components/topbar/TopBar2';
import { CLEAR_FOLLOW_UNFOLLOW_FAIL } from '../../redux/constants/userConstants';
import { followUnfollowAction, getFriendList, getUserList } from '../../redux/actions/userActions';
import {toast} from 'react-toastify'
import { getOthersTimelinePostAction } from '../../redux/actions/postAction';

const Users = () => {
    
    const dispatch = useDispatch()
    const {user} = useSelector((store)=>store.user)
    const {loading, users, error} = useSelector((store)=>store.allUserList)
    const {loading:fLoading, message, error:fError} = useSelector((store)=>store.followUnfollw)

    useEffect(()=>{
        dispatch(getUserList())
    },[])
// console.log('users',users)
useEffect(()=>{
    if(message){
        toast.success(message)
        dispatch({type:CLEAR_FOLLOW_UNFOLLOW_FAIL})
        dispatch(getUserList())
    }
    
},[message])

useEffect(()=>{
    if(error) toast.error(error)
},[error])
useEffect(()=>{
    if(fError) toast.error(fError)
    dispatch({type:CLEAR_FOLLOW_UNFOLLOW_FAIL})
},[fError])

const handleFollow = async(username) =>{
   await dispatch(followUnfollowAction(username)).then(()=>{
    dispatch(getOthersTimelinePostAction(user?.username))
   })
}
  return (
    <>
    {/* <Topbar/> */}
    <DrawerAppBar/>
    <div className='container-fluid p-4 mx-0'>
        <h4 className='fw-light'>Follow New Friends</h4>
   <div className='row justify-content-center mx-0 px-0'>
    {loading ?
<div className='d-flex justify-content-center my-4'>
<Spinner animation='grow'/>
<Spinner animation='grow' className='mx-2'/>
<Spinner animation='grow'/>
</div>    
:
users && users?.length ?
users?.map((item,idx)=>(
    // <FriendsOrUser item={item} type='u' key={idx}/>
    <FriendsOrUser2 item={item} type='u' key={idx} handleFollow={handleFollow}/>
))
   :
    <h5 className='text-center text-secondary fw-light'>No Friends Found. Please Add New Friends</h5>
    }
   </div>
   </div>
   </>
  )
}

export default Users