import React from 'react';
import {Container, Navbar, Nav, Image} from 'react-bootstrap';
import './NavigationBar.css';
import {Link} from "react-router-dom";

function NavigationBar({studentInfo}) {
    const imgUrl = "frontend/dashboard/build/studentDash.png";
    const imgUrl2 = "frontend/dashboard/build/sapir-logo.jpg";

    function getAcademicYear() {
        switch (studentInfo.academic_year) {
            case '1':
                return 'א';
            case '2':
                return 'ב';
            case '3':
                return 'ג';
            case '4':
                return 'ד';
            default:
                return studentInfo.academic_year;
        }
    }

    return (
        <Navbar expand="lg" className="student-dashboard-navbar" variant="light" dir="rtl">
            <Container fluid className="navbarContainer">
                <Navbar.Brand href="#" className="navbar-brand studentdash">
                    <Link to="/">
                        <Image src={imgUrl} alt="Logo" width={200} className="logo-image"/>
                    </Link>
                    <Navbar.Text className="specialButton">
                        הי {studentInfo.firstname}, ברוך שובך!
                    </Navbar.Text>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="student-nav-items">
                        <Nav.Link className="nav-link studentdash">
                            <div>פרטי הסטודנט:</div>
                            <div>
                                <Navbar.Text>{studentInfo.firstname} {studentInfo.lastname}</Navbar.Text>
                            </div>
                            <div>
                                <Navbar.Text>{studentInfo.studentID}</Navbar.Text>
                            </div>
                        </Nav.Link>
                        <Nav.Link className="nav-link studentdash">
                            <div>מחלקה:</div>
                            <Navbar.Text>{studentInfo.department}</Navbar.Text>
                        </Nav.Link>
                        <Nav.Link className="nav-link studentdash">
                            <div>מגמה:</div>
                            <Navbar.Text>{studentInfo.major || null}</Navbar.Text>
                        </Nav.Link>
                        <Nav.Link className="nav-link studentdash">
                            <div>שנת לימוד:</div>
                            <Navbar.Text>{getAcademicYear()}</Navbar.Text>
                        </Nav.Link>
                        <Nav.Link className="nav-link studentdash">
                            <div>ממוצע ציונים:</div>
                            <Navbar.Text>{studentInfo.gradesAverage}</Navbar.Text>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Link to="https://www.sapir.ac.il/">
                    <Image src={imgUrl2} className="logo-image2" alt="College Logo" width={100}/>
                </Link>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
