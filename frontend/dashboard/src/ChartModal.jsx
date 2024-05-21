import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Modal.Title><b>אחוז משלימי המטלה</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Pie data={chartData}/>
            </Modal.Body>
            <Modal.Footer closeButton>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChartModal;
