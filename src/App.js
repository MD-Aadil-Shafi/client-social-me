import React, {Suspense, lazy, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify'
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch } from 'react-redux';
import { getNotificationAction } from './redux/actions/notifyAction';

const Activate = lazy(()=> import('./pages/activation/Activate')) 
const Home = lazy(()=> import('./pages/home/Home')) 
const Login = lazy(()=> import( './pages/login/Login'))
const Profile = lazy(()=> import('./pages/profile/Profile')) 
const Register = lazy(()=> import('./pages/register/Register')) 
const Thank = lazy(()=> import('./pages/thanks/Thank')) 
const Friends = lazy(()=> import('./pages/friends/Friends')) 
const Users = lazy(()=> import('./pages/users/Users')) 
const Messanger = lazy(()=> import('./pages/messanger/Messanger')) 
const FriendProfile = lazy(()=> import( './pages/friendProfile/FriendProfile'))

function App() {

  const {user} = useSelector((state)=>state.user)

  const dispatch = useDispatch()
  useEffect(()=>{
    if(user?._id){
      dispatch(getNotificationAction())
    }
  },[user])

  // console.log('user',user)
  return (
<BrowserRouter>
<Suspense fallback={
  <div className='py-5'>
  <div className='d-flex justify-content-center text-center mt-5'>
  <Spinner animation="grow"/>
  <Spinner animation="grow" className='mx-3'/>
  <Spinner animation="grow"/>
</div>
</div>
}>
<Routes>
  <Route exact path='/' element={user ? <Home/> : <Login/>}/>
  <Route path='/login' element={user ? <Home/> : <Login/>}/>
  <Route path='/register' element={user ? <Home/> : <Register/>}/>
  <Route path='/profile/:username' element={user ? <Profile/> : <Login/>}/>
  <Route path='/user/profile/:username' element={user ? <FriendProfile/> : <Login/>}/>
  <Route path='/friends' element={user ? <Friends/> : <Login/>}/>
  <Route path='/add/friends' element={user ? <Users/> : <Login/>}/>
  <Route path='/chats' element={user ? <Messanger/> : <Login/>}/>
  <Route path='/thank-you' element={user ? <Home/> : <Thank/>}/>
  <Route path='/account-verification/:email/:otp' element={user ? <Home/> : <Activate/>}/>
  <Route path="*" element={<Navigate to='/'/>}></Route>
</Routes>
</Suspense>
<ToastContainer/>
</BrowserRouter>
  );
}

export default App;
