import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import SubjectCard from './SubjectCard';
import CourseDetails from './CourseDetails';
import ToDoList from './ToDoList';

function App() {
    const [studentInfo, setStudentInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("ajax/fetch_data.php")
            .then(res => {
                setStudentInfo(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setIsLoading(false);
            });
    }, []);

    // Function to handle file download
    const downloadAssignmentFiles = (taskId) => {
        const course = studentInfo.courses.find(course =>
            course.tasks.some(task => task.task_id === taskId)
        );

        if (course) {
            const task = course.tasks.find(task => task.task_id === taskId);
            const fileUrl = task.fileurl;
            if (fileUrl) {
                window.location.href = fileUrl; // Directly navigate to the URL which will trigger the file download
            } else {
                console.error('No download URL provided.');
            }
        } else {
            console.error('Task not found.');
        }
    };

    return (
        <Container style={{ backgroundColor: '#1f4e79' }}>
            <Router basename="/local/studentdash/dashboard.php">
                <NavigationBar studentInfo={studentInfo ? studentInfo : <div>No data available</div>} />
                <Routes>
                    <Route path="/" element={isLoading ? <Spinner animation="border" /> : studentInfo ? <SubjectCard studentInfo={studentInfo} /> : <div>No data available</div>} />
                    <Route path="/details/:courseId" element={<CourseDetails studentInfo={studentInfo} downloadAssignmentFiles={downloadAssignmentFiles} />} />
                    <Route path="/back" element={studentInfo ? <SubjectCard studentInfo={studentInfo} /> : <div>No data available</div>} />
                    <Route path="/ToDo" element={<ToDoList studentInfo={studentInfo} />} />
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
