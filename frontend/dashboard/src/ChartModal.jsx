import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartModal = ({show, onHide, data}) => {
    if (!data) {
        return null;
    }

    const chartData = {
        labels: ['Submitted', 'Not Submitted'],
        datasets: [
            {
                data: [data.submitted, data.notSubmitted],
                backgroundColor: ['#5ae1c3', '#ffbe00'],
                hoverBackgroundColor: ['#5ae1c3', '#ffbe00'],
            },
        ],
    };

    const CustomModalHeader = styled(Modal.Header)`
        border-bottom: none !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    `;

    const CustomModalFooter = styled(Modal.Footer)`
        border-top: none !important;
        display: flex !important;
        justify-content: center !important;
    `;

    return (
        <Modal show={show} onHide={onHide}>
            <CustomModalHeader>
                <Modal.Title><b>אחוז משלימי המטלה</b></Modal.Title>
            </CustomModalHeader>
            <Modal.Body>
                <Pie data={chartData}/>
            </Modal.Body>
            <CustomModalFooter>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </CustomModalFooter>
        </Modal>
    );
};

export default ChartModal;
