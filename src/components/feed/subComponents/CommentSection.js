import React,{useState, useEffect} from 'react'
import CommentShowBox from './CommentShowBox'
import {toast} from 'react-toastify'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

const CommentSection = ({id, comments, postUserId, handleAddComment, handleLikeUnlikeComment, handleDeleteComment, handleReportComment}) => {
  const {user} = useSelector((store) => store.user)
  const {loading} = useSelector((store)=> store.postOperations)
  const [cmnt, setCmnt] = useState('')

  const handleComment = async()=>{
    if(!cmnt){
      return toast.error('Cannot add empty comment')
    }else{
     await handleAddComment(id,cmnt).then(()=>{
      !loading && setCmnt('')
     })
      
    }
  }

  return (
    <div className='mx-0 my-3 comment-section'>
        <hr></hr>
        
        <div className='m-1 p-3 shadow-sm rounded'>
            <label>What's your views on this ?</label>
            <textarea className='form-control' placeholder='write your views here...' value={cmnt} onChange={(e)=>setCmnt(e.target.value)}></textarea>
            <div className='text-end mt-3'>
                <button className='btn btn-info text-light btn-sm shadow' onClick={handleComment} disabled={loading}>
                  {
                  loading ?
                  <span className='px-4'>
                  <Spinner animation="grow"  size='sm'/>
                  </span>
                  :
                  <><SendIcon/> Post</>
                  }
                  </button>
            </div>
        </div>
        <p className='mx-1 my-3'>Comments on this post : {comments?.length}</p>
        {
        comments?.sort((a,b)=>b?.commentId - a?.commentId)?.map((item, idx)=>(
          <div className={`${item?.userId === user?._id ? 'mRight' : 'mLeft'}`} key={idx}>
            <CommentShowBox id={id} item={item} postUserId={postUserId}
            handleLikeUnlikeComment={handleLikeUnlikeComment}
            handleDeleteComment={handleDeleteComment}
            handleReportComment={handleReportComment}
            />
            </div>
        ))
        
      }
    </div>
  )
}

export default CommentSection