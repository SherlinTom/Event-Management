import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EventDetails = () => {
    const {id} = useParams();
    const [event,setEvent] = useState(null);
    const token = useSelector((state) => state.users.loggedUser?.token);

    useEffect(() => {
        if (!id) return;  // Prevent API call if no ID

        const fetchEvent = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:4006/api/v1/user/event-details/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (data.success) {
                    setEvent(data.details);
                } else {
                    toast.error(data.message || "Failed to fetch event details");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error fetching event details");
            }
        };

        fetchEvent();
    }, [id, token]);
  return (
    <Container >
    <Row className='m-5 justify-content-center'>
        <Col md={8}>
            <h3 className='text-center'>Event Details</h3>
            <Card >
            {event ? (
                <Row className='p-5'>
                    <Col>
                        <h5> <b>{event.event_name}</b></h5>
                        <p><b>Location : </b> {event.location}</p>
                        <p><b>Date : </b>  {new Date(event.event_date).toLocaleString("en-GB", { 
                                day: "2-digit", 
                                month: "short", 
                                year: "numeric",
                                hour: "2-digit", 
                                minute: "2-digit", 
                                second: "2-digit", 
                                hour12: true 
                            }).replace(",", "")}</p>
                        <p><b>Category : </b> {event.category}</p>
                        <p><b>Status : </b> {event.status}</p>
                        <p><b>Event Description:</b> {event.description}</p>
                       
                    </Col>
                </Row>
                    ) : (
                        <p>Loading...</p>
                    )}
            </Card>
        </Col>
    </Row>
</Container>
  )
}

export default EventDetails