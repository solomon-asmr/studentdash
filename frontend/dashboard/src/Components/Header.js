import React from 'react';
import applogo from '../public/logo192.png'; // relative path to image
import {Container, Navbar, Nav, Row, Col, Image} from 'react-bootstrap';

const Header = ({studentInfo}) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Image src={applogo} height="30" alt="App Logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>Welcome, {studentInfo.firstname || 'DEFAULT'}!</Nav.Link>
                    </Nav>
                    <Row className="align-items-center">
                        <Col sm={8}>
                            <Nav>
                                <Nav.Link>Student Details</Nav.Link>
                            </Nav>
                        </Col>
                        <Col sm={4} className="d-none d-sm-block">
                            <Image src={applogo} height="30" alt="Institution Logo"/>
                        </Col>
                    </Row>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
