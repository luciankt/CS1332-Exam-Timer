import React, { useState, useEffect } from 'react';
import './css/RightPane.css';
import Instructions from './Instructions';
import InstructionsModal from './InstructionsModal';

interface RightPaneProps {
    examActive: boolean;
}

const DEFAULT_BEFORE_INSTRUCTIONS = `DO NOT OPEN THE EXAM YET.\n\nSCAN YOUR BUZZCARD, OR ELSE YOU MAY RECEIVE A ZERO.\n\nRAISE YOUR HAND TO BE ESCORTED TO THE RESTROOM.`
const DEFAULT_AFTER_INSTRUCTIONS = `RAISE YOUR HAND TO BE ESCORTED TO THE RESTROOM.`

const RightPane: React.FC<RightPaneProps> = (props) => {

    const [beforeInstructions, setBeforeInstructions] = useState(DEFAULT_BEFORE_INSTRUCTIONS);
    const [afterInstructions, setAfterInstructions] = useState(DEFAULT_AFTER_INSTRUCTIONS);
    const [displayedInstructions, setDisplayedInstructions] = useState(beforeInstructions);
    const [examActive, setExamActive] = useState(props.examActive);

    // Update instructions state when props.instructions changes
    useEffect(() => {
        setExamActive(props.examActive);
        setDisplayedInstructions(examActive ? afterInstructions : beforeInstructions);
    }, [props.examActive, examActive, beforeInstructions, afterInstructions]);

    // Settings modal
    const [instructionsModalIsOpen, setInstructionsModalIsOpen] = useState(false); // Whether the settings modal is open
    const openInstructionsModal = () => setInstructionsModalIsOpen(true);
    const closeInstructionsModal = () => {
        if (instructionsModalIsOpen) {
            setInstructionsModalIsOpen(false);
        }
    };

    // Set new instructions from modal
    const setNewInstructions = (newBeforeText: string, newAfterText: string) => {
        setBeforeInstructions(newBeforeText);
        setAfterInstructions(newAfterText);
    }

    // Set new instructions from editing display panel
    const setNewInstructionsFromDisplay = (newInstructions: string) => {
        if (examActive) {
            setAfterInstructions(newInstructions);
        } else {
            setBeforeInstructions(newInstructions);
        }
    }    

    return (
        <div className='rightPane' onClick={closeInstructionsModal}>
            <InstructionsModal isOpen={instructionsModalIsOpen} onClose={closeInstructionsModal} onSave={setNewInstructions} beforeText={beforeInstructions} afterText={afterInstructions} />
            <div className='instructionsSettingsButton' onClick={openInstructionsModal}>
                <i className="fa-solid fa-pencil"></i>
            </div>
            <h1>Instructions and Clarifications</h1>
            <Instructions instructions={displayedInstructions} onInstructionsChange={setNewInstructionsFromDisplay} />
        </div>
    );
};

export default RightPane;