// CourseDetails.jsx
import React from 'react';
import { Container, Row, Col, Table, Image } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import { Link } from 'react-router-dom';
import './CourseDetails.css';

function CourseDetails() {
    return (
        <Container fluid className="student-dashboard-container">
            <NavigationBar/>
            <Container fluid className="course-details-content p-3">
                {/* Navbar-like header with images and title */}
                <Row className="d-flex justify-content-between">
                    <Col>
                        <Link to="/back">
                            <Image src="/collapse_content.png" alt="collapse content"/>
                        </Link>
                    </Col>
                    <Col>
                        <h3>תכנות מונחה עצמית בפיתון</h3>
                    </Col>
                    <Col>
                        <Image className='keyboard_backspace' src="/keyboard_backspace.png" width="50" height="30" alt="nothing"/>
                    </Col>
                </Row>

                {/* Lecture times table */}
                <Row>
                    <Col>
                        <Table responsive="sm" className="lecture-time">
                            <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>יום בשבוע</th>
                                <th>שעות</th>
                                <th>הרצאות שהועברו</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>הרצאות</td>
                                <td>ד"ר חסידים יואש</td>
                                <td>יום חמישי</td>
                                <td>10:15 - 13:30</td>
                                <td>6/12</td>
                            </tr>
                            <tr>
                                <td>תרגול</td>
                                <td>מר דדון שלום</td>
                                <td>יום חמישי</td>
                                <td>08:30 - 10:00</td>
                                <td>5/12</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Subject detail table */}
                <Row className="subject-detail">
                    <Col>
                        <Table responsive="sm">
                            <thead>
                            <tr>
                                <th>מס"ד</th>
                                <th>סוג המטלה</th>
                                <th>שם המטלה</th>
                                <th>מועד אחרון</th>
                                <th>מועד בפועל</th>
                                <th>סטטוס</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>תיבת הגשה</td>
                                <td>מטלת הגשה ראשונה</td>
                                <td>28/01/24</td>
                                <td>16/01/24</td>
                                <td>הושלמה</td>
                                <td><Image src="/library_books.svg" alt=""/></td>
                                <td><Image src="/developer_guide.svg" alt=""/></td>
                                <td><Image src="/calendar_clock.svg" alt=""/></td>
                                <td><Image src="/bid_landscape.svg" alt=""/></td>
                            </tr>
                            </tbody>
                        </Table>
                        <div className="add-activity">
                            <span><Link to="/ToDo"> &#65291; הוספת משימה אישית</Link></span>
                        </div>
                    </Col>
                </Row>

                {/* Example for a responsive dual-column layout for extra details */}
                <Row className="mb-3">
                    <Col className="responsive-table-col" md={6} sm={12}>
                        {/* Exam details table */}
                        <Table responsive="sm" className="examZoom-records">
                            <thead>
                            <tr>
                                <th>מס"ד</th>
                                <th>סוג מבחן</th>
                                <th>מועד מבחן</th>
                                <th>שעות מבחן</th>
                                <th>משך</th>
                                <th>מיקום</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>מבחן אמצע</td>
                                <td>22/02/24</td>
                                <td>09:00 - 11:00</td>
                                <td>2 שעות</td>
                                <td>מקוון</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>מבחן אמצע</td>
                                <td>12/04/24</td>
                                <td>09:00 - 12:00</td>
                                <td>3 שעות</td>
                                <td>טרם נקבע</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>מבחן אמצע</td>
                                <td>01/05/24</td>
                                <td>12:00 - 15:00</td>
                                <td>3 שעות</td>
                                <td>טרם נקבע</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col className="responsive-table-col" md={6} sm={12}>
                        {/* Zoom details table */}
                        <Table responsive="sm" className="examZoom-records">
                            <thead>
                            <tr>
                                <th>מס"ד</th>
                                <th>סוג הקלטה</th>
                                <th>שם הקלטה</th>
                                <th>מועד הקלטה</th>
                                <th>סטטוס</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>שיעור</td>
                                <td>שיעור 1 הקלטה</td>
                                <td>28/01/24</td>
                                <td>נצפה</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>תרגול</td>
                                <td>תרגול 1 הקלטה</td>
                                <td>04/02/24</td>
                                <td>נצפה</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>שיעור</td>
                                <td>שיעור 2 הקלטה</td>
                                <td>04/02/24</td>
                                <td>נצפה</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>תרגול</td>
                                <td>תרגול 2 הקלטה</td>
                                <td>11/02/24</td>
                                <td>נצפה</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>שיעור</td>
                                <td>שיעור4 הקלטה</td>
                                <td>18/02/24</td>
                                <td>טרם נצפה</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default CourseDetails;
