import React, { useEffect, useState } from 'react'
import './feed.scss'
import Post from './subComponents/Post'
import Share from './subComponents/Share'
import { useDispatch, useSelector} from 'react-redux'
import { commentPostAction, getOthersTimelinePostAction, commentLikeUnlikeAction, commentDeleteAction,commentReportAction } from '../../redux/actions/postAction'
import { getUserList, getFriendList } from '../../redux/actions/userActions'
import Spinner from 'react-bootstrap/Spinner';
import { deletePostAction, updatePostAction, likeUnlikePostAction } from '../../redux/actions/postAction'
import { CLEAR_POST_OPERATIONS, CLEAR_POST_OPERATIONS_WITHOUT_POSTS } from '../../redux/constants/postConstants'
import {toast} from 'react-toastify'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


const Feed = ({username}) => {
  const {user} = useSelector((store)=>store.user)
  const {loading, posts, error} = useSelector((store)=>store.getPosts)
  const {message, error:opErr, posts:opPOst} = useSelector((store)=> store.postOperations)

  const [state, setState] = useState([])

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getOthersTimelinePostAction(user?.username))
    dispatch(getUserList())
  },[])

  //creating func in parent to overcome form multiple toasts
  const handleDelete = (id)=>{
    dispatch(deletePostAction(id))
  }
  const handleUpdate = (id, content)=>{
    dispatch(updatePostAction(id, content))
  }
  const handleLIkeUnlike = (id, type)=>{
    dispatch(likeUnlikePostAction(id, type))
  }
  const handleAddComment = async(id, comment)=>{
    dispatch(commentPostAction(id, comment))
  }
  const handleLikeUnlikeComment = async(id, commentId)=>{
    dispatch(commentLikeUnlikeAction(id, commentId))
  }
  const handleDeleteComment = async(id, commentId)=>{
    dispatch(commentDeleteAction(id, commentId))
  }
  const handleReportComment = async(id, commentId, reportMessage)=>{
    dispatch(commentReportAction(id, commentId, reportMessage))
  }

  



  useEffect(()=>{
    // console.log('msg',message)
    //use && for both checking. IMP
    if(message && (message !== 'Post liked successfully' && message !== 'Post disliked successfully')){
      toast.success(message)
      dispatch(getOthersTimelinePostAction(user?.username))
      dispatch({type:CLEAR_POST_OPERATIONS_WITHOUT_POSTS})
    }else if(message && (message === 'Post liked successfully' || message === 'Post disliked successfully')){
      toast.success(message)
      dispatch(getOthersTimelinePostAction(user?.username))
      dispatch({type:CLEAR_POST_OPERATIONS_WITHOUT_POSTS})
    }
    // fetchPosts()
    },[message])
    
    useEffect(()=>{
      if(opErr){
        toast.error(opErr)
        dispatch({type:CLEAR_POST_OPERATIONS})
      } 
    },[opErr])

    useEffect(()=>{
      if(opPOst){
        dispatch(getOthersTimelinePostAction(user?.username))
        dispatch({type:CLEAR_POST_OPERATIONS_WITHOUT_POSTS})
      }
    },[opPOst])

    useEffect(()=>{
    setState(posts?.data)
    },[posts])

  return (
    <div className='feed mt-5'>
        <div className='feedWrapper p-3'>
        <Share/>
        {posts === null && loading ?
        <div className='d-flex justify-content-center text-center my-4'>
            <Spinner animation="grow"/>
            <Spinner animation="grow" className='mx-3'/>
            <Spinner animation="grow"/>
          </div>
        :
        posts?.data?.length ?
        
        posts?.data?.sort((x,y)=>new Date(y.createdAt) - new Date(x.createdAt))?.map((item, index)=>(
            <Post item={item} key={index} handleDelete={handleDelete}
            handleUpdate={handleUpdate} handleLIkeUnlike={handleLIkeUnlike}
            handleAddComment={handleAddComment}
            handleLikeUnlikeComment={handleLikeUnlikeComment}
            handleDeleteComment={handleDeleteComment}
            handleReportComment={handleReportComment}
            />
        ))
        :
        posts !== null && !posts?.data?.length ?
        <div className='py-5'>
          <h1 className='text-center mt-5 text-secondary fw-light'>Please Start by creating a post or by following a user.</h1>
        </div>
        :
      <Stack spacing={1} className='my-4'>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={100} height={100} />
      <Skeleton variant="rectangular" width={'100%'} height={220} />
      <Skeleton variant="rounded" width={'100%'} height={100} />
    </Stack>

}
        </div>
    </div>
  )
}

export default Feed