// ToDoList.jsx
import React, { useState } from 'react';
import { Container, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import './todolist.css'; // Make sure to import your CSS file

function ToDoList() {
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (newTask) {
            setTasks([...tasks, newTask]);
            setNewTask('');
        }
    };

    const deleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const moveTaskUp = (index) => {
        if (index > 0) {
            const newTasks = [...tasks];
            [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
            setTasks(newTasks);
        }
    };

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const newTasks = [...tasks];
            [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
            setTasks(newTasks);
        }
    };

    return (
        <div className="my-todo-plugin"> {/* Apply the unique class to the outermost div */}
            <Container fluid className="student-dashboard-container">

                <Container className="to-do-list-content">
                    <h3 style={{color:"black", fontWeight:"bolder"}}>הוספת מסימות אישית</h3>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="תכניס מסימות"
                            value={newTask}
                            onChange={handleInputChange}
                        />
                        <Button variant="success" onClick={addTask} className="add-button">➕</Button>
                    </InputGroup>
                    <ListGroup>
                        {tasks.map((task, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <span className="text">{task}</span>
                                <div>
                                    <Button variant="danger" onClick={() => deleteTask(index)}
                                            className="delete-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                             width="24px" fill="#5f6368">
                                            <path
                                                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                        </svg>
                                    </Button>
                                    <Button variant="info" onClick={() => moveTaskUp(index)}
                                            className="move-button">⬆️</Button>
                                    <Button variant="info" onClick={() => moveTaskDown(index)}
                                            className="move-button">⬇️</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Container>
            </Container>
        </div>
    );
}

export default ToDoList;
