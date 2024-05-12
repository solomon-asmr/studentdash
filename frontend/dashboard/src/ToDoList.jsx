// ToDoList.jsx
import React, { useState } from 'react';
import { Container, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import NavigationBar from "./NavigationBar";
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
            <Container fluid className="student-dashboard-container" style={{ backgroundColor: '#1f4e79' }}>
                <NavigationBar/>
                <Container className="to-do-list-content">
                    <h1>הוספת מסימות אישית</h1>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="תכניס מסימות"
                            value={newTask}
                            onChange={handleInputChange}
                        />
                        <Button variant="success" onClick={addTask} className="add-button">מוסיף</Button>
                    </InputGroup>
                    <ListGroup>
                        {tasks.map((task, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <span className="text">{task}</span>
                                <div>
                                    <Button variant="danger" onClick={() => deleteTask(index)} className="delete-button">תמחוק</Button>
                                    <Button variant="info" onClick={() => moveTaskUp(index)} className="move-button">⬆️</Button>
                                    <Button variant="info" onClick={() => moveTaskDown(index)} className="move-button">⬇️</Button>
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
