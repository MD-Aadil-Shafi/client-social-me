import React, { useEffect } from 'react'
import './online.scss'
import { Avatar, Badge } from '@mui/material'
import { useDispatch, useSelector} from 'react-redux'

const Online = () => {
    const dispatch = useDispatch()
    // const {user} = useSelector((store)=>store.user)
    // const {loading, users, error} = useSelector((store)=>store.userList)

    //getFriendList
    //will be called in feed section to avoid token error

  return (
    <div className='online-friends'>
        <h5 className='fw-light'>My Frinds</h5>
        <hr className='mt-0 pt-0'></hr>
            <span className='d-flex align-items-center'>
            <Badge variant="dot" color="success">
                <Avatar alt='img' src='https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'/>
            </Badge>
                <p className='pt-3 fw-light mx-3'>Test User Name</p>
            </span>
            <span className='d-flex align-items-center'>
            <Badge variant="dot" color="success">
                <Avatar alt='img' src='https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'/>
            </Badge>
                <p className='pt-3 fw-light mx-3'>Test User Name</p>
            </span>
            <span className='d-flex align-items-center'>
            <Badge variant="dot" color="success">
                <Avatar alt='img' src='https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'/>
            </Badge>
                <p className='pt-3 fw-light mx-3'>Test User Name</p>
            </span>
            <span className='d-flex align-items-center'>
            <Badge variant="dot" color="success">
                <Avatar alt='img' src='https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'/>
            </Badge>
                <p className='pt-3 fw-light mx-3'>Test User Name</p>
            </span>
            <span className='d-flex align-items-center'>
            <Badge variant="dot" color="success">
                <Avatar alt='img' src='https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'/>
            </Badge>
                <p className='pt-3 fw-light mx-3'>Test User Name</p>
            </span>


        </div>
  )
}

export default Online