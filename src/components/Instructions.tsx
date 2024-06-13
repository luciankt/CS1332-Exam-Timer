import React from 'react';
import SyncButton from './SyncButton';

interface InstructionsProps {}

const Instructions: React.FC<InstructionsProps> = (props) => {

    const defaultInstructions = `DO NOT OPEN THE EXAM YET.\n\nSCAN YOUR BUZZCARD, OR ELSE YOU MAY RECEIVE A ZERO.\n\nRAISE YOUR HAND TO BE ESCORTED TO THE RESTROOM.`

    const [editMode, setEditMode] = React.useState(false);
    const [syncInProgress, setSyncInProgress] = React.useState(false);
    const [instructions, setInstructions] = React.useState(defaultInstructions);

    function openEdit() {
        if (!editMode && !syncInProgress) {
            setEditMode(true);
        }
    }

    function closeEdit() {
        if (editMode && !syncInProgress) {
            setEditMode(false);
        }
    }

    function edit(value: string) {
        setInstructions(value);
        if (!editMode) {
            setEditMode(true);
        }
    }

    function syncEdit() {
        setInstructions(instructions);
        setSyncInProgress(true);
        setTimeout(() => {
            setSyncInProgress(false);
            setEditMode(false);
        }, 5000);
    }

    return (
        <div className="instructions">
            <textarea className={editMode ? 'edit' : ''} spellCheck={false} onFocus={openEdit} readOnly={syncInProgress} onChange={(e) => edit(e.target.value)} value={instructions} onBlur={closeEdit} />
            {(editMode || syncInProgress) && <SyncButton onSync={syncEdit} syncInProgress={syncInProgress} />}
        </div>
    );
};

export default Instructions;