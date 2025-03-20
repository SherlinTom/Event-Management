import axios from 'axios';
import React from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutUser } from '../../Redux/userSlice';

const AdminHeader = () => {
  const users = JSON.parse(localStorage.getItem('loggedUser'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.users.loggedUser?.token);
    
    const handleLogout = async() =>{
      try {
      const {data} = await axios.post('http://localhost:4006/api/v1/user/logout',{},{withCredentials: true,headers: {Authorization: `Bearer ${token}`}});
      if(data.success){
        toast.success(data.message);
        dispatch(logoutUser());
        navigate('/login');
      }
       else{
        toast.error(data.message);
       } 
      } catch (error) {
        toast.error(error.message);
      }
    }
  return (
    <Navbar expand="lg" className="bg-info shadow-sm"  >
         <Container>
           <Navbar.Brand as={Link} to="/"><Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvstFUiEjeQA26SLFq-7R7k43qmuSDknEkQ&s" height={100} ></Image></Navbar.Brand>
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id="basic-navbar-nav">
             <Nav className="ms-auto">
               <Nav.Link as={Link} to="/">Home</Nav.Link>
               <Nav.Link as={Link} to="/users">Users</Nav.Link>
               {
             users? ( <Nav.Link as={Link}  onClick={()=>handleLogout(users)}>Logout</Nav.Link>):( <Nav.Link as={Link} to='/login'>Login</Nav.Link>)
            }
            
             </Nav>
           </Navbar.Collapse>
         </Container>
       </Navbar>
  )
}

export default AdminHeader