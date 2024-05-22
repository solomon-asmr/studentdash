import React, { useState, useEffect, useRef } from 'react';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './StudentCard.css';

function CourseCard({ course, isVisible }) {
    const cardRef = useRef(null);

    useEffect(() => {
        if (isVisible) {
            cardRef.current.classList.add('show');
        }
    }, [isVisible]);

    const getDaysDifference = (date1, date2) => {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((date1 - date2) / oneDay));
    };

    return (
        <Col ref={cardRef} className="card-container">
            <Card className="subject-card">
                <Card.Header className="card-header d-flex justify-content-between align-items-center">
                    <Link to={`/details/${course.id}`}>
                        <Image src="/local/studentdash/frontend/dashboard/build/expand_content.svg" alt="expand content" width="30" className="hover-effect-image" />
                    </Link>
                    <h2 style={{ color: "black", fontWeight: "bolder" }}>{course.fullname}</h2>
                    <a href={course.url}>
                        <Image className="keyboard_backspace" src="/local/studentdash/frontend/dashboard/build/keyboard_backspace.png" alt="" width={50} height={30} />
                    </a>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col className="d-flex justify-content-between card-column">
                            <h3>{course.tasks.length}</h3>
                            <span>משימות ממתינות</span>
                        </Col>
                        <Col className="d-flex justify-content-between card-column">
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
                                <Image src="/local/studentdash/frontend/dashboard/build/contact_mail.png" alt="" />
                            </div>
                            <div>
                                <span><p>{course.lecturer || ' ד"ר יועש חסידים '}</p></span>
                                <span>{course.lectureremail || 'yoash@sapir.edu.co.il'} </span>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

function SubjectCard({ studentInfo }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCards, setVisibleCards] = useState(new Set());

    useEffect(() => {
        setCourses(studentInfo.courses);
        setLoading(false);
    }, [studentInfo.courses]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisibleCards(prevVisibleCards => new Set(prevVisibleCards).add(entry.target));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const cardElements = document.querySelectorAll('.card-container');
        cardElements.forEach(card => observer.observe(card));

        return () => {
            cardElements.forEach(card => observer.unobserve(card));
        };
    }, [courses]);

    return (
        <Container fluid style={{ padding: '20px', maxWidth: '1200px' }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Row xs={1} md={2} className="g-4">
                    {courses.map((course, idx) => (
                        <CourseCard key={idx} course={course} isVisible={visibleCards.has(document.querySelectorAll('.card-container')[idx])} />
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default SubjectCard;
