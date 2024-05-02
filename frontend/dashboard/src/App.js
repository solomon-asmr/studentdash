import Dashboard from "./Components/Dashboard";
import {useEffect, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectCard from './SubjectCard';
import CourseDetails from './CourseDetails';
import ToDoList from './ToDoList';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
function App() {

    axios.defaults.baseURL = 'http://localhost/local/studentdash';

    const [studentInfo, setStudentInfo] = useState({});

    // Function to fetch user data from the database
    const fetchUserData = async() => {
        try {
            const response = await axios.get('/ajax/fetch_user_data.php'); // Replace with your API endpoint
            console.log(response);
            setStudentInfo(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);


    return (
        <>

            <Dashboard studentInfo={studentInfo} courses={null}/>
            <Router>
                <Container className="d-flex justify-content-center" style={{ backgroundColor: '#1f4e79' }}>
                    .
                    <Routes>
                        <Route path="/" element={<SubjectCard/>} />
                        <Route path="/details" element={<CourseDetails/>} />
                        <Route path="/back" element={<SubjectCard/>} />
                        <Route path="/ToDo" element={<ToDoList/>} />
                    </Routes>

                </Container>
            </Router>

        </>
    );
}

export default App;
