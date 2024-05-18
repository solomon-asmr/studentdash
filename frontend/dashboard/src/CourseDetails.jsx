import React, {useState, useEffect} from 'react';
import {Card, Container, Row, Col, Table, Image} from 'react-bootstrap';
import {useParams, Link} from 'react-router-dom';
import './CourseDetails.css'; // Make sure to adjust the CSS file for Bootstrap compatibility
import NavigationBar from './NavigationBar.jsx';


function CourseDetails({studentInfo}) {
    const {courseId} = useParams();
    const [tasks, setTasks] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [exams, setExams] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (studentInfo && courseId) {
            const course = studentInfo.courses.find(c => c.id === courseId);
            if (course) {
                setTasks(course.tasks || []);
                setSchedule(Array.isArray(course.schedule) ? course.schedule : []);
                setExams(course.exams || []);
                setCourseName(course.fullname || '');
            }
            setIsLoading(false);
        }
    }, [studentInfo, courseId]);

    if (isLoading) {
        return <div><h2>Loading...</h2></div>;
    }

    return (
        <Container fluid style={{
            padding: '20px',
            maxWidth: '1200px',
        }}>

            <NavigationBar studentInfo={studentInfo}/>

            <Container fluid style={
                {
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    zIndex: 2,
                    marginTop: '50px',
                    position: "relative"
                }
            }>
                <Card.Header className="d-flex justify-content-between align-items-center">

                    <Link to="/back">
                        <Image src="../../frontend/dashboard/build/collapse_content.png" alt="collapse content"/>
                    </Link>

                    <h3>{courseName}</h3>

                    <Link to="/back">
                        <Image className="keyboard_backspace" src="../../frontend/dashboard/build/keyboard_backspace.png" width="50"
                               height="30" alt="nothing"/>
                    </Link>

                </Card.Header>

                <Row>
                    <Col>
                        <Table responsive="sm" className="lecture-time" style={{
                            width: '60%',
                            border: '1px solid transparent',
                            textAlign: 'center',
                            backgroundColor: 'rgb(255, 192, 0)',
                            margin: '10px',
                            borderRadius: '15px',
                        }}>

                            <tr>
                                <th></th>
                                <th></th>
                                <th>יום בשבוע</th>
                                <th>שעות</th>
                                <th>הרצאות שהועברו</th>
                            </tr>

                            {schedule.map((lecture, index) => (
                                <tr key={index}>
                                    <td>{lecture.type || 'הרצאות'}</td>
                                    <td>{lecture.lecturer_name || 'ד"ר חסידים יואש'}</td>
                                    <td>{lecture.day_of_week || 'יום חמישי'}</td>
                                    <td>{lecture.start_time || '10:15'} - {lecture.end_time || '13:30'}</td>
                                </tr>
                                // todo 2nd teacher
                            ))}

                        </Table>
                    </Col>
                </Row>

                <Row className="subject-detail" style={{
                    backgroundColor: '#5ae4c6',
                    border: '1px solid transparent',
                    textAlign: 'center',
                    borderRadius: '10px',
                    margin: '10px',
                    overflowX: 'auto', /* Enables horizontal scrolling */
                }}>
                    <Col>
                        <Table responsive="sm" style={{
                            width: '95%',
                            flex: 1,
                            borderCollapse: 'collapse',
                            backgroundColor: 'white',
                            margin: '10px',
                        }}>
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
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{task.task_type}</td>
                                    <td>{task.task_name}</td>
                                    <td>{task.due_date}</td>
                                    <td>{task.modify_date}</td>
                                    <td>{task.task_status}</td>
                                    <td><Image src="../../frontend/dashboard/build/library_books.svg" alt=""/></td>
                                    <td><Image src="../../frontend/dashboard/build/developer_guide.svg" alt=""/></td>
                                    <td><Image src="../../frontend/dashboard/build/calendar_clock.svg" alt=""/></td>
                                    <td><Image src="../../frontend/dashboard/build/bid_landscape.svg" alt=""/></td>
                                </tr>
                            ))}
                        </Table>
                        <div className="add-activity">
                            {/* todo */}
                            <span><Link to="/ToDo"> &#65291; הוספת משימה אישית</Link></span>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col className="responsive-table-col" md={6} sm={12}>
                        <Table responsive="sm" className="examZoom-records">

                            <tr>
                                <th>מס"ד</th>
                                <th>סוג מבחן</th>
                                <th>מועד מבחן</th>
                                <th>שעות מבחן</th>
                                <th>משך</th>
                                <th>מיקום</th>
                            </tr>

                            {exams.map((exam, index) => (
                                <tr key={index}>
                                    <td>{index + 1 || '1'}</td>
                                    <td>{exam.exam_name || 'מבחן אמצע'}</td>
                                    <td>{exam.exam_date || '22/02/24'}</td>
                                    <td>{exam.exam_time || '09:00 '} </td>
                                    <td>{exam.exam_duration || '2'} שעות</td>
                                    <td>{exam.exam_location || 'מקוון'}</td>
                                </tr>
                            ))}

                        </Table>
                    </Col>
                    <Col className="responsive-table-col" md={6} sm={12}>
                        {/* todo */}
                        <Table responsive="sm" className="examZoom-records">

                            <tr>
                                <th>מס"ד</th>
                                <th>סוג הקלטה</th>
                                <th>שם הקלטה</th>
                                <th>מועד הקלטה</th>
                                <th>סטטוס</th>
                                <th></th>
                            </tr>


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
                                <td>שיעור 4 הקלטה</td>
                                <td>18/02/24</td>
                                <td>טרם נצפה</td>
                                <td></td>
                            </tr>

                        </Table>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default CourseDetails;
