import React from 'react'
import './topbar.scss'
import { Search, Person, Chat, NotificationAdd, SearchOutlined, Message, Notifications, Logout, AccountBox } from '@mui/icons-material'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Badge, Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch} from 'react-redux';
import { ToastContainer, toast} from 'react-toastify';
import { userLogoutAction } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((store) => store.user)
  const navigate = useNavigate()

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
    let confirm = window.confirm('Are you sure you want to log out')
    if(!confirm) return;
    userLogoutAction()
  }

  return (
    <Navbar className='shadow-sm topbar sticky-top' expand="lg">
      <Container fluid>
        <Navbar.Brand href="#" className='mx-4' onClick={()=>navigate('/')}>Social Me</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Form className="d-flex search-bar mx-5 shadow-sm">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-field"
              aria-label="Search"
            />
            <Button variant="outline-dark search-btn shadow-sm"><SearchOutlined/></Button>
          </Form>
            <Nav.Link href="#action1">Homepage</Nav.Link>
            <Nav.Link href="#action2">Timeline</Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            <Badge badgeContent={4} color="secondary" className='mt-3 mx-3'>
  <Person color="action" />
</Badge>
            <Badge badgeContent={4} color="secondary" className='mt-3 mx-3'>
  <Message color="action" />
</Badge>
            <Badge badgeContent={4} color="secondary" className='mt-3 mx-3'>
  <Notifications color="action" />
</Badge>

{/* <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2016/07/10/21/47/cat-1508613_960_720.jpg" className='mx-5' /> */}
<div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='avatar-btn'
      >
        <Avatar alt="Remy Sharp" src={user?.profilePicture ? user?.profilePicture : "https://cdn.pixabay.com/photo/2016/07/10/21/47/cat-1508613_960_720.jpg"} className='mx-5' />
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
          </Nav>

          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Topbar