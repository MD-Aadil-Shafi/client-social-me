import React from 'react'
import { Badge, Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addConversationAction, getConversationAction } from '../../../redux/actions/chatAction'
import { useNavigate } from 'react-router-dom'

const OnlineComp = ({item,type}) => {
  const navigate = useNavigate()
  const {user} = useSelector((store)=> store.user)
const dispatch = useDispatch()
  const handleCreateConv = async() =>{
    if(type){//type if using form home right bar elso default form chat screen
      navigate('/chats')
      await dispatch(addConversationAction({senderId:user?._id, receiverId:item?.userId})).then(()=>{
        dispatch(getConversationAction())
      })
    }else{
      await dispatch(addConversationAction({senderId:user?._id, receiverId:item?.userId})).then(()=>{
        dispatch(getConversationAction())
      })
    }
    
  }
  return (
    <span className='d-flex align-items-center mb-3' style={{cursor:'pointer'}}
    onClick={handleCreateConv}
    >
            <Badge variant="dot" color="success">
                <Avatar alt='img' src={item?.dp ? item?.dp : '/assets/blank.png'}/>
            </Badge>
                <p className={`pt-3 fw-light mx-3 ${type ? 'text-dark' : 'text-light'}`}>{item?.userName}</p>
            </span>
  )
}

export default OnlineComp