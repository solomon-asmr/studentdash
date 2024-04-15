import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Header from './Header';
import CourseCard from './CourseCard';


const Dashboard = ({studentInfo, courses}) => {
    return (
        <div>
            <Header studentInfo={studentInfo}/>
            <Container className="mt-4">
                <Row>
                    {courses ? courses.map(course => (
                        <Col key={course.id} sm={6} md={4} lg={3}>
                            <CourseCard course={course}/>
                        </Col>
                    )) : 'COURSE-CARD'}
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
