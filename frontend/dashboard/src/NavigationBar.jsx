import React, {useState, useEffect} from 'react';
import {Container, Navbar, Nav, Image, NavDropdown} from 'react-bootstrap';
import './NavigationBar.css';
import {Link} from "react-router-dom";

function NavigationBar({studentInfo}) {
    const imgUrl = "frontend/dashboard/build/studentDash.png";
    const imgUrl2 = "frontend/dashboard/build/sapir-logo.jpg";


    const [dropdownOpen, setDropdownOpen] = useState({
        studentDetails: false,
        department: false,
        specialization: false,
        studyYear: false,
        gradesAverage: false,
    });

    useEffect(() => {
        const handleMouseEnter = (dropdown) => {
            setDropdownOpen((prevState) => ({
                ...prevState,
                [dropdown]: true,
            }));
        };

        const handleMouseLeave = (dropdown) => {
            setDropdownOpen((prevState) => ({
                ...prevState,
                [dropdown]: false,
            }));
        };

        const dropdowns = document.querySelectorAll('.hover-dropdown');

        dropdowns.forEach((dropdown) => {
            const title = dropdown.dataset.title;
            dropdown.addEventListener('mouseenter', () => handleMouseEnter(title));
            dropdown.addEventListener('mouseleave', () => handleMouseLeave(title));
        });

        return () => {
            dropdowns.forEach((dropdown) => {
                const title = dropdown.dataset.title;
                dropdown.removeEventListener('mouseenter', () => handleMouseEnter(title));
                dropdown.removeEventListener('mouseleave', () => handleMouseLeave(title));
            });
        };
    }, []);

    function getAcadmicYear() {
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
        return undefined;
    }

    return (
        <Navbar expand="lg" className="student-dashboard-navbar" variant="light" dir="rtl">
            <Container fluid className="navbarContainer">
                <Navbar.Brand href="#" className="navbar-brand">
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
                        <NavDropdown
                            className="hover-dropdown"
                            title="פרטי הסטודנט"
                            id="student-details-dropdown"
                            data-title="studentDetails"
                            show={dropdownOpen.studentDetails}
                        >
                            <NavDropdown.Item>{studentInfo.firstname} {studentInfo.lastname}</NavDropdown.Item>
                            <NavDropdown.Item>{studentInfo.studentID}</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            className="hover-dropdown"
                            title="מחלקה"
                            id="department-dropdown"
                            data-title="department"
                            show={dropdownOpen.department}
                        >
                            <NavDropdown.Item>{studentInfo.department}</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            className="hover-dropdown"
                            title="מגמה"
                            id="specialization-dropdown"
                            data-title="specialization"
                            show={dropdownOpen.specialization}
                        >
                            <NavDropdown.Item>{studentInfo.major || null}</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            className="hover-dropdown"
                            title="שנת לימוד"
                            id="study-year-dropdown"
                            data-title="studyYear"
                            show={dropdownOpen.studyYear}
                        >
                            <NavDropdown.Item>{getAcadmicYear()}</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            className="hover-dropdown"
                            title="ממוצע ציונים"
                            id="grades-origin-dropdown"
                            data-title="gradesAverage"
                            show={dropdownOpen.gradesAverage}
                        >
                            <NavDropdown.Item>{studentInfo.gradesAverage}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <a href="https://www.sapir.ac.il/">
                    <Image src={imgUrl2} className="logo-image2" alt="College Logo" width={100}/>
                </a>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
