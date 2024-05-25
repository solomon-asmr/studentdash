import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const SchedModal = ({show, onHide, data}) => {
    const taskTitle = data;

    const handleAddToCalendar = () => {
        const eventTitle = encodeURIComponent(`Dedicated time for ${taskTitle}`);
        const eventStartDate = encodeURIComponent('2024-06-01T10:00:00'); // Format: YYYY-MM-DDTHH:mm:ss
        const eventEndDate = encodeURIComponent('2024-06-01T12:00:00'); // Format: YYYY-MM-DDTHH:mm:ss

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventStartDate}/${eventEndDate}`;

        window.location.href = calendarUrl;
    };

    const CustomModalHeader = styled(Modal.Header)`
        border-bottom: none !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
    `;

    const CustomModalFooter = styled(Modal.Footer)`
        border-top: none !important;
        display: flex !important;
        justify-content: center !important;
        width: 100% !important;
    `;

    return (
        <Modal show={show} onHide={onHide}>
            <CustomModalHeader closeButton>
                <Modal.Title style={{textAlign: 'center', width: '100%'}}>
                    <b>הקדשת זמן ביומן</b>
                </Modal.Title>
            </CustomModalHeader>

            <Modal.Body>
                HELLO
            </Modal.Body>

            <CustomModalFooter>
                <Button variant="secondary" onClick={handleAddToCalendar}>
                    אישור
                </Button>
            </CustomModalFooter>
        </Modal>
    );
};

export default SchedModal;
