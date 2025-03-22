import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Events = () => {
    const [event,setEvent] = useState([]);
    const navigate = useNavigate((state) => state.users.loggedUser?.token);
    useEffect(() => {
      const fetchEvent = async () => {
          try {
              const { data } = await axios.get(
                  `http://localhost:4006/api/v1/user/all-events`,
                  { withCredentials: true ,  headers: {
                    'Content-Type': 'application/json'
                }}
              );
              
              console.log("Fetched Events:", data); // Corrected logging
              setEvent(data.events);
              
          } catch (error) {
              console.error("Error fetching events:", error.response ? error.response.data.message : error.message);
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
                        <div style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'cover' }}>
                        
                          <Card.Img 
                              src={`http://localhost:4006/${events.photo?.replace(/\\/g, '/')}`} 
                              variant='top' 
                              alt="Event Image" 
                              onError={(e) => e.target.src = 'http://localhost:4006/uploads/default.jpg'}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />

                         
                          {events.status && (
                              <div 
                                  style={{
                                      position: 'absolute',
                                      top: '10px',
                                      left: '10px',
                                      backgroundColor: 
                                          events.status === "upcoming" ? "green" :
                                          events.status === "cancelled" ? "red" :
                                          events.status === "completed" ? "orange" :
                                          "gray",
                                      color: 'white',
                                      padding: '5px 10px',
                                      borderRadius: '5px',
                                      fontSize: '14px',
                                      fontWeight: 'bold',
                                      zIndex: 1  // Ensure it appears above the image
                                  }}
                              >
                                  {events.status}
                              </div>
                          )}
                      </div>

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