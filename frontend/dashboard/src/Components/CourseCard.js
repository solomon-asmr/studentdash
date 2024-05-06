import React from 'react';
import {Card} from 'react-bootstrap';

const CourseCard = ({course}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{course.fullname || 'COURSE-TITLE'}</Card.Title>
            </Card.Body>
        </Card>
    );
};

export default CourseCard;
