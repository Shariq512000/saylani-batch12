import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router'

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
            <Link to={"/"} style={{color: "#fff", paddingLeft: 20, textDecoration: "none"}}>Home</Link>
            <Link to={"/about"} style={{color: "#fff", paddingLeft: 20, textDecoration: "none"}}>About</Link>
            <Link to={"/contact"} style={{color: "#fff", paddingLeft: 20, textDecoration: "none"}}>Contact</Link>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar