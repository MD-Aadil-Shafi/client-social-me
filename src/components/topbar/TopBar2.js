import React,{useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './topbar.scss'
import Form from 'react-bootstrap/Form';
import { Search, Person, Chat, NotificationAdd, SearchOutlined, Message, Notifications, Logout, AccountBox, Close } from '@mui/icons-material'
import { Badge, Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useSelector, useDispatch} from 'react-redux';
import { ToastContainer, toast} from 'react-toastify';
// import { userLogoutAction } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import AlertDialog from './LogoutAsk';
import Notification from './notification/Notification';

const drawerWidth = 360;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  ///
  const dispatch = useDispatch();
  const {user} = useSelector((store) => store.user)
  const {notification, loading, error, message} = useSelector((store) => store.notifications)
  const navigate = useNavigate()

  //for notification
  const [showNotification, setShowNotification] = useState(false)
  //

  const [showLogoutAlert, setShowLogoutAlert] = useState(false)
  //for profile dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async()=>{
    // let ask = window.confirm('Are you sure you want to log out')
    // if(!ask) return;
    // userLogoutAction()
    setShowLogoutAlert(true)
  }

  ///

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
        <div className='d-flex justify-content-between align-items-center px-2'>
        <Typography variant="h6" sx={{ my: 2 }} onClick={()=>navigate('/')}>
        Social Me
      </Typography>
      <div>
        <button className='btn btn-sm shadow' onClick={handleDrawerToggle}><Close/></button>   
        </div>
        </div>
      
      <Divider />
      
      <List>
       
    <ListItem key={1} className='d-flex justify-content-center my-3'>
<Badge badgeContent={4} color="secondary" className='mt-3 mx-3'
onClick={()=>setShowNotification(true)}
>
  <Notifications color="action" />
</Badge>
</ListItem>
<ListItem key={2} className='d-flex justify-content-center my-3'>
<div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='avatar-btn'
      >
        <Avatar alt="Remy Sharp" src={user?.profilePicture ? user?.profilePicture : "/assets/blank.png"} className='mx-5' />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>navigate(`/profile/${user?.username}`)}><AccountBox/> My account</MenuItem>
        <MenuItem onClick={handleLogout}><Logout/> Logout</MenuItem>
      </Menu>
    </div>
</ListItem>
<ListItem key={3} className='d-flex justify-content-center my-3'>
<h3 className='fw-bold text-secondary'
onClick={()=>navigate(`/friends`)}
>My Friends</h3>
</ListItem>
<ListItem key={4} className='d-flex justify-content-center my-3'>
<h3 className='fw-bold text-secondary'
onClick={()=>navigate(`/chats`)}
>Chats</h3>
</ListItem>
<ListItem key={5} className='d-flex justify-content-center my-3'>
<h3 className='fw-bold text-secondary'
onClick={()=>navigate(`/add/friends`)}
>Add Friends</h3>
</ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav"  className='topbar bg-light text-dark'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <span
            onClick={()=>navigate('/')}
            style={{cursor:'pointer'}}
            >
            Social&nbsp;Me
            </span>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
<List sx={{ display: 'flex' }}>
{/* <ListItem key={1} disablePadding>
<Form className="d-flex search-bar mx-5 shadow-sm">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-field"
              aria-label="Search"
            />
            <Button variant="outline-dark search-btn shadow-sm"><SearchOutlined/></Button>
          </Form>
          //
          notification?.length ? notification?.length : 0
</ListItem> */}
<ListItem key={1} disablePadding>
<Badge badgeContent={notification ? notification?.length : 0} color="secondary" className='mt-3 mx-3'
onClick={()=>setShowNotification(true)}
>
  <Notifications color="action" />
</Badge>
</ListItem>
<ListItem key={2} disablePadding>
<div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='avatar-btn'
      >
        <Avatar alt="Remy Sharp" src={user?.profilePicture ? user?.profilePicture : "/assets/blank.png"} className='mx-5' />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>navigate(`/profile/${user?.username}`)}><AccountBox/> My account</MenuItem>
        <MenuItem onClick={handleLogout}><Logout/> Logout</MenuItem>
      </Menu>
    </div>
</ListItem>
</List>
      

            {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: '#000' }}>
                {item}
              </Button>
            ))} */}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <AlertDialog showLogoutAlert={showLogoutAlert} setShowLogoutAlert={setShowLogoutAlert}/>
    <Notification showNotification={showNotification} setShowNotification={setShowNotification}/>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;