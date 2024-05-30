import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Table, Image, Button, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import './CourseDetails.css';
import ChartModal from "./ChartModal";
import SchedModal from "./SchedModal";

function CourseDetails({ studentInfo }) {
    const { courseId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [exams, setExams] = useState([]);
    const [zoomRecords, setZoomRecords] = useState([]);
    const [personalActivities, setPersonalActivities] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({
        taskName: '',
        dueDate: '',
        modifyDate: '',
        status: ''
    });

    const [pieModalData, setPieModalData] = useState(null);
    const [showPieModal, setShowPieModal] = useState(false);

    const [schedModalData, setSchedModalData] = useState(null);
    const [showSchedModal, setShowSchedModal] = useState(false);

    useEffect(() => {
        if (studentInfo && courseId) {
            const course = studentInfo.courses.find(c => c.id === courseId);
            if (course) {
                setTasks(course.tasks || []);
                setSchedule(Array.isArray(course.schedule) ? course.schedule : []);
                setCourseName(course.fullname || '');
            }
            fetch(`/local/studentdash/ajax/fetch_data.php?courseId=${courseId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched data:', data); // Debugging: Log fetched data
                    setPersonalActivities((data.personalActivities || []).map(activity => ({
                        ...activity,
                        duedate: new Date(activity.duedate * 1000).toLocaleDateString(),
                        modifydate: new Date(activity.modifydate * 1000).toLocaleDateString()
                    })));
                    setExams(data.exams || []);
                    setZoomRecords(data.zoomRecords || []);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [studentInfo, courseId]);

    const handleShowPieModal = (assignment) => {
        const submitted = assignment.submission_percentage;
        const notSubmitted = 100 - submitted;
        setPieModalData({
            assignmentname: assignment.assignmentname,
            submitted,
            notSubmitted,
        });
        setShowPieModal(true);
    };

    const handleClosePieModal = () => {
        setShowPieModal(false);
        setPieModalData(null);
    };

    const handleShowSchedModal = (task) => {
        setSchedModalData(task.task_name);
        setShowSchedModal(true);
    };

    const handleCloseSchedModal = () => {
        setShowSchedModal(false);
        setSchedModalData(null);
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
                personalActivity: {
                    courseId,
                    taskName: newTask.taskName,
                    dueDate: new Date(newTask.dueDate).getTime() / 1000,  // Store as Unix timestamp
                    modifyDate: new Date(newTask.modifyDate).getTime() / 1000,  // Store as Unix timestamp
                    status: newTask.status
                }
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPersonalActivities([...personalActivities, {
                        id: data.task_id,
                        taskname: newTask.taskName,
                        duedate: new Date(newTask.dueDate).toLocaleDateString(),  // Format date for display
                        modifydate: new Date(newTask.modifyDate).toLocaleDateString(),  // Format date for display
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
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
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


    const toggleZoomRecordStatus = (id, currentStatus, zoomurl) => {
        const newStatus = currentStatus === 'watched' ? 'unwatched' : 'watched';

        fetch('/local/studentdash/ajax/fetch_data.php', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ zoomRecordId: id, status: newStatus }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.success) {
                    setZoomRecords(zoomRecords.map(record =>
                        record.id === id ? { ...record, status: newStatus } : record
                    ));
                    // Open the zoomurl if it exists
                    if (zoomurl) {
                        window.open(zoomurl, '_blank');
                    }
                } else {
                    console.error('Failed to update Zoom record status:', data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    const formatTime = (startTime, duration) => {
        if (!startTime || !duration) return '';

        // Parse the start time
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(startHours, startMinutes);

        // Ensure duration is a number
        const durationInHours = parseFloat(duration);
        if (isNaN(durationInHours)) return '';

        // Add the duration in hours
        const endDate = new Date(startDate.getTime() + durationInHours * 60 * 60000);
        const endHours = endDate.getHours().toString().padStart(2, '0');
        const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

        // Format the time range
        return `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')} - ${endHours}:${endMinutes}`;
    };

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
                            <tr>
                                <th></th>
                                <th></th>
                                <th>יום בשבוע</th>
                                <th>שעות</th>
                                <th>הרצאות שהועברו</th>
                            </tr>
                            {schedule.map((lecture, index) => (
                                <tr key={index} style={{ animationDelay: `${index * 0.5}s` }}>
                                    <td>{lecture.role || 'הרצאות'}</td>
                                    <td>{lecture.lecturer_name || 'ד"ר חסידים יואש'}</td>
                                    <td>{lecture.day_of_week || 'יום חמישי'}</td>
                                    <td>{lecture.start_time || '10:15'} - {lecture.end_time || '13:30'}</td>
                                </tr>
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
                    overflowX: 'auto'
                }}>
                    <Col>
                        <Table responsive="sm" style={{
                            width: '95%',
                            flex: 1,
                            borderCollapse: 'collapse',
                            backgroundColor: 'white',
                            margin: '10px'
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

                                    <td><Image src="../../frontend/dashboard/build/developer_guide.svg" alt="מסמך המטלה" className="hover-effect-image" /></td>

                                    <td>
                                        <Button style={{ border: 'none' }} variant="light" onClick={() => handleShowSchedModal(task)}>
                                            <Image src="../../frontend/dashboard/build/calendar_clock.svg" alt="הקדשת זמן ביומן" className="hover-effect-image" />
                                        </Button>
                                    </td>

                                    <td>
                                        <Button style={{ border: 'none' }} variant="light" onClick={() => handleShowPieModal(task)}>
                                            <Image src="../../frontend/dashboard/build/bid_landscape.svg" alt="אחוז משלימי המטלה" className="hover-effect-image" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {personalActivities.map((activity, index) => (
                                <tr key={index + tasks.length} className="table-row" style={{ animationDelay: `${(index + tasks.length) * 0.5}s` }}>
                                    <td>{index + 1 + tasks.length}</td>
                                    <td>personal activity</td>
                                    <td>{activity.taskname}</td>
                                    <td>{activity.duedate}</td>
                                    <td>{activity.modifydate}</td>
                                    <td>{activity.status}</td>
                                    <td></td>
                                    <td>
                                        <Button style={{ border: 'none' }} variant="light" onClick={() => handleDelete(activity.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                    <td></td>
                                    <td></td>
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

                            {Array.isArray(exams) && exams.length > 0 ? exams.map((exam, index) => (
                                <tr key={index} className="table-row" style={{animationDelay: `${index * 0.3}s`}}>
                                    <td>{index + 1}</td>
                                    <td>{exam.exam_type}</td>
                                    <td>{new Date(exam.exam_date * 1000).toLocaleDateString()}</td>
                                    <td>{formatTime(exam.exam_time, exam.duration)}</td>
                                    <td>{exam.duration} שעות  </td>
                                    <td>{exam.location}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6">No exams found.</td>
                                </tr>
                            )}

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
                            {zoomRecords.length > 0 ? zoomRecords.map((record, index) => (
                                <tr key={record.id} className="table-row" style={{animationDelay: `${index * 0.3}s`}}>
                                    <td>{index + 1}</td>
                                    <td>{record.recording_type}</td>
                                    <td>{record.recording_name}</td>
                                    <td>{new Date(record.recording_date * 1000).toLocaleDateString()}</td>
                                    <td style={{color: record.status === 'watched' ? 'green' : 'red'}}>
                                        {record.status === 'watched' ? 'נצפה' : 'טרם נצפה'}
                                    </td>
                                    <td>
                                        <Button variant="link" onClick={() => toggleZoomRecordStatus(record.id, record.status, record.zoomurl)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                                <path d="M360-280h80v-131l120 69 40-69-120-69 120-69-40-69-120 69v-131h-80v131l-120-69-40 69 120 69-120 69 40 69 120-69v131ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6">No zoom recordings found.</td>
                                </tr>
                            )}
                        </Table>
                    </Col>
                </Row>
            </Container>
            <ChartModal show={showPieModal} onHide={handleClosePieModal} data={pieModalData} />
            <SchedModal show={showSchedModal} onHide={handleCloseSchedModal} data={schedModalData} />
        </Container>
    );
}

export default CourseDetails;
