import { Avatar } from '@mui/material'
import React,{useState, useEffect} from 'react'
import './share.scss'
import Button from '@mui/material/Button';
import { ShareRounded,EmojiEmotions, LocationCity, PhotoCamera, Tag, MoreVert, PermMedia } from '@mui/icons-material';
import { lime } from '@mui/material/colors';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { createPostAction } from '../../../redux/actions/postAction';
import { getOthersTimelinePostAction } from '../../../redux/actions/postAction';
import { useSelector, useDispatch} from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';


const colorLime = lime[500];

const Share = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((store)=>store.user)
  const {loading, posts, error} = useSelector((store)=>store.postOperations)
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState(null)
  const [privacy, setPrivacy] = useState('public')

  const handleSubmit = ()=>{
    if(!desc && !img) return toast.error('No content to post')
    const formData = new FormData()
    formData.append('desc',desc)
    formData.append('privacy',privacy)
    formData.append('file',img)

    dispatch(createPostAction(formData))
  }

  useEffect(()=>{
    if(error) toast.error(error)
},[error])

useEffect(()=>{
  dispatch(getOthersTimelinePostAction(user?.username))
  setImg(null)
  setDesc('')
  setPrivacy('public')
},[posts])

  return (
    <div className='share p-4 shadow-sm'>
        <div className='shareWrapper'>
            <div className='d-flex'>
            <Avatar src={user?.profilePicture ? user?.profilePicture : '/assets/blank.png'} alt='img' sx={{ width: 60, height: 60 }}/>
           <textarea className='form-control share-inp' placeholder="What's in you mind ?."
           value={desc}
           onChange={e=>setDesc(e.target.value)}
           ></textarea>
            </div>
            <hr></hr>
            <div className='d-flex justify-content-end'>
            <label htmlFor="file" className="shareOption mx-5">
              <PhotoCamera color="secondary" className="mt-2" style={{cursor:'pointer'}}/>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </label>
            {/* <Button className=' share-btns' color="secondary"><PhotoCamera/> Photo</Button> */}
            
            {img ? 
            <div className='d-flex align-items-center'>
            <Avatar alt="Remy Sharp" src={URL.createObjectURL(img)}/>
            <div>
            <IconButton aria-label="delete" size="small" onClick={()=>setImg(null)}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            </div>
            </div>
            :
            null  
            }
            
            <div className='mx-5'>
            <DropdownButton
            key='start'
            id='1'
            drop='start'
            variant=""
            title={privacy === 'public' ? <><MoreVert/> <PublicIcon className='text-info'/></> : privacy === 'private' ? <><MoreVert/> <LockIcon className='text-secondary'/></> : <><MoreVert/> <Diversity3Icon className='text-success'/></>}
          >
            <Dropdown.Item eventKey="1" onClick={()=>setPrivacy('public')}><PublicIcon/> public</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={()=>setPrivacy('private')}><LockIcon/> private</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="3" onClick={()=>setPrivacy('friends')}><Diversity3Icon/> friends</Dropdown.Item>
          </DropdownButton>
            </div>
            {/* <Button className=' share-btns' color="error"><Tag/> Tags</Button>
            <Button className='text-warning share-btns'><LocationCity/> Location</Button>
            <Button className='text-info  share-btns'><EmojiEmotions/> Feelings</Button> */}
            <Button className='share-btns px-2' variant="contained" color="primary"
            disabled={loading}
            onClick={handleSubmit}
            ><ShareRounded/> {
              loading ? <Spinner/>
              : 'Share'
            }</Button>
            
            </div>
        </div>
    </div>
  )
}

export default Share