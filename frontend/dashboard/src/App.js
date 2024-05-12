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
import {Container, Spinner} from 'react-bootstrap';

function App() {

    const [studentInfo, setStudentInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch user data from the database
    useEffect(() => {
        axios
            .get("ajax/fetch_data.php")
            .then((res) => {
                setStudentInfo(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <Router basename={'/local/studentdash/dashboard.php'}>
                <Container className="d-flex justify-content-center" style={{backgroundColor: '#1f4e79'}}>
                    <Routes>
                        <Route path="/" element={isLoading ? <Spinner animation="border"/> : studentInfo ?
                            <SubjectCard studentInfo={studentInfo}/> : <div>No data available</div>}/>
                        <Route path="/details" element={<CourseDetails studentInfo={studentInfo}/>}/>
                        <Route path="/back"
                               element={studentInfo ? <SubjectCard studentInfo={studentInfo}/> : <div>No data available</div>}/>
                        <Route path="/ToDo" element={<ToDoList studentInfo={studentInfo}/>}/>
                    </Routes>
                </Container>
            </Router>
        </>
    );
}

export default App;
