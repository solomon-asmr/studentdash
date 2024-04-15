import Dashboard from "./Components/Dashboard";
import {useEffect, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


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

        </>
    );
}

export default App;
