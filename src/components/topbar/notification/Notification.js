import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NotificationBlock from './NotificationBlock';
import { useDispatch, useSelector} from 'react-redux';
import { getNotificationAction, clearNotificationAction } from '../../../redux/actions/notifyAction';
import { CLEAR_NOTIFICATION_STATE } from '../../../redux/constants/notificationConstants';
import { toast } from 'react-toastify';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import RefreshIcon from '@mui/icons-material/Refresh';




const Notification = ({showNotification, setShowNotification}) => {

  const dispatch = useDispatch()

  const {user} = useSelector((store) => store.user)
  const {loading, message, error, notification} = useSelector((store) => store.notifications)
  
// console.log('nof',notification)
//   useEffect(()=>{
//     if(user?._id){
//       dispatch(getNotification())
//     }
//   },[])

  const handleRefresh = () =>{
    if(user?._id){
      dispatch(getNotificationAction())
    } 
  }
  
    const handleClose = () => setShowNotification(false);
    const handleClear = () => {
       notification !== null && notification?.length && dispatch(clearNotificationAction())
    }

    useEffect(()=>{
      if(message){
        toast.success(message)
        dispatch({type:CLEAR_NOTIFICATION_STATE})
      } 
      if(error){
        toast.error(error)
        dispatch({type:CLEAR_NOTIFICATION_STATE})
      } 
      
    },[message, error])
  
    return (
    <Modal show={showNotification} onHide={handleClose} backdrop='static' scrollable
    centered
    >
    <Modal.Header closeButton>
      <Modal.Title>Notifications</Modal.Title>
    </Modal.Header>
    <Modal.Body>

        {notification !== null && notification?.length ? notification?.map((item, index)=>(
          <NotificationBlock item={item} key={index} handleClose={handleClose}/>
        ))
        :
        <p className='text-center'>No new notifications to show</p>
        }
    </Modal.Body>
    <Modal.Footer>
    <Button variant="dark" size='sm' onClick={handleRefresh} disabled={loading}>
      <RefreshIcon/> Refresh</Button>
      <Button variant="secondary" size='sm' onClick={handleClear} disabled={loading}>
        <DeleteSweepIcon/> Clear
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default Notification