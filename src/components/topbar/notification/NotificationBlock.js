import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotificationBlock = ({item, handleClose}) => {
  const navigate = useNavigate()
  return (
    <div className='mb-2 p-2 shadow rounded bg-light' onClick={()=>{navigate(`/user/profile/${item?.username}`); handleClose()}} style={{cursor:'pointer'}}>
        <p className='mb-0'>{item?.userName}, {item?.notifyFor === 'like' ? 'liked' : 'comment' ? 'commented' : 'reply' ? 'replied' : null} on Your post</p>
    </div>
  )
}

export default NotificationBlock