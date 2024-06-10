import React, {useState, useEffect, useRef} from 'react';
import {Card, Row, Col, Container, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './StudentCard.css';

function adjustFontSizeForElements() {
    const elements = document.querySelectorAll('.lecturer-info p');
    elements.forEach(el => {
        let fontSize = 16; // Start with a base font size in pixels
        el.style.fontSize = `${fontSize}px`;
        while (el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight) {
            fontSize--;
            el.style.fontSize = `${fontSize}px`;
            if (fontSize < 8) {
                break;
            } // Avoid too small font size
        }
    });
}

function CourseCard({course, isVisible}) {
    const cardRef = useRef(null);
    const backspaceSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z\"/></svg>";
    const backspaceSVGDataUrl = `data:image/svg+xml;base64,${btoa(backspaceSVG)}`;

    const expandContentSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 -960 960 960\" width=\"24\"><path d=\"M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z\"/></svg>";
    const expandContentSVGDataUrl = `data:image/svg+xml;base64,${btoa(expandContentSVG)}`;


    useEffect(() => {
        // Adjust font size when the component is rendered and when window resizes
        adjustFontSizeForElements();
        const handleResize = () => adjustFontSizeForElements();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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
        <Col ref={cardRef} className="card-container show">
            <Card className="subject-card">
                <Card.Header className="card-header d-flex justify-content-between align-items-center">
                    <Link to={`/details/${course.id}`}>
                        <Image src={expandContentSVGDataUrl} alt="expand content" width="30"
                               className="hover-effect-image"/>
                    </Link>
                    <h3 style={{color: "black", fontWeight: "bolder"}}>{course.fullname}</h3>
                    <Link to={course.url}>
                        <Image className="keyboard_backspace"
                               src={backspaceSVGDataUrl} alt="course site"
                               width={70}
                               height={40}/>
                    </Link>
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
                            <h2>{course.events[0] ? getDaysDifference(new Date(course.events[course.events.length - 1].timestart), new Date()) : '0'}</h2>
                            <span>ימים למועד א</span>
                        </Col>
                        <Col className="d-flex justify-content-between card-column">
                            <div>
                                <span>מרצה: </span>
                                <Image src="/local/studentdash/frontend/dashboard/build/contact_mail.png" alt=""/>
                            </div>
                            <div className="lecturer-info">
                                <p className="lecturer-name">{course.lecturer || 'ד"ר יועש חסידים'}</p>
                                <p className="lecturer-email" title={course.lectureremail || 'yoash@sapir.edu.co.il'}>
                                    {course.lectureremail || 'yoash@sapir.edu.co.il'}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

function SubjectCard({studentInfo}) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCards, setVisibleCards] = useState(new Set());
    useEffect(() => {
        setCourses(studentInfo.courses);
    }, [studentInfo.courses]);


    useEffect(() => {
        adjustFontSizeForElements();
        // Add resize event listener to re-check when window size changes
        window.addEventListener('resize', adjustFontSizeForElements);

        return () => {
            // Cleanup resize listener on component unmount
            window.removeEventListener('resize', adjustFontSizeForElements);
        };
    }, []);
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
        }, {threshold: 0.1});

        const cardElements = document.querySelectorAll('.card-container');
        cardElements.forEach(card => observer.observe(card));

        return () => {
            cardElements.forEach(card => observer.unobserve(card));
        };
    }, [courses]);

    return (
        <Container fluid style={{padding: '20px', maxWidth: '1200px'}}>
            <Row xs={1} md={2} className="g-4">
                {courses.map((course, idx) => (
                    <CourseCard key={idx} course={course}/>
                ))}
            </Row>
        </Container>
    );
}


export default SubjectCard;
