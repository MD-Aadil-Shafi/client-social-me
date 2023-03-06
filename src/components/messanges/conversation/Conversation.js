import React from 'react'
import './conv.scss'
import { Avatar } from '@mui/material'
// import { useDispatch, useSelector } from 'react-redux'


const Conversation = ({conv, setConvId,convId, setConvDp, setFrndId, setCurrConv}) => {
  // const dispatch = useDispatch()
  // const {user} = useSelector((store)=>store.user)
  


  // console.log('conv',conv)

  return (
    <span className={`d-flex align-items-center mb-3 conversation p-2 rounded ${convId === conv?.conv?._id ? 'bg-warning text-dark' : 'text-light'}`} style={{cursor:'pointer'}}
    onClick={()=>{setConvId(conv?.conv?._id); setConvDp(conv?.detail?.profilePicture); setCurrConv(conv); setFrndId(conv?.detail?._id)}}
    >
    <Avatar alt='img' src={conv?.detail?.profilePicture ? conv?.detail?.profilePicture : 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'}/>
    <div>
    <p className='mb-0 fw-light mx-3'>{conv?.detail?.name}</p>
    </div>
    </span>
  )
}

export default Conversation