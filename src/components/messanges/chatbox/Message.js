import React from 'react'
import './chatbox.scss'
import { Avatar } from '@mui/material'
import {format} from 'timeago.js'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';

const Message = ({msg, me, convDp, deleteMessage}) => {
  const {user} = useSelector((store)=>store.user)
  // console.log('convDp', convDp)
  return (
    <span className={`message-block d-flex align-items-center mb-3 p-2 rounded ${me ? 'justify-content-start' : 'justify-content-end'}`} style={{cursor:'pointer'}}>
    <Avatar alt='img' src={me && user?.profilePicture ? user?.profilePicture : !me && convDp ? convDp : '/assets/blank.png'}/>
    <div>
    <p className={`mb-0 fw-light text-light mx-3 message-chunk p-2 ${me ? 'bg-primary' : 'bg-info'}`}>{msg?.text}</p>
    <p className='fw-light text-light mx-3'>{format(msg?.createdAt)}</p>
    </div>
    <badge className='message-inner-block text-light bg-danger rounded rounded-spill'
    onClick={()=>deleteMessage(msg?._id)}
    >
    <DeleteIcon/>
    </badge>
    </span>
  )
}

export default Message