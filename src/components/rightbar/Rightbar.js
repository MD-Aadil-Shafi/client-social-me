import { Cake} from '@mui/icons-material'
import React,{useEffect, useRef} from 'react'
import './rightbar.scss'
import Online from './subCompoents/Online'
import {useSelector } from 'react-redux'
import OnlineComp from './subCompoents/OnlineComp'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';

const Rightbar = () => {

  const {user} = useSelector((store)=>store.user)
  const {onlineUsers} = useSelector((store)=> store.onlineUsers)


  return (
    <div className='rightbar px-4 shadow-sm sticky-top'>
      <div className='w-100 shadow-sm d-flex'>
        <Cake sx={{width:40,height:40}} style={{color:'purple',marginRight:'6px'}}/>
        <p className='fw-light'><span className='fw-bold'>Example Frient</span> and <span className='fw-bold'>1 Other Friend</span>
        have birthday today
        </p>
      </div>
      <img src='/assets/mern.png' alt='img' className='rightbar-banner my-3'/>
    
    <p className=''>Online Users:</p>
      {onlineUsers?.length ?
          onlineUsers?.map((item,idx)=>(
            <div key={idx}>
              {item?.userId !== user?._id &&
              <OnlineComp item={item} type={true}/>
              }
            </div>
          ))
          :
          <>
          <h1 className='text-center text-secondary'><ElectricalServicesIcon/></h1>
          <p className='text-center text-secondary'>No User is Online</p>
          </>
          
        }
    
    </div>
  )
}

export default Rightbar