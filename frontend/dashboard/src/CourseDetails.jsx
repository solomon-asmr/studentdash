import React, {useState, useEffect} from 'react';
import {Card, Container, Row, Col, Table, Image, Button} from 'react-bootstrap';
import {useParams, Link} from 'react-router-dom';
import './CourseDetails.css';
import {backspaceSVGDataUrl, collapseContentSVGDataUrl} from './constants';
import ChartModal from "./ChartModal";
import SchedModal from "./SchedModal";
import AddTaskModal from "./AddTaskModal";

function CourseDetails({studentInfo, downloadAssignmentFiles}) {
    const {courseId} = useParams();
    const [course, setCourse] = useState({});
    const [tasks, setTasks] = useState([]);
    const [schedule, setSchedule] = useState({});
    const [exams, setExams] = useState([]);
    const [zoomRecords, setZoomRecords] = useState([]);
    const [personalActivities, setPersonalActivities] = useState([]);
    const [courseName, setCourseName] = useState('');

    const [pieModalData, setPieModalData] = useState(null);
    const [showPieModal, setShowPieModal] = useState(false);

    const [schedModalData, setSchedModalData] = useState(null);
    const [showSchedModal, setShowSchedModal] = useState(false);

    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    useEffect(() => {
        if (studentInfo && courseId) {
            const course = studentInfo.courses.find(c => c.id === courseId);
            if (course) {
                setCourse(course);
                setTasks(course.tasks || []);
                setSchedule(course.schedule || {});
                setCourseName(course.fullname || '');
                setExams(course.exams || []);
            }
            fetch(`/local/studentdash/ajax/fetch_data.php?courseId=${courseId}`)
                .then(response => response.json())
                .then(data => {
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

    const handleCloseAddTaskModal = () => {

        setShowAddTaskModal(false);
    };

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
        setSchedModalData(task.task_name || task.taskname);
        setShowSchedModal(true);
    };

    const handleCloseSchedModal = () => {
        setShowSchedModal(false);
        setSchedModalData(null);
    };


    async function handleAddTask(task) {
        try {
            const response = await fetch('/local/studentdash/ajax/fetch_data.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    personalActivity: {
                        courseId,
                        taskName: task.taskName,
                        dueDate: task.dueDate,
                        status: task.status
                    }
                }),
            });

            const jsonResponse = await response.json(); // Parse the response as JSON

            if (jsonResponse.success) {
                const newTask = {
                    id: jsonResponse.task_id,
                    taskname: task.taskName,
                    duedate: task.dueDate,
                    modifydate: new Date().toLocaleDateString(), // Assuming modify date is the current date
                    status: task.status,
                };

                // Update the personalActivities state to include the new task
                setPersonalActivities([...personalActivities, newTask]);

                console.log('Task added successfully:', jsonResponse.task_id);
            } else {
                console.error('Failed to add task:', jsonResponse.error);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }


    const handleDelete = (taskId) => {
        fetch('/local/studentdash/ajax/fetch_data.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({taskId}),
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
            body: JSON.stringify({zoomRecordId: id, status: newStatus}),
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
                        record.id === id ? {...record, status: newStatus} : record
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
        if (!startTime || !duration) {
            return '';
        }

        // Parse the start time
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(startHours, startMinutes);

        // Ensure duration is a number
        const durationInHours = parseFloat(duration);
        if (isNaN(durationInHours)) {
            return '';
        }

        // Add the duration in hours
        const endDate = new Date(startDate.getTime() + durationInHours * 60 * 60000);
        const endHours = endDate.getHours().toString().padStart(2, '0');
        const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

        // Format the time range
        return `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')} - ${endHours}:${endMinutes}`;
    };

    return (
        <Container className="courseDetailContainer" fluid style={{padding: '20px', maxWidth: '1200px'}}>
            <Container fluid style={{backgroundColor: 'white', borderRadius: '10px', position: "relative"}}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <Link to="/back">
                        <Image src={collapseContentSVGDataUrl} width="30" height="30"
                               alt="collapse content" className="hover-effect-image"/>
                    </Link>

                    <h2 style={{color: "black", fontWeight: "bolder"}}>{courseName}</h2>


                    <a href={course.url} target="_blank" rel="noopener noreferrer">
                        <Image className="keyboard_backspace hover-effect-image"
                               src={backspaceSVGDataUrl} width="70" height="40" alt="nothing"/>
                    </a>
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
                            {course && (
                                <tr>
                                    <th></th>
                                    <th>שם המרצה</th>
                                    <th>יום בשבוע</th>
                                    <th>שעות</th>
                                    <th>הרצאות שהועברו</th>
                                </tr>
                            )}
                            {course.schedule && (
                                <tr>
                                    <td className={'bold'}>הרצאות</td>
                                    <td>{course.lecturer}</td>
                                    <td>{schedule.lectures.day}</td>
                                    <td>{schedule.lectures.time}</td>
                                    <td>{schedule.lectures.done}/13</td>
                                </tr>
                            )}
                            {course.schedule && (
                                <tr>
                                    <td className={'bold'}>תרגולים</td>
                                    <td>{course.practitioner || 'practitioner name'}</td>
                                    <td>{schedule.practices.day}</td>
                                    <td>{schedule.practices.time}</td>
                                    <td>{schedule.practices.done}/13</td>
                                </tr>
                            )}
                        </Table>

                    </Col>
                </Row>

                <Row className="subject-detail" style={{backgroundColor: '#5ae4c6'}}>
                    <Col style={{alignItems: 'flex-start'}}>
                        <Table responsive="sm" style={{flex: 0, margin: '10px'}}>
                            <tr style={{backgroundColor: '#5ae4c6'}}>
                                <th>מס"ד</th>
                                <th>סוג המטלה</th>
                                <th>שם המטלה</th>
                                <th>מועד אחרון</th>
                                <th>מועד בפועל</th>
                                <th>סטטוס</th>
                            </tr>

                            <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index} className="table-row" style={{animationDelay: `${index * 0.2}s`}}>
                                    <td>{index + 1}</td>
                                    <td>{task.task_type}</td>
                                    <td>{task.task_name}</td>
                                    <td>{task.due_date}</td>
                                    <td>{task.modify_date}</td>
                                    <td>{task.task_status}</td>

                                    <td>
                                        <Button href={task.url} target="_blank" rel="noopener noreferrer"
                                                style={{border: 'none', padding: 0, margin: 0, height: '20px'}}
                                                variant="light">
                                            <Image src="../../frontend/dashboard/build/library_books.svg"
                                                   alt="לעמוד המטלה" className="hover-effect-image"
                                                   style={{height: '100%', width: 'auto'}}/>

                                        </Button>
                                    </td>

                                    <td>
                                        <Button style={{border: 'none', padding: 0, margin: 0, height: '20px'}} variant="light"
                                                onClick={() => downloadAssignmentFiles(task.task_id)}>
                                            <Image src="../../frontend/dashboard/build/developer_guide.svg"
                                                   alt="Download Assignment Files" className="hover-effect-image"
                                                   style={{height: '100%', width: 'auto'}}/>

                                        </Button>
                                    </td>

                                    <td>
                                        <Button style={{border: 'none', padding: 0, margin: 0, height: '20px'}} variant="light"
                                                onClick={() => handleShowSchedModal(task)}>
                                            <Image src="../../frontend/dashboard/build/calendar_clock.svg"
                                                   alt="הקדשת זמן ביומן" className="hover-effect-image"
                                                   style={{height: '100%', width: 'auto'}}/>

                                        </Button>
                                    </td>

                                    <td>
                                        <Button style={{border: 'none', padding: 0, margin: 0, height: '20px'}} variant="light"
                                                onClick={() => handleShowPieModal(task)}>
                                            <Image src="../../frontend/dashboard/build/bid_landscape.svg"
                                                   alt="אחוז משלימי המטלה" className="hover-effect-image"
                                                   style={{height: '100%', width: 'auto'}}/>

                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {personalActivities.map((activity, index) => (
                                <tr key={index + tasks.length} className="table-row"
                                    style={{animationDelay: `${(index + tasks.length) * 0.2}s`}}>
                                    <td>{index + 1 + tasks.length}</td>
                                    <td>Personal Activity</td>
                                    <td>{activity.taskname}</td>
                                    <td>{activity.duedate}</td>
                                    <td>{activity.modifydate}</td>
                                    <td>{activity.status}</td>
                                    <td></td>
                                    <td>
                                        <Button style={{border: 'none', padding: 0, margin: 0, height: '20px'}} variant="light"
                                                onClick={() => handleDelete(activity.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                                 width="24px" fill="#5f6368">
                                                <path
                                                    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                    <td>
                                        <Button style={{border: 'none', padding: 0, margin: 0, height: '20px'}} variant="light"
                                                onClick={() => handleShowSchedModal(activity)}>
                                            <Image src="../../frontend/dashboard/build/calendar_clock.svg"
                                                   alt="הקדשת זמן ביומן" className="hover-effect-image"
                                                   style={{height: '100%', width: 'auto'}}/>
                                        </Button>
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <div className="add-activity-container">
                            <div className="add-activity">
                                <span onClick={() => setShowAddTaskModal(true)}
                                      style={{cursor: 'pointer'}}> &#65291; הוספת משימה אישית</span>
                            </div>
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

                            {Array.isArray(exams) && exams.length > 0 ? exams.map((exam, index) => (
                                <tr key={index} className="table-row" style={{animationDelay: `${index * 0.2}s`}}>
                                    <td>{index + 1}</td>
                                    <td>{exam.exam_type}</td>
                                    <td>{new Date(exam.exam_date * 1000).toLocaleDateString()}</td>
                                    <td>{formatTime(exam.exam_time, exam.duration)}</td>
                                    <td>{exam.duration} שעות</td>
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
                                <tr key={record.id} className="table-row" style={{animationDelay: `${index * 0.2}s`}}>
                                    <td>{index + 1}</td>
                                    <td>{record.recording_type}</td>
                                    <td>{record.recording_name}</td>
                                    <td>{new Date(record.recording_date * 1000).toLocaleDateString()}</td>
                                    <td style={{color: record.status === 'watched' ? 'green' : 'red'}}>
                                        {record.status === 'watched' ? 'נצפה' : 'טרם נצפה'}
                                    </td>
                                    <td>
                                        <Button style={{border: 'none', padding: 0, margin: 0, height: '20px'}}
                                                variant="link"
                                                onClick={() => toggleZoomRecordStatus(record.id, record.status, record.zoomurl)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960"
                                                 width="16px" fill="#5f6368">
                                                <path
                                                    d="M360-280h80v-131l120 69 40-69-120-69 120-69-40-69-120 69v-131h-80v131l-120-69-40 69 120 69-120 69 40 69 120-69v131ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z"/>
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
            <ChartModal show={showPieModal} onHide={handleClosePieModal} data={pieModalData}/>
            <SchedModal show={showSchedModal} onHide={handleCloseSchedModal} data={schedModalData}/>
            <AddTaskModal show={showAddTaskModal} onHide={handleCloseAddTaskModal} onAddTask={handleAddTask}/>
        </Container>
    );
}

export default CourseDetails;
