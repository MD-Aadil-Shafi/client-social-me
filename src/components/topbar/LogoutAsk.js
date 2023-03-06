import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { userLogoutAction } from '../../redux/actions/authAction';

export default function AlertDialog({showLogoutAlert, setShowLogoutAlert}) {

  const handleClose = () => {
    setShowLogoutAlert(false);
  };
  const handleLogout = async()=>{
    userLogoutAction()
  }
  
  return (
      <Dialog
        open={showLogoutAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to logout ?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  );
}