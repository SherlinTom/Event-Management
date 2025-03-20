import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { deleteEvent } from '../Redux/eventSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin2Fill, RiPencilFill } from 'react-icons/ri';

const MyEvents = () => {
    const [event,setEvent] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.users.loggedUser?.token);
 
    useEffect(() => {
        if (!token) return;
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4006/api/v1/user/my-events`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvent(data.events);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, [token]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                const { data } = await axios.delete(`http://localhost:4006/api/v1/user/delete-event/${id}`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` }   // ✅ Added Authorization header
                });

                if (data.success) {
                    dispatch(deleteEvent({ id }));
                    setEvent((prevEvents) => prevEvents.filter((event) => event._id !== id));
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
    <Container>
        <Row>
            <Col>
            <div className='d-flex justify-content-end my-3'><Button className='btn-info' onClick={()=>navigate('/add-event')}>Add Event</Button></div>
            <h2 className='text-center pb-3'>My Events</h2>
            <Table bordered hover style={{ boxShadow: "3px 5px 7px rgba(0, 0, 0, 1.5)",borderRadius: "10px",overflow:"hidden"}} >
            <thead>
                <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
            event.length > 0 ? (event && event.map((item,i)=>(
                <tr key={i}>
                <td>{i+1}</td>
                <td>{item.event_name}</td>
                <td>{new Date(item.event_date).toLocaleString("en-GB", { 
                        day: "2-digit", 
                        month: "2-digit", 
                        year: "numeric", 
                        hour: "2-digit", 
                        minute: "2-digit", 
                        second: "2-digit", 
                        hour12: true 
                    }).replace(",", "")}</td>
                <td>{item.location}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>
                <Link className='px-4' to={`/update-event/${item._id}`}  title='Edit'><RiPencilFill style={{color:'green'}}/></Link> 
                <RiDeleteBin2Fill  title='Delete' style={{color:'red',cursor:'pointer'}} onClick={()=>handleDelete(item._id)}/> 
                </td>
                </tr>
                ))):( <tr className='text-center' >
                <td colSpan={7}>No Events..!</td>
                </tr> )}
                
            </tbody>
            
            </Table>
            </Col>
        </Row>
    </Container>
  )
}

export default MyEvents