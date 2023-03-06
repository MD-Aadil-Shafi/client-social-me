import React from 'react'
import './profile.scss'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import ProfileInfo from './ProfileInfo'
import DrawerAppBar from '../../components/topbar/TopBar2'

const Profile = () => {
  return (
    <>
    {/* <Topbar/> */}
    <DrawerAppBar/>
    <div className='profile'>
      <Sidebar/>
      <ProfileInfo/>
    </div>
    </>
  )
}

export default Profile