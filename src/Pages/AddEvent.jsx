import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addEvent } from '../Redux/eventSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const AddEvent = () => {
    const { Formik } = formik;
    const token = useSelector((state) => state.users.loggedUser?.token);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (values,{resetForm}) => {
        try {
            if (!token) {
                toast.error("User not authenticated");
                return;
            }
           
            const { data } = await axios.post(
                'http://localhost:4006/api/v1/user/add-event',
                values,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            console.log(data);
            
            if (data.success) {
                dispatch(addEvent(data.newEvent));
                toast.success(data.message);
                navigate('/my-events');
                resetForm();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        }
      };

    const schema = yup.object().shape({
       event_name: yup.string().required("Please enter Event Name"),
       description: yup.string().required("Please enter Event Details"),
       event_date: yup.date().required("Please select the event date"),
       location: yup.string().required("Please enter Location"),
       category: yup.string().required("Please enter category of the event"),
       status: yup.string().required("Please select event status")
      });
  return (
    <Container className='my-5'>
        <Row>
            <Col className='mx-auto' md={8}>
             <Card>
                <Card.Body>
                <Card.Title className='text-center py-2'><h2>Add Event</h2></Card.Title>
                <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    event_name: '',
                    event_date: '',
                    location: '',
                    description: '',
                    category: '',
                    status: ''
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
                        <Button type="submit" >Submit</Button>
                        </div>
                        </Form>
                )}
                </Formik>
                </Card.Body>
             </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default AddEvent