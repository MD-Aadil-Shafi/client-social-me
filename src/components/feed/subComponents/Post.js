import { Avatar, Chip } from '@mui/material'
import React,{useEffect,useState, useRef} from 'react'
import './post.scss'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Favorite, More, MoreVert, ThumbUp } from '@mui/icons-material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import TagFacesIcon from '@mui/icons-material/TagFaces';

import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import {useSelector, useDispatch} from 'react-redux'
import CommentSection from './CommentSection';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
// import { deletePostAction } from '../../../redux/actions/postAction';
// import { toast } from 'react-toastify';
// import { CLEAR_POST_OPERATIONS } from '../../../redux/constants/postConstants';

const Post = ({item, handleDelete, handleUpdate, handleLIkeUnlike, handleAddComment, handleLikeUnlikeComment, handleDeleteComment, handleReportComment}) => {
  const navigate = useNavigate()
  const {user} = useSelector((store)=>store.user)
  const {loading} = useSelector((store)=> store.postOperations)
  const [like, setLike] = useState(item?.likes?.length || 0)//post.like
  const [isLiked, setIsLiked] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [time, setTime] = useState(10)
  const [isEdit, setIsEdit] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [showComment, setShowComment] = useState(false)
  
  const likeHandler = (val) =>{
    handleLIkeUnlike(item?._id, val)
    setTimeout(()=>{
      setShowBtn(false)
    },1500)
    // setLike(isLiked ? like - 1 : like +1)
    // setIsLiked(!isLiked)
  }

  useEffect(()=>{
    if(confirm){
      setTimeout(()=>{
        setConfirm(false)
        setTime(10)
      },10000)
    } 
  },[confirm])

  const [prevDesc, setPrevDesc] = useState(item?.desc)
  const handleDescUpdate = ()=>{
    handleUpdate(item?._id,{desc:prevDesc})
    setIsEdit(false)
  }


  
  return (
    <div className='post p-4 mt-3'>
        <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
            <Chip
  avatar={<Avatar alt="Natacha" src={item?.userPic ? item?.userPic : "/assets/blank.png"} />}
  label={item?.username}
  variant="outlined"
  onClick={()=>navigate(`/user/profile/${item?.username}`)}
      style={{cursor:'pointer'}}
/>
<span className='text-secondary fw-light mx-4'>{`${moment(new Date(item?.createdAt)).fromNow()}`}</span>
</div>
            {!confirm ?

            <div className='d-flex'>
              {item?.userId === user?._id ?
            <DropdownButton
            key='start'
            id='1'
            drop='start'
            variant=""
            title={<MoreVert/>}
          >
            <>
            <Dropdown.Item eventKey="1" onClick={()=>setConfirm(true)}>Delete <DeleteIcon/></Dropdown.Item>
            <Dropdown.Divider />
            {['public','private','friends'].map((p)=>(
              item?.privacy !== p &&
              <Dropdown.Item eventKey="2"
              disabled={loading}
              onClick={()=>handleUpdate(item?._id,{privacy:p})}
              >Set for {p} {p === 'public' ? <> <PublicIcon className='text-info'/></> : p === 'private' ? <><LockIcon className='text-secondary'/></> : <><Diversity3Icon className='text-success'/></>}</Dropdown.Item>
            ))}
            <Dropdown.Item eventKey="3" onClick={()=>setIsEdit(true)}>Edit <EditIcon/></Dropdown.Item>
            </>

          </DropdownButton>
          :
          null }
          {item?.userId === user?._id ?
          <div className='mt-2'>
          {item?.privacy === 'public' ? <> <PublicIcon className='text-info'/></> : item?.privacy === 'private' ? <><LockIcon className='text-secondary'/></> : <><Diversity3Icon className='text-success'/></>}
          </div>
          :null}
            </div>
            :
            <div className='d-flex justify-content-evenly'>
              <button className='btn btn-sm btn-light shadow text-danger mx-2' disabled={loading} onClick={()=>handleDelete(item?._id)}><DeleteIcon/></button>
              <button className='btn btn-sm btn-light shadow text-secondary' onClick={()=>setConfirm(false)}><BlockIcon/></button>
              <div>
              <p className='text-danger fw-light'>will auto cancel in 10 sec</p>
              </div>
              </div>
              }
        </div>
        <div className='post-img-div w-100 my-3'>
          {isEdit ?
          <div>
          <textarea className='form-control' value={prevDesc} onChange={e=> setPrevDesc(e.target.value)}/>
          <div className='d-flex justify-content-end'>
          <button className='btn btn-sm btn-light shadow text-success mx-2' disabled={loading} onClick={handleDescUpdate}><DoneIcon/></button>
          <button className='btn btn-sm btn-light shadow text-secondary' onClick={()=>setIsEdit(false)}><BlockIcon/></button>
            </div>
          </div>
          :
            <p className='fw-light'>{item?.desc}</p>
        }
            {item?.img ?
            <img src={item?.img} alt='img' className='post-img'/>
            : null }
            <div className='d-flex justify-content-between align-items-center mt-3'>
                <div className='d-flex align-items-center like-type-div-parent'>
                  {showBtn ?
                  item.likes.some((x)=>x.userId === user?._id) ?
                    <div className='d-flex p-2 bg-light shadow rounded like-type-div'>
                    <button disabled={loading} className={`btn ${item.likes.some((x)=>x.userId === user?._id && x.likeType === 'thumbsup') ? 'btn-info btn-liked' : 'btn-sm text-info'} shadow post-circle-btn-in`} onClick={()=>likeHandler('thumbsup')}><ThumbUp/></button>
                    <button disabled={loading} className={`btn ${item.likes.some((x)=>x.userId === user?._id && x.likeType === 'love') ? 'btn-danger btn-liked' : 'btn-sm text-danger'} shadow post-circle-btn-in mx-2`} onClick={()=>likeHandler('love')}><Favorite/></button>
                    <button disabled={loading} className={`btn ${item.likes.some((x)=>x.userId === user?._id && x.likeType === 'laugh') ? 'btn-warning btn-liked' : 'btn-sm text-warning'} shadow post-circle-btn-in`} onClick={()=>likeHandler('laugh')}><TagFacesIcon/></button>
                    <button disabled={loading} className={`btn ${item.likes.some((x)=>x.userId === user?._id && x.likeType === 'lit') ? 'btn-lit btn-liked' : 'btn-sm text-lit'} shadow post-circle-btn-in mx-2`} onClick={()=>likeHandler('lit')}><WhatshotIcon/></button>
                    <button disabled={loading} className={`btn shadow text-secondary post-circle-btn-in mx-2`} onClick={()=>setShowBtn(false)}><BlockIcon/></button>
                    </div>
                    :
                    <div className='d-flex p-2 bg-light shadow rounded like-type-div'>
                    <button disabled={loading} className='btn shadow text-info post-circle-btn-in' onClick={()=>likeHandler('thumbsup')}><ThumbUp/></button>
                    <button disabled={loading} className='btn shadow text-danger post-circle-btn-in mx-2' onClick={()=>likeHandler('love')}><Favorite/></button>
                    <button disabled={loading} className='btn shadow text-warning post-circle-btn-in' onClick={()=>likeHandler('laugh')}><TagFacesIcon/></button>
                    <button disabled={loading} className='btn shadow post-circle-btn-in mx-2' style={{color:'orange'}} onClick={()=>likeHandler('lit')}><WhatshotIcon/></button>
                    <button disabled={loading} className='btn shadow text-secondary post-circle-btn-in mx-2' onClick={()=>setShowBtn(false)}><BlockIcon/></button>
                    </div>
                    :
                    item.likes.some((x)=>x.userId === user?._id) ?
                    <>
                    <button className='btn btn-light shadow post-circle-btn' onClick={()=>setShowBtn(true)}>
                    {item.likes.some((x)=>x.userId === user?._id && x.likeType === 'thumbsup') ?
                    <ThumbUp className='text-info'/>
                    :
                    item.likes.some((x)=>x.userId === user?._id && x.likeType === 'love') ?
                    <Favorite className='text-danger'/>
                    :
                    item.likes.some((x)=>x.userId === user?._id && x.likeType === 'laugh') ?
                    <TagFacesIcon className='text-warning'/>
                    :
                    <WhatshotIcon className='text-lit'/>
                    }
                    </button>
                    </>
                    :
                    <button className='btn btn-secondary post-circle-btn' onClick={()=>setShowBtn(true)}><ThumbUpOffAltIcon/></button>
                  }
                    {/* <button className='btn btn-danger post-circle-btn mx-4' onClick={likeHandler}><Favorite/></button> */}
                    <p className='fw-light mb-0 mx-2'>{item?.likes?.length} people liked it.</p>
                </div>
                <div>
                  <div className='d-flex'>
                    {showComment ?
                      <h6 className='fw-light mb-0 text-secondary' style={{cursor:'pointer'}} onClick={()=>setShowComment(false)}><BlockIcon/></h6>
                    :
                    <h6 className='fw-light mb-0' style={{cursor:'pointer'}} onClick={()=>setShowComment(true)}>{item?.comments?.length || 0} comments</h6>
                    }
                
                </div>
                <hr className='my-0 py-0'></hr>
                </div>
            </div>
        </div>
        {/* comment section */}
        {showComment ?
                  <CommentSection id={item?._id} postUserId={item?.userId} comments={item?.comments} handleAddComment={handleAddComment}
                  handleLikeUnlikeComment={handleLikeUnlikeComment}
                  handleDeleteComment={handleDeleteComment}
                  handleReportComment={handleReportComment}
                  />
                  :
                  null }
        {/* ************ */}
    </div>
  )
}

export default Post