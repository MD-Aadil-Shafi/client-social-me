import React,{useState, useEffect, useRef} from 'react'
import Modal from 'react-bootstrap/Modal';
// import ReactCrop from 'react-image-crop'
// import 'react-image-crop/dist/ReactCrop.css'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoUpdateActio, userDpUpdateAction } from '../../redux/actions/authAction';
import { Spinner } from 'react-bootstrap';

const DpModal = ({show, setShow}) => {
  const dispatch = useDispatch()
  const {user} = useSelector((store) => store.user)
  const {loading, error, message} = useSelector((store) => store.updateUserReducer)
    const [file, setFile] = useState(null)
    const [croppedImageUrl, setCroppedImageUrl] = useState("");

    const cropperRef = useRef(null);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    //console.log(cropper.getCroppedCanvas().toDataURL());
  };

  const submitImage = ()=>{
    if(!cropperRef?.current) return toast.error('Please select image file first')
    let pic = cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL()
    console.log(pic)

  fetch(pic)
  .then(res => res.blob())
  .then(blob => {
    const converted = new File([blob], user?.username,{ type: file?.type})
    const formData = new FormData()
    formData.append('file',converted)
    dispatch(userDpUpdateAction(formData))
    // console.log('conv',converted)
  })
    //setCroppedImageUrl(cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL())
    //dispatch(userInfoUpdateAction({profilePicture:pic}))
  }

  const handleFileSelect=(val)=>{
    // console.log(val)
    if(val?.size > 524288) return toast.error('Image should not be more than size of 512 KB')
    setFile(val)
  }

    const handleClose = ()=>{
        setFile(null)
        setCroppedImageUrl(null)
        setShow(false)
    }

    useEffect(()=>{
      if(error) toast.error(error)
  },[error])

  useEffect(()=>{
      if(message){
          toast.success(message)
          window.location.href = `/profile/${user?.username}`
  }
  },[message])

  return (
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <input type='file' onChange={(e)=>handleFileSelect(e.target.files[0])} className='form-control'/>
        <p className='fw-light text-secondary text-center'>Crop the selected picture if you want, by click and drag the selection in aspect ratio of 1 (square)</p>
        <div className='d-flex justify-content-center'>
        {/* <ReactCrop crop={crop} onChange={c => setCrop(c)}>
        
        <img src={URL.createObjectURL(file)} />
        : null }
        </ReactCrop> */}
        <Cropper
        src={file ? URL.createObjectURL(file) : null}
        style={{ height: 400, width: "100%" }}
        // Cropper.js options
        initialAspectRatio={1}
        aspectRatio={1}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
      />
        </div>
        {/* {croppedImageUrl ?
        <img src={croppedImageUrl}/>
      :
      null  
      } */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleClose} className='mx-3' disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={submitImage} disabled={!file || loading} className='px-2'>
            {loading ?
            'Updating...'
          :
          'Update'  
          }
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default DpModal