// App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectCard from './SubjectCard';
import CourseDetails from './CourseDetails';
import ToDoList from './ToDoList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
    const [studentInfo, setStudentInfo] = useState({});

    // Function to fetch user data from the database
    const fetchUserData = async () => {
        try {
            const response = await axios.get('/ajax/fetch_data.php'); // Replace with your API endpoint
            console.log(response);
            setStudentInfo(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <Router basename={'/local/studentdash/dashboard.php'} studentInfo={studentInfo}>
            <Container className="student-dashboard-main-container">
                <Routes>
                    <Route path="/" element={<SubjectCard />} />
                    <Route path="/details" element={<CourseDetails />} />
                    <Route path="/back" element={<SubjectCard />} />
                    <Route path="/ToDo" element={<ToDoList />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;