import React from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
   <Navbar expand="lg" className="bg-info shadow-sm"  >
      <Container>
        <Navbar.Brand as={Link} to="/"><Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvstFUiEjeQA26SLFq-7R7k43qmuSDknEkQ&s" height={100} ></Image></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header