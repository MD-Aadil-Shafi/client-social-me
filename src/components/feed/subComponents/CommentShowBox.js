import React,{useState} from 'react'
import './commentSection.scss'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FlagIcon from '@mui/icons-material/Flag';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CommentShowBox = ({id, item,postUserId, handleLikeUnlikeComment, handleDeleteComment, handleReportComment}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((store) => store.user)
  const {loading} = useSelector((store)=> store.postOperations)
  const [reportMessage, setReportMessage] = useState('')
  const [showReportModal, setShowReportModal] = useState(false)

  const commentLikeUnlikeHandler = () =>{
    handleLikeUnlikeComment(id, item?.commentId)
  }
  const commentDeleteHandler = () =>{
    handleDeleteComment(id, item?.commentId)
  }

  const commentReportHandler = async() =>{
    if(!reportMessage) return toast.error('Please enter reason to report.')
    handleReportComment(id, item?.commentId, reportMessage).then(()=>{
      setReportMessage('')
      setShowReportModal(false)
    })
  }

  return (
    <div className={`row justify-content-between p-2 shadow-sm rounded comment-show-box bg-white m-1 mb-2`}>
        <div className='col-md-3'>
        <img
        onClick={()=>navigate(`/user/profile/${item?.username}`)}
        style={{cursor:'pointer'}}
        src={item?.userPic ? item.userPic : '/assets/blank.png'} alt='user image' className='comment-user-img'/>
        <p className='text-secondary fw-light'>{item?.userName}</p>
        <p className='text-secondary fw-lighter'>{`${moment(new Date(parseInt(item?.commentId))).fromNow()}`}</p>

        </div>
        <div className='col'>
            <h6 className='fw-light' style={{whiteSpace :'break-spaces'}}>
            {item?.comment}
            </h6>
        </div>
    
        {user?._id
          ?
          <div className='d-flex justify-content-end p-2'>
            <>
            {item?.userId === user?._id || postUserId === user?._id ?
            <button className='btn btn-danger post-circle-btn-in mx-2' onClick={commentDeleteHandler} disabled={loading}><DeleteIcon/></button>
            : null}

            {item?.userId !== user?._id ?
            <>
            <button className='btn btn-light text-danger' onClick={commentLikeUnlikeHandler}
            disabled={loading}
            >
            {item?.likes.length && item?.likes.some(x => x.userId === user._id) ? <FavoriteIcon className='text-danger'/> : <FavoriteBorderIcon size={20} className='text-danger'/>}    
            </button>
            
            </>
            : null
            }
            <p className='mb-0 pt-1 mx-2'>{item?.likes?.length}</p>
            </>
            {item?.userId !== user?._id ?
            <Button size='small' variant="outlined" color="error" onClick={()=>setShowReportModal(true)}>
            <FlagIcon/> Report
            </Button>
            :null}
          </div>
          :
          null
          }
    <Modal
        open={showReportModal}
        onClose={()=>setShowReportModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please enter short reason for reporting this comment.
          </Typography>
          <TextField value={reportMessage} onChange={e=> setReportMessage(e.target.value)}  fullWidth label="Reason" id="fullWidth" className='my-2'/>
          <Button color='error'
          onClick={commentReportHandler}
          ><FlagIcon/> Report</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default CommentShowBox