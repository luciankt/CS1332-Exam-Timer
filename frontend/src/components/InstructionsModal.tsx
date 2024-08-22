import React, { useEffect } from 'react';
import './css/Modal.css';

interface InstructionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (beforeText: string, afterText: string) => void;
    beforeText: string;
    afterText: string;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose, onSave, beforeText, afterText }) => {
    
    const [beforeTextRef, setBeforeText] = React.useState(beforeText);
    const [afterTextRef, setAfterText] = React.useState(afterText);

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

    // Reset text areas when modal is closed
    useEffect(() => {
        if (!isOpen) {
            setBeforeText(beforeText);
            setAfterText(afterText);
        }
    }, [isOpen, beforeText, afterText]);

    const updateText = (updateType: string, newText: HTMLInputElement["value"]) => {
        if (updateType === 'before') {
            setBeforeText(newText);
        }
        else {
            setAfterText(newText);
        }
    }

    const handleSave = () => {
        onSave(beforeTextRef, afterTextRef);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content larger-modal" onClick={handleModalClick}>
                        <h2>Edit Instructions</h2>
                        <hr />

                        <div className="input-group-large">
                            <label htmlFor="beforeText">Before Exam:</label>
                            <textarea
                                id="beforeText"
                                value={beforeTextRef}
                                onChange={(e) => updateText('before', e.target.value)}
                            />
                        </div>

                        <div className="input-group-large">
                            <label htmlFor="afterText">During Exam:</label>
                            <textarea
                                id="afterText"
                                value={afterTextRef}
                                onChange={(e) => updateText('after', e.target.value)}
                            />
                        </div>

                    
                        <div className="buttons">
                            <button className="cancelButton" onClick={onClose}>Cancel</button>
                            <button 
                                className="saveButton" 
                                onClick={handleSave} 
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