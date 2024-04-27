import React from 'react';
import {Table, Container, Row, Col} from 'react-bootstrap';
import './Header.css'; // Import the CSS file

const Header = ({studentInfo}) => {
    return (
        <Container className="header-container">
            <Row className="align-items-center">
                {/* Div 1: StudentDash brand with logo */}
                <Col className="text-center brand-col">
                    <div className="brand-container">
                        <img src="/local/studentdash/frontend/dashboard/src/logo.svg" alt="logo" className="brand-logo"/>
                        <strong>StudentDash</strong>
                    </div>
                </Col>
                {/* Div 2: Welcome message */}
                <Col className="welcome-col">
                    <div className="welcome-message">
                        Hi {studentInfo.firstname}, Welcome back!
                    </div>
                </Col>
                {/* Div 3: Student details table */}
                <Col className="table-col">
                    <div className="student-details-container">
                        <Table className="student-details-table">
                            <thead>
                            <tr>
                                <th>Details</th>
                                <th>Department</th>
                                <th>Section</th>
                                <th>Year</th>
                                <th>Average</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{studentInfo.firstname} {studentInfo.lastname}</td>
                                <td>{studentInfo.department || 'undefined'}</td>
                                <td>{studentInfo.section || 'undefined'}</td>
                                <td>{studentInfo.year || 'undefined'}</td>
                                <td>{studentInfo.average || 'undefined'}</td>
                            </tr>
                            <tr>
                                <td>{studentInfo.studentID}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
                {/* Div 4: Institution logo div */}
                <Col className="text-center logo-col">
                    <div className="logo-container">
                        <img src="/local/studentdash/frontend/dashboard/src/logo.svg" alt="logo"
                             className="logo-image"/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;