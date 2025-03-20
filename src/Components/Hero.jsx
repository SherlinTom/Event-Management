import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
const Hero = () => {

  return (
     <Container >
      <Row>
        <Col>
        <Row className='py-5'>
          <Col md={5}>
          <h1>Effortless Event Management at Your Fingertips</h1>
            <p>
            Our Event Management Website simplifies the process of organizing and attending events. From seamless event creation and secure registrations to real-time updates and analytics, our platform ensures a smooth and efficient experience. Whether you're hosting a corporate seminar, a wedding, or a music festival, our website empowers you to manage every detail with ease.
            </p>
          </Col>
          <Col md={7}>
          <Image src='https://img.freepik.com/premium-vector/event-management-wedding-planner-manager-planning-event-conference-party_501813-2157.jpg' className='w-100'/>
          </Col>
        </Row>
        </Col>
      </Row>
      </Container>
  )}
   
export default Hero;