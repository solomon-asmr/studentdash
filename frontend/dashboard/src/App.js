import {useEffect, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectCard from './SubjectCard';
import CourseDetails from './CourseDetails';
import ToDoList from './ToDoList';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import {Container} from 'react-bootstrap';

function App() {

    const [studentInfo, setStudentInfo] = useState({});
    const [courses, setCourses] = useState([]);


    // Function to fetch user data from the database
    const fetchUserData = async() => {
        try {
            const response = await axios.get('/local/studentdash/ajax/fetch_user_data.php');
            const response = await axios.get('/ajax/fetch_data.php'); // Replace with your API endpoint
            console.log(response);
            setStudentInfo(response.data);
            const courses = await axios.get('/local/studentdash/ajax/fetch_courses.php');
            console.log(courses);
            setCourses(courses.data);

        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchUserData();
    }, []);


    return (
        <>
            <Router basename={'/local/studentdash/dashboard.php'}>
                <Container className="d-flex justify-content-center" style={{backgroundColor: '#1f4e79'}}>
                    <Routes>
                        <Route path="/" element={<SubjectCard/>}/>
                        <Route path="/details" element={<CourseDetails/>}/>
                        <Route path="/back" element={<SubjectCard/>}/>
                        <Route path="/ToDo" element={<ToDoList/>}/>
                    </Routes>
                </Container>
            </Router>
        </>
    );
}

export default App;
