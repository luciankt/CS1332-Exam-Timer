import React, { useState, useEffect, useRef } from 'react';
import './css/Modal.css';

interface TimerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (startTime: Date, endTime: Date) => void;
    formatDatetime: (datetime: Date) => string;
    defaultStartTime: Date;
    defaultEndTime: Date;
    defaultDuration: string;
}

const TimerModal: React.FC<TimerModalProps> = ({ isOpen, onClose, onSave, defaultStartTime, defaultEndTime, defaultDuration, formatDatetime }) => {
    const [startTime, setStartTime] = useState<Date>(defaultStartTime);
    const [endTime, setEndTime] = useState<Date>(defaultEndTime);
    const [duration, setDuration] = useState<string>(defaultDuration); // Internal to this component; not emitted
    
    const startTimeRef = useRef(startTime);
    const endTimeRef = useRef(endTime);

    useEffect(() => {
        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            setStartTime(startTimeRef.current);
            setEndTime(endTimeRef.current);
        }
        startTimeRef.current = startTime;
        endTimeRef.current = endTime;
        
    }, [startTime, endTime]);

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const updateTime = (updateType: string, newTime: HTMLInputElement["value"]) => {
        try {
            let duration;
            const [hours, minutes, seconds] = newTime.split(':');
            const newDate = new Date();
            newDate.setHours(Number(hours));
            newDate.setMinutes(Number(minutes));
            newDate.setSeconds(Number(seconds));
            newDate.setMilliseconds(0);

            if (updateType === 'start') {
                setStartTime(newDate);
                duration = new Date(endTimeRef.current.getTime() - newDate.getTime()).toISOString().substr(11, 8);
            } else {
                if (newDate.getTime() - startTimeRef.current.getTime() < 0) {
                    newDate.setDate(newDate.getDate() + 1);
                }
                setEndTime(newDate);
                duration = new Date(newDate.getTime() - startTimeRef.current.getTime()).toISOString().substr(11, 8);
            }
            setDuration(duration);
        } catch (error) {
            return;
        }
    }

    const handleSave = () => {
        onSave(startTimeRef.current, endTimeRef.current);
        onClose();
    };

    const invalidTimes = () => {
        return new Date(startTime) < new Date() && new Date(endTime) < new Date()
    }

    const invalidDuration = () => {
        return duration === '00:00:00';
    }

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content" onClick={handleModalClick}>
                        <h2>Time Settings</h2>
                        <hr />

                        <div className="input-group">
                            <label htmlFor="startTime">Start:</label>
                            <input
                                type="time"
                                id="startTime"
                                value={formatDatetime(startTime)}
                                onChange={(e) => updateTime('start', e.target.value)}
                                step="1"
                                className={`${invalidTimes() ? 'red' : 'gray'}`}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="endTime">End:</label>
                            <input
                                type="time"
                                id="endTime"
                                value={formatDatetime(endTime)}
                                onChange={(e) => updateTime('end', e.target.value)}
                                step="1"
                                className={`${invalidTimes() ? 'red' : 'gray'}`}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="endTime">Duration:</label>
                            <input
                                type="text"
                                id="duration"
                                value={duration}
                                step="1"
                                readOnly={true}
                                className={`${invalidDuration() ? 'red' : 'gray'}`}
                            />
                        </div>

                        <div>
                            {invalidTimes() && (
                                <p className="error-text">Start and end cannot both be in the past.</p>
                            )}
                            {!invalidTimes() && invalidDuration() && (
                                <p className="error-text">Start and end cannot be at the same time.</p>
                            )}
                            {!invalidTimes() && !invalidDuration() && (
                                <p className="error-text invisible">.</p>
                            )}
                        </div>

                        <div className="buttons">
                            <button className="cancelButton" onClick={onClose}>Cancel</button>
                            <button 
                                className="saveButton" 
                                onClick={handleSave} 
                                disabled={invalidDuration() || invalidTimes()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default TimerModal;