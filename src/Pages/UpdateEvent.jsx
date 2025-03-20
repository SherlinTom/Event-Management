import React, { useEffect, useState } from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateEvent } from '../Redux/eventSlice';
import { toast } from 'react-toastify';
const UpdateEvent = () => {
    
    const { Formik } = formik;
    const {id} = useParams();
    const [event,setEvent] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.users.loggedUser?.token);
    useEffect(() => {
        if (!token) return;
        const fetchEvent = async () => {
            try {
              const { data } = await axios.get(
                `http://localhost:4006/api/v1/user/event-details/${id}`,
                { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
              );
              
              if (data.success) {
                setEvent(data.details);
              }
              
            } catch (error) {
              console.log(error.response?.data?.message || error.message);
            }
          };
        fetchEvent();
      }, [token]);

      const handleUpdate = async (values) =>{
        try {
            const {data} = await axios.put(`http://localhost:4006/api/v1/user/update-event/${id}`,values,{withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}` // Ensure it's prefixed with "Bearer"
                },});
            if(data.success){
                toast.success(data.message);
                dispatch(updateEvent(data.events));
                navigate('/my-events');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
      }
      const formatDateTimeForInput = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
    
        // Format as YYYY-MM-DDTHH:MM
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
    
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    


     const schema = yup.object().shape({
           event_name: yup.string(),
           description: yup.string(),
           event_date: yup.date(),
           location: yup.string(),
           category: yup.string(),
           status: yup.string()
          });
  return (
    <Container className='my-5'>
    <Row>
        <Col className='mx-auto' md={8}>
         <Card>
            <Card.Body>
            <Card.Title className='text-center py-2'><h2>Update Event</h2></Card.Title>
            {
                event && (
                    <Formik
                    validationSchema={schema}
                    onSubmit={handleUpdate}
                    initialValues={{
                        event_name: event.event_name || '',
                        event_date: formatDateTimeForInput(event?.event_date) || '',
                        location: event.location || '',
                        description: event.description || '',
                        category: event.category || '',
                        status: event.status || ''
                    }}
                    >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" className="position-relative">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter Event Name"
                                name="event_name"
                                value={values.event_name}
                                onChange={handleChange}
                                isInvalid={!!errors.event_name}
                            />
        
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.event_name}
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="position-relative">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter Location of the Event"
                                name="location"
                                value={values.location}
                                onChange={handleChange}
                                isInvalid={!!errors.location}
                            />
        
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.location}
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" className="position-relative">
                                <Form.Label> Date</Form.Label>
                                <Form.Control
                                type="datetime-local"
                                placeholder="Enter Event Date and Time"
                                name="event_date"
                                value={values.event_date}
                                onChange={handleChange}
                                isInvalid={!!errors.event_date}
                            />
        
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.event_date}
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" className="position-relative">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter Category of the Event"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                isInvalid={!!errors.category}
                            />
        
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.category}
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" className="position-relative">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select" // Change the input to a select dropdown
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    isValid={touched.status && !errors.status}
                                    isInvalid={!!errors.status}
                                    >
                                    <option value="">Select Event Status</option> 
                                    <option value="upcoming">Upcoming</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                    </Form.Control>
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.status}
                            </Form.Control.Feedback>
                            </Form.Group>
                            </Row>
                            <Row className="mb-3">
                            <Form.Group as={Col} md="12" className="position-relative">
                                <Form.Label>Event Details</Form.Label>
                                <Form.Control
                                as="textarea"
                                name="description"
                                rows={3}
                                placeholder="Enter details of the event"
                                value={values.description}
                                onChange={handleChange}
                                isValid={touched.description && !errors.description}
                                isInvalid={!!errors.description}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>
                            </Row>
                        
                            <div className=" text-center">
                            <Button type="submit" >Update</Button>
                            </div>
                            </Form>
                    )}
                    </Formik>

                )
            }
            </Card.Body>
         </Card>
        </Col>
    </Row>
</Container>
  )
}

export default UpdateEvent