import React, { useState, useEffect, useRef } from 'react';
import './css/Modal.css';

interface InstructionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (beforeText: string, afterText: string) => void;
    beforeText: string;
    afterText: string;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose, onSave, beforeText, afterText }) => {
    
    const beforeTextRef = useRef('before');
    const afterTextRef = useRef('after');

    useEffect(() => {

        beforeTextRef.current = beforeText;
        afterTextRef.current = afterText;
        
    }, [beforeText, afterText]);

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
           
            if (updateType === 'before') {
                beforeTextRef.current = newTime;
            } else {
                afterTextRef.current = newTime;
            }
        }

        catch (error) {
            return;
        }
    }

    const handleSave = () => {
        onSave(beforeTextRef.current, afterTextRef.current);
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
                            <label htmlFor="beforeText">Start:</label>
                            <input
                                type="time"
                                id="beforeText"
                                value={formatDatetime(beforeText)}
                                onChange={(e) => updateTime('start', e.target.value)}
                                step="1"
                                className={`${invalidTimes() ? 'red' : 'gray'}`}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="afterText">End:</label>
                            <input
                                type="time"
                                id="afterText"
                                value={formatDatetime(afterText)}
                                onChange={(e) => updateTime('end', e.target.value)}
                                step="1"
                                className={`${invalidTimes() ? 'red' : 'gray'}`}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="afterText">Duration:</label>
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
export default InstructionsModal;