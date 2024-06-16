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
                return 'א\'';
            case '2':
                return 'ב\'';
            case '3':
                return 'ג\'';
            case '4':
                return 'ד\'';
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
                            <strong>פרטי הסטודנט</strong>
                            <div>
                                {studentInfo.firstname} {studentInfo.lastname}
                            </div>
                            <div>
                                {studentInfo.studentID}
                            </div>
                        </Nav.Link>
                        <Nav.Link className="nav-link studentdash">
                            <strong>מחלקה</strong>
                            <span>{studentInfo.department}</span>
                        </Nav.Link>
                        <Nav.Link className="nav-link studentdash">
                            <strong>מגמה</strong>
                            <span>{studentInfo.major || null}</span>
                        </Nav.Link>
                        <Nav.Link className="nav-link studentdash">
                            <strong>שנת לימוד</strong>
                            <span>{getAcademicYear()}</span>
                        </Nav.Link>
                        <Nav.Link className="nav-link studentdash">
                            <strong>ממוצע ציונים</strong>
                            <span>{studentInfo.gradesAverage}</span>
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
