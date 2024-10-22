import React, { useState, useEffect } from 'react';
import './css/RightPane.css';
import Instructions from './Instructions';
import InstructionsModal from './InstructionsModal';
import axios from 'axios';
import config from '../config.json';

interface RightPaneProps {
    examActive: boolean;
    examEnded: boolean;
    passcode: string;
    ip: string;
}

const RightPane: React.FC<RightPaneProps> = (props) => {

    const [beforeInstructions, setBeforeInstructions] = useState('');
    const [duringInstructions, setDuringInstructions] = useState('');
    const [afterInstructions, setAfterInstructions] = useState('');
    const [displayedInstructions, setDisplayedInstructions] = useState(beforeInstructions);

    // Update instructions state when props.instructions changes or fetched
    useEffect(() => {
        // console.log('Fetching instructions for passcode', props.passcode);
        const fetchInstructions = (force: boolean) => {
            axios.get(`${config.ip}/messages`, {
                params: {
                    passcode: props.passcode
                }
            })
            .then(response => {
                    // console.log('Fetched instructions:', response.data);
                    const instructions = response.data;
                    let changed = false;
                    const currTime = new Date().getTime();

                    if (force) {
                        changed = true;
                        setBeforeInstructions(instructions.before);
                        setDuringInstructions(instructions.during);
                        setAfterInstructions(instructions.after);
                    } else {
                        if (beforeInstructions === '' || (currTime - instructions.lastChange < 15000)) {
                            setBeforeInstructions(instructions.before);
                            changed = true;
                        }
                        if (duringInstructions === '' || (currTime - instructions.lastChange < 15000)) {
                            setDuringInstructions(instructions.during);
                            changed = true;
                        }
                        if (afterInstructions === '' || (currTime - instructions.lastChange < 15000)) {
                            setAfterInstructions(instructions.after);
                            changed = true;
                        }
                    }
                    if (changed) {
                        console.log('Instructions changed, updating display');
                        setDisplayedInstructions(props.examActive ? instructions.during : props.examEnded ? instructions.after : instructions.before);
                    }
                })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
        };

        // Fetch instructions immediately
        fetchInstructions(true);

        // Set up interval to fetch instructions every 15 seconds
        const intervalId = setInterval(fetchInstructions, 15000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [props.examActive, props.examEnded, beforeInstructions, duringInstructions, afterInstructions, props.passcode, props.ip]);

    // Change displayed instructions if exam starts or ends
    useEffect(() => {
        setDisplayedInstructions(props.examActive ? duringInstructions : props.examEnded ? afterInstructions : beforeInstructions);
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

        // Send the updated instructions to the backend
        axios.post(`${config.ip}/messages`, {
            passcode: props.passcode,
            newBeforeInstructionsText: newBeforeText,
            newDuringInstructionsText: newDuringText
        })
        .then(response => {
            console.log('Message updated successfully:', response.data);
        })
        .catch(error => {
            console.error('There was an error updating the message!', error);
        });
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
            <Instructions instructions={displayedInstructions} onInstructionsChange={setNewInstructionsFromDisplay} examActive={props.examActive} passcode={props.passcode} ip={config.ip} />
        </div>
    );
};

export default RightPane;