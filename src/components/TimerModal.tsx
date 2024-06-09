import React, { useState, useEffect, useRef } from 'react';
import './css/TimerModal.css';

interface TimerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (startTime: string, endTime: string) => void;
    defaultStartTime: string;
    defaultEndTime: string;
    defaultDuration: string;
}

const TimerModal: React.FC<TimerModalProps> = ({ isOpen, onClose, onSave, defaultStartTime, defaultEndTime, defaultDuration }) => {
    const [startTime, setStartTime] = useState<string>(defaultStartTime);
    const [endTime, setEndTime] = useState<string>(defaultEndTime);
    const [duration, setDuration] = useState<string>(defaultDuration);
    
    const startTimeRef = useRef(startTime);
    const endTimeRef = useRef(endTime);

    useEffect(() => {
        startTimeRef.current = startTime;
        endTimeRef.current = endTime;
    }, [startTime, endTime]);

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener when the component is unmounted
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const updateTime = (updateType: string, newTime: HTMLInputElement["value"]) => {
        try {
            let start;
            let end;
            if (updateType === 'start') {
                setStartTime(newTime);
                start = new Date(`1970-01-01T${newTime}`);
                end = new Date(`1970-01-01T${endTime}`);
            } else {
                setEndTime(newTime);
                start = new Date(`1970-01-01T${startTime}`);
                end = new Date(`1970-01-01T${newTime}`);
            }

            const diff = end.getTime() - start.getTime();
            const duration = new Date(diff).toISOString().substring(11,19);
            setDuration(duration);
        } catch (error) {
            return;
        }
    }

    const handleSave = () => {
        onSave(startTimeRef.current, endTimeRef.current);
        onClose();
    };


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
                                value={startTime}
                                onChange={(e) => updateTime('start', e.target.value)}
                                step="1"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="endTime">End:</label>
                            <input
                                type="time"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => updateTime('end', e.target.value)}
                                step="1"
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
                                className={`${duration === '00:00:00' ? 'red' : 'gray'}`}
                            />
                        </div>
                        <div className="buttons">
                            <button className="cancelButton" onClick={onClose}>Cancel</button>
                            <button className="saveButton" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default TimerModal;