import React,{useEffect, useState, useRef} from 'react'
import ChatBox from '../../components/messanges/chatbox/ChatBox'
import Conversation from '../../components/messanges/conversation/Conversation'
import OnlineComp from '../../components/rightbar/subCompoents/OnlineComp'
import Topbar from '../../components/topbar/Topbar'
import './messanger.scss'
import { useDispatch, useSelector} from 'react-redux'
import { getConversationAction, getMessageAction, deleteMessageAction } from '../../redux/actions/chatAction'
import  Spinner  from 'react-bootstrap/Spinner'
import DrawerAppBar from '../../components/topbar/TopBar2'
//socket io
// import { io } from 'socket.io-client'

const Messanger = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((store)=>store.user)
  const {loading:convLoading, conversation, error} = useSelector((store)=>store.getConversation)
  const {onlineUsers} = useSelector((store)=> store.onlineUsers)


  const [convId, setConvId] = useState('')
  const [convDp, setConvDp] = useState('')
  const [frndId, setFrndId] = useState('')
  //
  //will make one 
  const [currConv, setCurrConv] = useState(null)
  //socket
  // const [socket, setSocket] = useState(null)
//   useEffect(()=>{
// //ws=>websocket
// setSocket(io("ws://localhost:8900"))
//   },[])

//for test
// useEffect(()=>{
//   //to take res form server use socket.on(...)
//   socket?.on("TestEventName", msgs=>{
//     alert(msgs)
//   })
// },[socket])
  //

  useEffect(()=>{
    dispatch(getConversationAction())
  },[])

  useEffect(()=>{
    if(convId){
      dispatch(getMessageAction(convId))
    }
  },[convId])

  // console.log('conversations form Messanger', conversation)

  const deleteMessage = async(id) =>{
    let confirm = window.confirm('This message will be deleted for both the party.')
    if(!confirm) return ;
    await dispatch(deleteMessageAction(id)).then(()=>{
     convId && dispatch(getMessageAction(convId))
    })
  }

  const [pullConv, setPullConv] = useState(false)
  const [pullChat, setPullChat] = useState(false)

  return (
    <>
    {/* <Topbar/> */}
    <DrawerAppBar/>
    <br></br>
    <div className='d-flex justify-content-between puller-btns'>
        <button className='btn btn-sm btn-warning pull-conv'
        onClick={()=>setPullChat(!pullChat)}
        >
          {pullChat ? 'Hide Conversations' : 'Show Conversations'}
        </button>
        <button className='btn btn-sm btn-success pull-active'
        onClick={()=>setPullConv(!pullConv)}
        >
          {pullConv ? 'Hide Active Users' : 'Show Active Users'}
        </button>
      </div>
    <div className='container-fluid p-2 mx-0 messagner mt-5'>

        <div className={`chat-menu p-4 rounded shadow ${pullChat ? 'chat-menu-inn' : null}`}>
          {convLoading ?
          <div className='d-flex justify-content-center my-4'>
          <Spinner animation='grow' size='sm' className='text-light'/>
          <Spinner animation='grow' className='mx-2 text-light' size='sm'/>
          <Spinner animation='grow' size='sm' className='text-light'/>
          </div> 
          :
          <>
          <p className='text-center rounded shadow text-light fw-light' style={{backgroundColor:'#5B8FB9'}}>Existing Conversations</p>
          {conversation?.map((item, idx)=>(
            <div key={idx}>
            <Conversation conv={item} setConvId={setConvId} convId={convId} setConvDp={setConvDp} setFrndId={setFrndId} setCurrConv={setCurrConv}/>
            </div>
          ))}
          </>
          }

        </div>
        <div className='chat-box p-4 rounded mx-2 shadow'>
        <ChatBox convId={convId} convDp={convDp} frndId={frndId} currConv={currConv}
        deleteMessage={deleteMessage}
        />
        </div>
        <div className={`online p-4 rounded shadow ${pullConv ? 'online-inn' : null}`}>
          <p className='text-center text-light fw-light rounded shadow' style={{backgroundColor:'purple'}}>Online Friends</p>
          {onlineUsers?.length ?
          onlineUsers?.map((item,idx)=>(
            <div key={idx}>
              {item?.userId !== user?._id &&
              <OnlineComp item={item}/>
              }
            </div>
          ))
          :
          <p>No User is Online</p>
        }

        </div>

    </div>
    </>
  )    
}

export default Messanger