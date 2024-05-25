import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const MyNavbar = () => {

    return(
        <Navbar expand="lg" className="navbar navbar-dark bg-dark">
            <Container>
                <Navbar.Brand href="#home" style={{
                    color: '#047fee',
                    fontSize: '2rem',
                    fontFamily:'cursive'
                }}>Data Extraction</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home" style={{fontSize: '1.5rem'}}>Home</Nav.Link>
                    <Nav.Link href="#link" style={{fontSize: '1.5rem'}}>Read data</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar;
