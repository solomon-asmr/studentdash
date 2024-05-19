import React, {useEffect, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectCard from './SubjectCard';
import CourseDetails from './CourseDetails';
import NavigationBar from "./NavigationBar";
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
        <Container style={{backgroundColor: '#1f4e79'}}>
            <Router basename={'/local/studentdash/dashboard.php'}>
                <NavigationBar studentInfo={studentInfo}/>
                    <Routes>
                        {/*<Route path="/" element={<NavigationBar studentInfo={studentInfo}/>}/>*/}
                        <Route path="/" element={isLoading ? <Spinner animation="border"/> : studentInfo ?
                            <SubjectCard studentInfo={studentInfo}/> : <div>No data available</div>}/>
                        <Route path="/details/:courseId" element={<CourseDetails studentInfo={studentInfo} />} />
                        <Route path="/back"
                               element={studentInfo ? <SubjectCard studentInfo={studentInfo}/> : <div>No data available</div>}/>
                        <Route path="/ToDo" element={<ToDoList studentInfo={studentInfo}/>}/>
                    </Routes>
            </Router>
        </Container>
    );
}

export default App;
