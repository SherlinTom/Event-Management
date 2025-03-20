import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RiDeleteBin2Line } from 'react-icons/ri'
import axios from 'axios'

const UserList = () => {
    const [users,setUsers] = useState('');
        const token = useSelector((state) => state.users.loggedUser?.token);
    
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const {data} = await axios.get(`http://localhost:4006/api/v1/admin/all-users`,{withCredentials:true,
            headers: { Authorization: `Bearer ${token}` }});
          setUsers(data.user);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };
      fetchUsers();
    }, []);

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
          try {
              const { data } = await axios.delete(`http://localhost:4006/api/v1/admin/delete-user/${id}`, {
                  withCredentials: true,
                  headers: { Authorization: `Bearer ${token}` } 
              });

              if (data.success) {
                  setUsers((preUser) => preUser.filter((user) => user._id !== id));
                  toast.success(data.message);
              } else {
                  toast.error(data.message);
              }
          } catch (error) {
              console.error("Error deleting event:", error.message);
          }
      }
  };
  return (
    <Container fluid>
    <Row>
        <Col md={12} className='my-5'>
        <h3 className='text-center pb-2'>Users</h3>
        <Table bordered >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact No</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
       users && users.map((item,i)=>(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.contact_no}</td>
          <td> 
          <RiDeleteBin2Line title='Delete' style={{color:'red'}} size={20} onClick={()=>handleDelete(item._id)}/> 
          </td>
        </tr>
        ))}
        
      </tbody>
     
    </Table>
        </Col>
            </Row>
        </Container>
   
  )
}

export default UserList