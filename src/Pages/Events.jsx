import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Events = () => {
    const [event,setEvent] = useState([]);
    const navigate = useNavigate((state) => state.users.loggedUser?.token);
    useEffect(() => {
        const fetchEvent = async () => {
          try {
            const {data} = await axios.get(`http://localhost:4006/api/v1/user/all-events`,{withCredentials:true});
            console.log(data);
            setEvent(data.events);
          } catch (error) {
            console.error("Error fetching jobs:", error);
          }
        };
        fetchEvent();
      }, []);
      const handleEventDetails = (id) => {
        navigate(`/details/${id}`);
      };
  return (
    <Container fluid>
        <Row className="m-4">
        <h2 className='text-center py-3'><h2>Events</h2></h2>
            {
                event.length > 0 ? event.map((events)=>{
                    return(
                      
                        <Col key={events._id} className='d-flex' md={3}>
                            
                        <Card className="mb-3 shadow">
                          {(
                            events.status === "upcoming" ? <div className="badge bg-success text-white col-md-5 p-2 m-2" style={{fontSize:15}}>{events.status}</div> 
                             : events.status === "cancelled" ? <div className="badge bg-danger text-white col-md-5 p-2 m-2" style={{fontSize:15}}>{events.status}</div>
                             : events.status === "completed" ? <div className="badge bg-warning text-white col-md-5 p-2 m-2" style={{fontSize:15}}>{events.status}</div>
                             : null
                          )}
                        
                            <Card.Body onClick={() => handleEventDetails(events._id)}>
                            <Card.Title>{events.event_name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                            {new Date(events.event_date).toLocaleString("en-GB", { 
                                day: "2-digit", 
                                month: "short", 
                                year: "numeric",
                                hour: "2-digit", 
                                minute: "2-digit", 
                                second: "2-digit", 
                                hour12: true 
                            }).replace(",", "")}
                            </Card.Subtitle>
                            <Card.Text>{events.location}</Card.Text>
                            <Card.Text className='text-truncate'>{events.description}</Card.Text>
                            </Card.Body>
                         </Card>
                        </Col>

                    )
                }): (
                    <p className="text-center text-muted mt-3">No events.</p>
                  )}
            
        </Row>
    </Container>
  )
}

export default Events