import { ariaHidden, Button } from '@mui/material'
import React,{useRef, useState, useEffect} from 'react'
import './chatbox.scss'
import Message from './Message'
import SendIcon from '@mui/icons-material/Send';
import Spinner from 'react-bootstrap/Spinner'
import { useSelector, useDispatch } from 'react-redux';
import { addMessageAction,getMessageAction } from '../../../redux/actions/chatAction';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client'
import { GET_MESSAGE_SUCCESS, GET_ONLINE_USERS } from '../../../redux/constants/chatConstants';

const ChatBox = ({convId, convDp, frndId, currConv, deleteMessage}) => {
  const dispatch = useDispatch()
  const {user} = useSelector((store)=>store.user)
  const {conversation} = useSelector((store)=>store.getConversation)
  const {loading,messages, error} = useSelector((store)=>store.getMessage)
  const {loading:nL,messages:nM, error:nE} = useSelector((store)=>store.addMessage)

  const msgRef = useRef(null)
  const scrollRef = useRef(null)
  const [fetchedMsgs, setFetchedMessages] = useState([])

  //to also push own sent message to show in chatbox
  const [chunk, setChunk] = useState(null)

  const handleMessage = () =>{
    if(msgRef?.current?.value){
      let newChunk = {conversationId:convId, sender:user?._id, text:msgRef?.current?.value }
      setChunk(newChunk)
      //sending messge to socket
      const receiverId = frndId
      socket.current.emit("sendMessage",{
        senderId:user?._id,
        receiverId,
        text:msgRef?.current?.value
      })
      //
      dispatch(addMessageAction(newChunk))

    }
  }

  useEffect(()=>{
      if(nM && msgRef?.current?.value) {
        msgRef.current.value = '';
        let prevMsg = messages;
        let chunkMsg = chunk ? chunk : {}
        let newMsg =  prevMsg.concat(chunkMsg)
        dispatch({type: GET_MESSAGE_SUCCESS, payload: newMsg})
        scrollRef?.current?.scrollIntoView({behaviour:"smooth"})
        // dispatch(getMessageAction(convId))
      }
  },[nM])

  useEffect(()=>{
    if(error) toast.error(error)
  },[error])

  useEffect(()=>{
    // setFetchedMessages(messages)
    scrollRef?.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])

  // console.log('innmsg',messages)

  //socket
  const [arrivalMsg, setArrivalMsg] = useState(null)
//now with useRef
const socket = useRef()
useEffect(()=>{
  //socket.current = io("ws://localhost:8900")
  socket.current = io("https://socialmeapi-production.up.railway.app")
//to get message
socket.current.on("getMessage", m =>{
    //update on arrival message
    // console.log('m', m)
  setArrivalMsg({
    sender: m.senderId,
  text: m.text,
  createdAt: Date.now()
  })
})
},[])

useEffect(()=>{
//to send to server
socket.current.emit("addUser", user._id, user?.name, user?.profilePicture)
socket.current.on("getUsers", u=>{
  dispatch({type: GET_ONLINE_USERS, payload: u})
  // console.log('socket user',u)
  
})
},[user])


useEffect(()=>{
  // console.log('arrival msg', arrivalMsg, 'sender', currConv?.members?.includes(arrivalMsg?.sender))
  // arrivalMsg && currConv?.members?.includes(arrivalMsg?.sender) &&
 
  // setFetchedMessages((prev)=>[...prev, arrivalMsg])
  if(arrivalMsg && currConv?.conv?.members?.includes(arrivalMsg?.sender)){
    let prevMsg = messages;
    let arrMsg = arrivalMsg;
    let newMsg =  prevMsg?.concat(arrMsg)
    dispatch({type: GET_MESSAGE_SUCCESS, payload: newMsg})
  }
},[arrivalMsg, currConv])
  //

  return (
    convId ?
    <>
    <div className='chat-box-top'>
      {loading?
        <div className='d-flex justify-content-center my-4'>
          <Spinner animation='grow' size='sm' className='text-light'/>
          <Spinner animation='grow' className='mx-2 text-light' size='sm'/>
          <Spinner animation='grow' size='sm' className='text-light'/>
          </div> 
      :
      messages?.length ? 
      messages?.map((item, idx)=>(
        <div ref={scrollRef} key={idx}>
        <Message msg={item} me={item?.sender === user?._id ? true : false} convDp={convDp}
        deleteMessage={deleteMessage}
        />
        </div>
      ))
    :
    <p className='text-center text-light my-5'>No Previous Chats Found. Start new conversation</p>
    }
        {/* <Message/>
        <Message/>
        <Message me={true}/>
        <Message/>
        <Message/> */}
    </div>
    <div className='chat-box-bottom d-flex'>
        <textarea ref={msgRef} className='form-control mt-2 text-area' placeholder='Write your message here...'
        style={{maxHeight:'100px'}}
        />
        <div style={{marginLeft:'5px'}}>
          <div style={{height:'60px'}} className='mt-2 pt-3 text-center'>
            {nL ?
          <Spinner animation='grow' size='sm' className='text-light'/>
          : null }
          </div>
          <Button className='btn rounded rounded-pill' variant='contained' color='secondary'
          onClick={handleMessage}
          disabled={nL}
          >
            <SendIcon/>
          </Button>
        </div>
    </div>
    </>
    :

    <h3 className='text-center text-light my-5'>Select User To Chat</h3>

  )
}

export default ChatBox