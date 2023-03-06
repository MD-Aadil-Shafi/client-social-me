import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import DrawerAppBar from '../../components/topbar/TopBar2'
import '../profile/profile.scss'
import FriendProfileInfo from './FriendProfileInfo'

const FriendProfile = () => {
  return (
    <>
    <DrawerAppBar/>
    <div className='profile'>
        <Sidebar/>
        <FriendProfileInfo/>
    </div>
    </>
  )
}

export default FriendProfile