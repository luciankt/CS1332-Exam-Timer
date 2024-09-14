import React, { useState, useEffect } from 'react';
import SyncButton from './SyncButton';
import axios from 'axios';

interface InstructionsProps {
    instructions: string;
    examActive: boolean;
    onInstructionsChange: (instructions: string) => void;
}

const Instructions: React.FC<InstructionsProps> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [syncInProgress, setSyncInProgress] = useState(false);
    const [instructions, setInstructions] = useState(props.instructions);

    // Update instructions state when props.instructions changes
    useEffect(() => {
        setInstructions(props.instructions);
    }, [props.instructions]);

    // Open edit mode
    function openEdit() {
        if (!editMode && !syncInProgress) {
            setEditMode(true);
        }
    }

    // Close edit mode and save changes
    function closeEdit() {
        if (editMode && !syncInProgress) {
            setEditMode(false);
        }
        props.onInstructionsChange(instructions);
    }

    // Modify the text and enter edit mode
    function edit(value: string) {
        setInstructions(value);
        if (!editMode) {
            setEditMode(true);
        }
    }

    // Sync the changes to all sections and exit edit mode
    function syncEdit() {
        setInstructions(instructions);
        setSyncInProgress(true);

        // Send the updated instructions to the backend
        axios.post('https://34.123.186.46:3000/messages', {
            newBeforeInstructionsText: props.examActive ? undefined : instructions,
            newDuringInstructionsText: props.examActive ? instructions : undefined
        })
        .then(response => {
            console.log('Message updated successfully:', response.data);
        })
        .catch(error => {
            console.error('There was an error updating the message!', error);
        });

        setTimeout(() => {
            setSyncInProgress(false);
            setEditMode(false);
        }, 500);
    }

    return (
        <div className="instructions">
            <textarea className={editMode ? 'edit' : ''} spellCheck={false} onFocus={openEdit} readOnly={syncInProgress} onChange={(e) => edit(e.target.value)} value={instructions} onBlur={closeEdit} />
            {(editMode || syncInProgress) && <SyncButton onSync={syncEdit} syncInProgress={syncInProgress} />}
        </div>
    );
};

export default Instructions;