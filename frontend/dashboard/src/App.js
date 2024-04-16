import Dashboard from "./Components/Dashboard";
import {useEffect, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

    const [studentInfo, setStudentInfo] = useState({});
    const [courses, setCourses] = useState([]);


    // Function to fetch user data from the database
    const fetchUserData = async() => {
        try {
            const response = await axios.get('/local/studentdash/ajax/fetch_user_data.php');
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

            <Dashboard studentInfo={studentInfo} courses={courses}/>

        </>
    );
}

export default App;
