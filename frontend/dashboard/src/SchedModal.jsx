import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const SchedModal = ({show, onHide, data}) => {

    const taskTitle = data;

    const handleAddToCalendar = (title, start, end) => {
        const eventTitle = encodeURIComponent(`Dedicated time for ${taskTitle}`);
        const eventStartDate = encodeURIComponent('2024-06-01T10:00:00'); // Format: YYYY-MM-DDTHH:mm:ss
        const eventEndDate = encodeURIComponent('2024-06-01T12:00:00'); // Format: YYYY-MM-DDTHH:mm:ss

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventStartDate}/${eventEndDate}`;

        window.location.href = calendarUrl;
    };


    return (
        <Modal show={show} onHide={onHide}>

            <Modal.Header closeButton>
                <Modal.Title><b>הקדשת זמן ביומן</b></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                HELLO
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleAddToCalendar}>
                    אישור
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SchedModal;
