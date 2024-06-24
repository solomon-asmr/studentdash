import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const AddTaskModal = ({show, onHide, onAddTask}) => {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('not started');

    const handleSubmit = () => {
        if (!taskName || !dueDate || !status) {
            alert("All fields are required");
            return;
        }
        const task = {taskName, dueDate, status};
        onAddTask(task);
        setTaskName('');
        setDueDate('');
        setStatus('not started');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>הוסף משימה חדשה</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>שם משימה</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="הזן שם משימה"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>תאריך הגשה</Form.Label>
                        <Form.Control
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>סטטוס</Form.Label>
                        <Form.Control
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="not started">לא התחיל</option>
                            <option value="in progress">בתהליך</option>
                            <option value="completed">הושלם</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="secondary" onClick={handleSubmit}>
                    שמור שינויים
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTaskModal;
