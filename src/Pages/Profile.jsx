import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profile,setProfile] = useState(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.users.loggedUser?.token); 
    useEffect(()=>{
        if(!token) return;
        const fetchUser = async ()=>{
        try {
            const {data} = await axios.get(`http://localhost:4006/api/v1/user/user-profile`,{withCredentials: true,headers: {Authorization:`Bearer ${token}`}});
         
            if(data.success){
                setProfile(data.user_details);
            } 
        } catch (error) {
            console.log(error.message);
        }
        }
        fetchUser();
    },[token]);
  return (
   <Container className='my-5'>
    <Row>
        <Col className='mx-auto' md = {6}>
        {profile &&(
        <Card>
        <h3 className='text-center py-3'>Profile</h3>
        <Card.Body>
            <Row  className='p-5'>
                <Col md={4} >
                <h5>Name: </h5> 
                </Col>
                <Col md={8}>
                {profile.name}
                </Col>
                <Col md={4}>
                <h5>Email: </h5> 
                </Col>
                <Col md={8}>
                {profile.email}
                </Col>
                <Col md={4}>
                <h5>Contact No: </h5> 
                </Col>
                <Col md={8}>
                {profile.contact_no}
                </Col>
            </Row>
            <Button className='my-3' onClick={()=>navigate('/update-profile')}>Update Profile</Button>
        </Card.Body>
        </Card>
        )}
    
        </Col>
    </Row>
   </Container>
  )
}

export default Profile