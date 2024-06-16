import React, { useState } from 'react';
import './css/RightPane.css';
import Instructions from './Instructions';
import InstructionsModal from './InstructionsModal';

interface RightPaneProps {}

const defaultInstructions = `DO NOT OPEN THE EXAM YET.\n\nSCAN YOUR BUZZCARD, OR ELSE YOU MAY RECEIVE A ZERO.\n\nRAISE YOUR HAND TO BE ESCORTED TO THE RESTROOM.`

const RightPane: React.FC<RightPaneProps> = (props) => {

    const [instructions, setInstructions] = useState(defaultInstructions);
    
    // Settings modal
    const [instructionsModalIsOpen, setInstructionsModalIsOpen] = useState(false); // Whether the settings modal is open
    const openInstructionsModal = () => setInstructionsModalIsOpen(true);
    const closeInstructionsModal = () => {
        if (instructionsModalIsOpen) {
            setInstructionsModalIsOpen(false);
        }
    };

    // Set new instructions
    const setNewInstructions = (newInstructions: string) => {
        console.log(newInstructions);
    }

    return (
        <div className='rightPane'>
            <InstructionsModal isOpen={instructionsModalIsOpen} onClose={closeInstructionsModal} onSave={setNewInstructions} beforeText={instructions} afterText={instructions} />
            <div className='instructionsSettingsButton' onClick={openInstructionsModal}>
                <i className="fa-solid fa-pencil"></i>
            </div>
            <h1>Instructions and Clarifications</h1>
            <Instructions instructions={instructions} onInstructionsChange={setInstructions} />
        </div>
    );
};

export default RightPane;