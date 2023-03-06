import React,{useEffect} from 'react'
import './fu.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ChatIcon from '@mui/icons-material/Chat';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
// import { followUnfollowAction, getFriendList, getUserList } from '../../redux/actions/userActions';
// import Spinner from 'react-bootstrap/Spinner';
import {useSelector} from 'react-redux'
// import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
// import { CLEAR_FOLLOW_UNFOLLOW_FAIL } from '../../redux/constants/userConstants';

const FriendsOrUser2 = ({item, type, handleFollow}) => {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const {user} = useSelector((store)=>store.user)
    const {loading} = useSelector((store)=>store.followUnfollw)
  
    // console.log(loading, message, error)
  //   useEffect(()=>{
  //     if(message === 'User Un-Followed Successfully'){
  //         toast.success(message)
  //         dispatch({type:CLEAR_FOLLOW_UNFOLLOW_FAIL})
  //         dispatch(getFriendList())
  //     }else if(message === 'User followed Successfully'){
  //       toast.success(message)
  //       dispatch({type:CLEAR_FOLLOW_UNFOLLOW_FAIL})
  //       dispatch(getUserList())
  //     } 
      
  // },[message])
  
  // useEffect(()=>{
  //     if(error) toast.error(error)
  // },[error])
  
  // const handleFollow = (username) =>{
  //     dispatch(followUnfollowAction(username))
  // }

  return (
    <Card sx={{ maxWidth: 345 }} className='m-3'>
    <CardMedia
      sx={{ height: 140 }}
      image={item?.profilePicture ? item?.profilePicture : '/assets/blank.png'}
      title={item?.username}
      onClick={()=>navigate(`/user/profile/${item?.username}`)}
      style={{cursor:'pointer'}}
    />
    <CardContent onClick={()=>navigate(`/user/profile/${item?.username}`)} style={{cursor:'pointer'}}>
      <Typography gutterBottom variant="h5" component="div">
      @&nbsp;{item?.username}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
      </Typography>
    </CardContent>
    <CardActions>
    {type === 'f' ?
        <div className='d-flex justity-content-center'>
            <Button color='error' size='small'
            onClick={()=>handleFollow(item?.username)}
            disabled={loading}
            >
                <GroupRemoveIcon/>&nbsp; Un-Follow
            </Button>
            <Button color='secondary' size='small' className='mx-2'
            disabled={loading}>
               <ChatIcon/>&nbsp; Chat
            </Button>
        </div>
        :
        <div className='d-flex justity-content-center'>
            <Button color='secondary' size='small'
            onClick={()=>handleFollow(item?.username)}
            disabled={loading}>
               <GroupAddIcon/>&nbsp; Follow
            </Button>
        </div>
        }
    </CardActions>
  </Card>
  )
}

export default FriendsOrUser2