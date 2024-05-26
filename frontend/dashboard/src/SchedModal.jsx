import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import Toggle from 'react-toggle';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-toggle/style.css';
import './SchedModal.css';
import {AddToCalendarButton} from 'add-to-calendar-button-react';

const SchedModal = ({show, onHide, data}) => {
    const taskTitle = data;

    const [isFullDay, setIsFullDay] = useState(false);
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('12:00');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    return (
        <Modal show={show} onHide={onHide}>
            <div className="custom-modal-header">
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">
                        הקדשת זמן ביומן
                    </Modal.Title>
                </Modal.Header>
            </div>

            <div className="custom-modal-body">
                <div className="toggle-container">
                    <label className="toggle-label">Full day</label>
                    <Toggle
                        defaultChecked={isFullDay}
                        onChange={() => setIsFullDay(!isFullDay)}
                        icons={{
                            checked: <span className="toggle-inner-label">ON</span>,
                            unchecked: <span className="toggle-inner-label">OFF</span>
                        }}
                        aria-label="Full Day Toggle"
                        className="custom-toggle"
                    />
                </div>

                <div className="date-time-container">
                    <div className="date-time-picker">
                        <label className="time-label">Start</label>
                        <div className="input-group">
                            <i className="far fa-calendar-alt"></i>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="date-picker-input"
                            />
                        </div>
                        <div className="input-group">
                            <i className="far fa-clock"></i>
                            <TimePicker
                                className="time-picker-input"
                                onChange={setStartTime}
                                value={startTime}
                                disabled={isFullDay}
                                disableClock
                                format="HH:mm"
                            />
                        </div>
                    </div>

                    <div className="date-time-picker">
                        <label className="time-label">End</label>
                        <div className="input-group">
                            <i className="far fa-calendar-alt"></i>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="date-picker-input"
                            />
                        </div>
                        <div className="input-group">
                            <i className="far fa-clock"></i>
                            <TimePicker
                                className="time-picker-input"
                                onChange={setEndTime}
                                value={endTime}
                                disabled={isFullDay}
                                disableClock
                                format="HH:mm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-modal-footer">
                <Modal.Footer>
                    <AddToCalendarButton
                        name={`Work on ${taskTitle}`}
                        options={['Apple', 'Google']}
                        startDate={formatDate(startDate)}
                        endDate={formatDate(endDate)}
                        startTime={isFullDay ? '' : startTime}
                        endTime={isFullDay ? '' : endTime}
                        buttonStyle="date"
                    ></AddToCalendarButton>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default SchedModal;
