import { Book, Bookmark, Chat, Event, Group, QuestionMark, RssFeed, VideoCameraFront, Work } from '@mui/icons-material'
import React from 'react'
import { toast } from 'react-toastify'
import './sidebar.scss'
import CloseFriend from './subCompoents/CloseFriend'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'

const Sidebar = () => {
const dispatch = useDispatch()
const {user} = useSelector((store)=>store.user)
//get userList is called in feed section to avoid token error
const navigate = useNavigate()

  const handleAlert = () =>{
    return toast.info('Static feature.')
  }
  return (
    <div className='sidebar shadow-sm sticky-top'>
        <div className='sidebarWrapper px-4'>
        <div className='sidebar-links text-secondary'>
            <h5 className='mb-3 fw-bold' style={{cursor:'pointer'}} onClick={()=>navigate('/friends')}><Group sx={{fontSize:25}}/> Friends</h5>
            <h5 className='mb-3 fw-bold' style={{cursor:'pointer'}} onClick={()=>navigate('/chats')}><Chat sx={{fontSize:25}}/> Chats</h5>
            {/* <h5 className='mb-3 fw-bold' style={{cursor:'pointer'}}><QuestionMark sx={{fontSize:25}}/> Questions</h5> */}
            {/* <h5 className='mb-3 fw-light' onClick={handleAlert}><VideoCameraFront sx={{fontSize:25}}/> Videos</h5>
            <h5 className='mb-3 fw-light' onClick={handleAlert}><Work sx={{fontSize:25}}/> Jobs</h5>
            <h5 className='mb-3 fw-light' onClick={handleAlert}><Event sx={{fontSize:25}}/> Events</h5>
            <h5 className='mb-3 fw-light' onClick={handleAlert}><Book sx={{fontSize:25}}/> Courses</h5> */}
            {/* <button className='btn btn-secondary'>View More</button> */}
            <hr></hr>
        </div>
        {/*for all users to add friends */}
        <CloseFriend/>
        </div>
    </div>
  )
}

export default Sidebar