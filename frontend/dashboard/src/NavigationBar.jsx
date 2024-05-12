import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './NavigationBar.css';

function NavigationBar() {
    const imgUrl = "/studentDash.png";
    const imgUrl2 = "/sapir-logo.jpg";

    return (
        <Navbar expand="lg" className="student-dashboard-navbar" variant="light" dir="rtl">
            <Container fluid>
                <Navbar.Brand href="#" className="navbar-brand">
                    <img src={imgUrl} alt="Logo" width={200} className="logo-image"/>
                    <Navbar.Text className="specialButton">
                        הי הלן, ברוך שובך!
                    </Navbar.Text>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="student-nav-items">
                        <NavDropdown title="פרטי הסטודנט" id="student-details-dropdown">
                            <NavDropdown.Item>הלן שוסטר</NavDropdown.Item>
                            <NavDropdown.Item>222222223</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="מחלקה" id="department-dropdown">
                            <NavDropdown.Item>ניהול תעשייתי</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="מגמה" id="specialization-dropdown">
                            <NavDropdown.Item>מערכות מידע</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="שנת לימוד" id="study-year-dropdown">
                            <NavDropdown.Item>ג</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="ממוצא ציונים" id="grades-origin-dropdown">
                            <NavDropdown.Item>99</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <img src={imgUrl2} className="logo-image2" alt="College Logo" width={100}/>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;