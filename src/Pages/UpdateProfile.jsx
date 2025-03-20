import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../Redux/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.users.loggedUser?.token);
    const { Formik } = formik;

    const schema = yup.object().shape({
        name: yup.string(),
        contact_no: yup.string(),
        email: yup.string()
    });

    // Fetch user profile on component mount
    useEffect(() => {
        if (!token) return;

        const fetchUser = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:4006/api/v1/user/user-profile`,
                    { 
                        withCredentials: true, 
                        headers: { Authorization: `Bearer ${token}` } 
                    }
                );

                if (data.success) {
                    setUser(data.user_details);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch user details");
            }
        };

        fetchUser();
    }, [token]);

    // Handle profile update
    const handleProfileUpdate = async (values) => {
        try {
            const { data } = await axios.put(
                'http://localhost:4006/api/v1/user/update-profile', 
                values, 
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (data.success) {
                dispatch(updateProfile(data.user));
                toast.success(data.message);
                navigate('/my-profile');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

    return (
        <Container className='my-5'>
            <Row>
                <Col className='mx-auto' md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="py-3 text-center">
                                <h3>Update Profile</h3>
                            </Card.Title>

                            {user && (
                                <Formik
                                    validationSchema={schema}
                                    onSubmit={handleProfileUpdate}
                                    initialValues={{
                                        name: user.name || '',
                                        email: user.email || '',
                                        contact_no: user.contact_no || ''
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Row className="mb-3">
                                                {/* Name Field */}
                                                <Form.Group as={Col} md="12" className='mb-3 position-relative'>
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        placeholder='Enter Name'
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        isValid={touched.name && !errors.name}
                                                        isInvalid={!!errors.name}
                                                    />
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.name}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                {/* Contact No. Field */}
                                                <Form.Group as={Col} md="12" className="position-relative">
                                                    <Form.Label>Contact No.</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Contact Number"
                                                        name="contact_no"
                                                        value={values.contact_no}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.contact_no}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.contact_no}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                {/* Email Field */}
                                                <Form.Group className='pt-3' as={Col} md="12">
                                                    <Form.Label>Email</Form.Label>
                                                    <InputGroup hasValidation>
                                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Enter Email"
                                                            aria-describedby="inputGroupPrepend"
                                                            name="email"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.email}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.email}
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Row>

                                            {/* Submit Button */}
                                            <div className="py-3">
                                                <Button type="submit">Update</Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateProfile;
