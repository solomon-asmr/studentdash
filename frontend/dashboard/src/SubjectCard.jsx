import React from 'react';
import {Card, Row, Col, Container, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import './StudentCard.css';// Continue to use your custom styles for specific stylings not covered by Bootstrap
function SubjectCard({studentInfo}) {
    const courses = studentInfo.courses;

    function getDaysDifference(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        return Math.round(Math.abs((date1 - date2) / oneDay));
    }

    return (

        <Container fluid style={{
            padding: '20px',
            maxWidth: '1200px',
        }}>
            <NavigationBar studentInfo={studentInfo}/>
            <Row xs={1} md={2} className="g-4">
                {courses.map((course, idx) => (
                    <Col key={idx}>
                        <Card style={{border: '1px solid transparent', borderRadius: 20}}>
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <Link to={`/details/${course.id}`}>
                                    <Image src="frontend/dashboard/build/expand_content.svg" alt="expand content" width="30"/>
                                </Link>
                                <h2>{course.fullname}</h2>
                                <a href={course.url}><Image className="keyboard_backspace"
                                                            src="frontend/dashboard/build//keyboard_backspace.png" alt=""
                                                            width={50} height={30}/></a>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col className="d-flex justify-content-between card-column">
                                        <h3>{course.tasks.length}</h3>
                                        <span>משימות ממתינות</span>
                                    </Col>
                                    <Col className="d-flex justify-content-between card-column">
                                        {/* todo */}
                                        <h2>{Math.floor(Math.random() * 7 + 1)}</h2>
                                        <span>הקלטות טרם נצפו</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-between card-column">
                                        <h2>{getDaysDifference(new Date(course.events[0].timestart), new Date())}</h2>
                                        <span>ימים למועד א</span>
                                    </Col>
                                    <Col className="d-flex justify-content-between card-column">
                                        <div>
                                            <span>מרצה: </span>
                                            <Image src="frontend/dashboard/build/contact_mail.png" alt=""/>
                                        </div>
                                        <div>
                                            <span>{course.lecturer || ' ד"ר יועש חסידים '}</span>
                                            <span>{course.lectureremail || 'yoash@sapir.edu.co.il'} </span>
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
