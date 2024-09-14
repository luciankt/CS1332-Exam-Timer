import React, { useState, useEffect } from 'react';
import './css/RightPane.css';
import Instructions from './Instructions';
import InstructionsModal from './InstructionsModal';
import axios from 'axios';

interface RightPaneProps {
    examActive: boolean;
    examEnded: boolean;
}

const RightPane: React.FC<RightPaneProps> = (props) => {

    const [beforeInstructions, setBeforeInstructions] = useState('');
    const [duringInstructions, setDuringInstructions] = useState('');
    const [afterInstructions, setAfterInstructions] = useState('');
    const [displayedInstructions, setDisplayedInstructions] = useState(beforeInstructions);

    // Update instructions state when props.instructions changes
    useEffect(() => {
        axios.get('https://34.123.186.46:3000/messages')
        .then(response => {
            const instructions = response.data;
            setBeforeInstructions(instructions.before);
            setDuringInstructions(instructions.before);
            setAfterInstructions(instructions.after);
            setDisplayedInstructions(props.examActive ? instructions.during : props.examEnded ? instructions.after : instructions.before);
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    }, [props.examActive, props.examEnded, beforeInstructions, duringInstructions, afterInstructions]);

    // Settings modal
    const [instructionsModalIsOpen, setInstructionsModalIsOpen] = useState(false); // Whether the settings modal is open
    const openInstructionsModal = () => setInstructionsModalIsOpen(true);
    const closeInstructionsModal = () => {
        if (instructionsModalIsOpen) {
            setInstructionsModalIsOpen(false);
        }
    };

    // Set new instructions from modal
    const setNewInstructions = (newBeforeText: string, newDuringText: string) => {
        setBeforeInstructions(newBeforeText);
        setDuringInstructions(newDuringText);
    }

    // Set new instructions from editing display panel
    const setNewInstructionsFromDisplay = (newInstructions: string) => {
        if (props.examActive) {
            setDuringInstructions(newInstructions);
        } else {
            setBeforeInstructions(newInstructions);
        }
    }    

    return (
        <div className='rightPane' onClick={closeInstructionsModal}>
            <InstructionsModal isOpen={instructionsModalIsOpen} onClose={closeInstructionsModal} onSave={setNewInstructions} beforeText={beforeInstructions} duringText={duringInstructions} />
            <div className='instructionsSettingsButton' onClick={openInstructionsModal}>
                <i className="fa-solid fa-pencil"></i>
            </div>
            <h1>Instructions and Clarifications</h1>
            <Instructions instructions={displayedInstructions} onInstructionsChange={setNewInstructionsFromDisplay} examActive={props.examActive} />
        </div>
    );
};

export default RightPane;