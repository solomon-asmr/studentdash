import React from 'react';
import {Card} from 'react-bootstrap';

const CourseCard = ({course}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{course.title || 'COURSE-TITLE'}</Card.Title>
                <Card.Text>{course.description || 'COURSE-DESCRIPTION'}</Card.Text>
                <Card.Link href="#">View Course</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default CourseCard;
