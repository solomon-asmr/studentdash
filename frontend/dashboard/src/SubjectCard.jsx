// SubjectCard.jsx
import React from 'react';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import './StudentCard.css';

function SubjectCard() {
    return (
        <Container fluid className="student-dashboard-container" style={{ padding: '20px', maxWidth: '1200px' }}>
            <NavigationBar/>
            <Row xs={1} md={2} className="g-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <Col key={idx}>
                        <Card className="subject-card">
                            <Card.Header className="d-flex justify-content-between align-items-center card-header">
                                <Link to="/details">
                                    <Image src="/expand_content.svg" alt="expand content" width="30"/>
                                </Link>
                                <h2>תכנות מונחה עצמית בפיתון</h2>
                                <Image className='keyboard_backspace' src="/keyboard_backspace.png" alt="" width={50} height={30}/>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col className="d-flex justify-content-between card-column">
                                        <h3>3</h3>
                                        <span>משימות ממתינות</span>
                                    </Col>
                                    <Col className="d-flex justify-content-between card-column">
                                        <h2>2</h2>
                                        <span>הקלתות טרם נצפו</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-between card-column">
                                        <h2>52</h2>
                                        <span>ימים למועד א</span>
                                    </Col>
                                    <Col className="d-flex justify-content-between card-column">
                                        <div>
                                            <span>מרצה</span>
                                            <Image src="/contact_mail.png" alt=""/>
                                        </div>
                                        <div>
                                            <span>ד"ר יעוש חסידים</span>
                                            <span>Yoash@sapir.edu.co.il</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default SubjectCard;
