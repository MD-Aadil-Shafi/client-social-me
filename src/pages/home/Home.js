
import React from 'react'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import DrawerAppBar from '../../components/topbar/TopBar2'
import './home.scss'

const Home = () => {
  return (
    <>
    {/* <Topbar/> */}
    <DrawerAppBar/>
    <div className='home-container'>
      <Sidebar/>
      <Feed/>
      <Rightbar/>
    </div>
    </>
  )
}

export default Home