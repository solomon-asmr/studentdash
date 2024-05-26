import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Table, Image, Button, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import './CourseDetails.css';
import ChartModal from "./ChartModal";

function CourseDetails({ studentInfo }) {
    const { courseId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [exams, setExams] = useState([]);
    const [personalActivities, setPersonalActivities] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({
        taskName: '',
        dueDate: '',
        modifyDate: '',
        status: ''
    });

    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (studentInfo && courseId) {
            const course = studentInfo.courses.find(c => c.id === courseId);
            if (course) {
                setTasks(course.tasks || []);
                setSchedule(Array.isArray(course.schedule) ? course.schedule : []);
                setExams(course.exams || []);
                setCourseName(course.fullname || '');
            }
            fetch(`/local/studentdash/ajax/fetch_data.php?courseId=${courseId}`)
                .then(response => response.json())
                .then(data => {
                    setPersonalActivities(data.personalActivities || []);
                })
                .catch(error => console.error('Error fetching personal activities:', error));
            setIsLoading(false);
        }
    }, [studentInfo, courseId]);

    const handleShowModal = (assignment) => {
        const submitted = assignment.submission_percentage;
        const notSubmitted = 100 - submitted;
        setModalData({
            assignmentname: assignment.assignmentname,
            submitted,
            notSubmitted,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalData(null);
    };

    const handleAddToCalendar = (title, start, end) => {
        const eventTitle = encodeURIComponent('Your Event Title');
        const eventStartDate = encodeURIComponent('2024-06-01T10:00:00'); // Format: YYYY-MM-DDTHH:mm:ss
        const eventEndDate = encodeURIComponent('2024-06-01T12:00:00'); // Format: YYYY-MM-DDTHH:mm:ss

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventStartDate}/${eventEndDate}`;

        window.location.href = calendarUrl;
    };

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/local/studentdash/ajax/fetch_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId,
                taskName: newTask.taskName,
                dueDate: newTask.dueDate,
                modifyDate: newTask.modifyDate,
                status: newTask.status
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPersonalActivities([...personalActivities, {
                        id: data.task_id,
                        taskname: newTask.taskName,
                        duedate: newTask.dueDate,
                        modifydate: newTask.modifyDate,
                        status: newTask.status
                    }]);
                    setNewTask({
                        taskName: '',
                        dueDate: '',
                        modifyDate: '',
                        status: ''
                    });
                    setShowForm(false);
                } else {
                    console.error('Failed to add task:', data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleDelete = (taskId) => {
        fetch('/local/studentdash/ajax/fetch_data.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPersonalActivities(personalActivities.filter(activity => activity.id !== taskId));
                } else {
                    console.error('Failed to delete task:', data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (isLoading) {
        return <div><h2>Loading...</h2></div>;
    }

    return (
        <Container className="courseDetailContainer" fluid style={{ padding: '20px', maxWidth: '1200px' }}>
            <Container fluid style={{ backgroundColor: 'white', borderRadius: '10px', position: "relative" }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <Link to="/back">
                        <Image src="../../frontend/dashboard/build/collapse_content.png" width="50" height="50" alt="collapse content" className="hover-effect-image" />
                    </Link>

                    <h2 style={{ color: "black", fontWeight: "bolder" }}>{courseName}</h2>

                    <Link to="/back">
                        <Image className="keyboard_backspace hover-effect-image" src="../../frontend/dashboard/build/keyboard_backspace.png" width="50" height="30" alt="nothing" />
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
                            borderRadius: '15px'
                        }}>
                            <thead>
                            <th></th>
                            <th></th>
                            <th>יום בשבוע</th>
                            <th>שעות</th>
                            <th>הרצאות שהועברו</th>
                            </thead>
                            <tr>
                                <td>Lectures</td>
                                <td>{schedule[0] ? schedule[0].lecturer_name : 'empty' }</td>
                                <td>{schedule[0] ? schedule[0].day_of_week : 'empty' }</td>
                                <td>{schedule[0] ? schedule[0].start_time : 'empty' } - {schedule[0] ? schedule[0].end_time : 'empty'}</td>
                                <td>progress</td>
                            </tr>
                            <tr>
                                <td>Practices</td>
                                <td>22</td>
                                <td>33</td>
                                <td>44</td>
                                <td>progress</td>
                            </tr>
                            {/*{schedule.map((lecture, index) => (*/}
                            {/*    <tr key={index} className="table-row" style={{ animationDelay: `${index * 0.5}s` }}>*/}
                            {/*        <td>{lecture.type || 'הרצאות'}</td>*/}
                            {/*        <td>{lecture.lecturer_name || 'ד"ר חסידים יואש'}</td>*/}
                            {/*        <td>{lecture.day_of_week || 'יום חמישי'}</td>*/}
                            {/*        <td>{lecture.start_time || '10:15'} - {lecture.end_time || '13:30'}</td>*/}
                            {/*    </tr>*/}
                            {/*))}*/}
                        </Table>
                    </Col>
                </Row>

                <Row className="subject-detail" style={{
                    backgroundColor: '#5ae4c6',
                    border: '1px solid transparent',
                    textAlign: 'center',
                    borderRadius: '10px',
                    margin: '10px',
                    overflowX: 'auto'
                }}>
                    <Col>
                        <Table responsive="sm" style={{ width: '95%', flex: 1, borderCollapse: 'collapse', backgroundColor: 'white', margin: '10px' }}>
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
                                <tr key={index} className="table-row" style={{ animationDelay: `${index * 0.3}s` }}>
                                    <td>{index + 1}</td>
                                    <td>{task.task_type}</td>
                                    <td>{task.task_name}</td>
                                    <td>{task.due_date}</td>
                                    <td>{task.modify_date}</td>
                                    <td>{task.task_status}</td>
                                    <td>
                                        <Button href={task.url} style={{ border: 'none' }} variant="light">
                                            <Image src="../../frontend/dashboard/build/library_books.svg" alt="לעמוד המטלה" className="hover-effect-image" />
                                        </Button>
                                    </td>
                                    <td><Image src="../../frontend/dashboard/build/developer_guide.svg" alt="" className="hover-effect-image" /></td>
                                    <td>
                                        <Button style={{ border: 'none' }} variant="light" onClick={() => handleAddToCalendar()}>
                                            <Image src="../../frontend/dashboard/build/calendar_clock.svg" alt="" className="hover-effect-image" />
                                        </Button>
                                    </td>
                                    <td>
                                        <Button style={{ border: 'none' }} variant="light" onClick={() => handleShowModal(task)}>
                                            <Image src="../../frontend/dashboard/build/bid_landscape.svg" alt="" className="hover-effect-image" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                        <div className="add-activity">
                            <span onClick={handleShowForm} style={{ cursor: 'pointer' }}> &#65291; הוספת משימה אישית</span>
                        </div>
                        {showForm && (
                            <Form className="activityAdderForm" onSubmit={handleSubmit} style={{
                                marginTop: '20px',
                                marginBottom: '20px',
                                backgroundColor: '#f8f9fa',
                                padding: '20px',
                                width: '60%',
                                marginLeft: '20%',
                                display: 'block',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '10px',
                                border: '1px solid #dee2e6',
                                boxShadow: '10 4px 8px rgba(0, 0.8, 0.7, 0.9)'
                            }}>
                                <Form.Group controlId="taskName">
                                    <Form.Label style={{ fontWeight: 'bold' }}>שם המטלה</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="taskName"
                                        value={newTask.taskName}
                                        onChange={handleInputChange}
                                        placeholder="personal activity"
                                        required
                                        style={{ marginBottom: '10px', borderColor: '#ced4da' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="dueDate">
                                    <Form.Label style={{ fontWeight: 'bold' }}>מועד אחרון</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dueDate"
                                        value={newTask.dueDate}
                                        onChange={handleInputChange}
                                        required
                                        style={{ marginBottom: '10px', borderColor: '#ced4da' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="modifyDate">
                                    <Form.Label style={{ fontWeight: 'bold' }}>מועד בפועל</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="modifyDate"
                                        value={newTask.modifyDate}
                                        onChange={handleInputChange}
                                        required
                                        style={{ marginBottom: '10px', borderColor: '#ced4da' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="status">
                                    <Form.Label style={{ fontWeight: 'bold' }}>סטטוס</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="status"
                                        value={newTask.status}
                                        onChange={handleInputChange}
                                        required
                                        style={{ marginBottom: '20px', borderColor: '#ced4da' }}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{ width: '100px', fontWeight: 'bold' }}>
                                    שמור
                                </Button>
                            </Form>
                        )}

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
                                <tr key={index} className="table-row" style={{ animationDelay: `${index * 0.3}s` }}>
                                    <td>{index + 1 || '1'}</td>
                                    <td>{exam.exam_name || 'מבחן אמצע'}</td>
                                    <td>{exam.exam_date || '22/02/24'}</td>
                                    <td>{exam.exam_time || '09:00'} </td>
                                    <td>{exam.exam_duration || '2'} שעות</td>
                                    <td>{exam.exam_location || 'מקוון'}</td>
                                </tr>
                            ))}
                        </Table>
                    </Col>
                    <Col className="responsive-table-col" md={6} sm={12}>
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

                <Row>

                    <Col>
                        <h2 style={{textAlign:"center"}}>Personal Activities 👌</h2>
                        <Table responsive="sm" style={{
                            width: '95%',
                            flex: 1,
                            borderCollapse: 'collapse',
                            backgroundColor: 'lightskyblue',
                            margin: '10px',
                            borderRadius: '10px'
                        }}>
                            <tr>
                                <th>מס"ד</th>
                                <th>שם המטלה</th>
                                <th>מועד אחרון</th>
                                <th>מועד בפועל</th>
                                <th>סטטוס</th>
                                <th>מחק</th>
                            </tr>
                            {personalActivities.map((activity, index) => (
                                <tr key={index + tasks.length} className="table-row"
                                    style={{animationDelay: `${(index + tasks.length) * 0.5}s`}}>
                                    <td>{index + 1 + tasks.length}</td>
                                    <td>{activity.taskname}</td>
                                    <td>{new Date(activity.duedate * 1000).toLocaleDateString()}</td>
                                    <td>{new Date(activity.modifydate * 1000).toLocaleDateString()}</td>
                                    <td>{activity.status}</td>
                                    <td>
                                        <Button style={{border: 'none'}} variant="light"
                                                onClick={() => handleDelete(activity.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                                 viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                                <path
                                                    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    </Col>
                </Row>
            </Container>
            <ChartModal show={showModal} onHide={handleCloseModal} data={modalData} />
        </Container>
    );
}

export default CourseDetails;
