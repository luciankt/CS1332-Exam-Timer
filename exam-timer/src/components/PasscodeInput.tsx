import React, { useState } from 'react';
import './css/PasscodeInput.css';

interface PasscodeInputProps {
    onPasscodeSubmit: (passcode: string) => void;
}

const PasscodeInput: React.FC<PasscodeInputProps> = ({ onPasscodeSubmit }) => {
    const [passcode, setPasscode] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasscode(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (passcode.length > 0) {
            onPasscodeSubmit(passcode);
        } else {
            const feedback = document.getElementById('feedback') as HTMLParagraphElement;
            feedback.innerText = 'Please enter a sync code.';
        }
    };

    return (
        <div>
            <form className="passcode-form" onSubmit={handleSubmit}>
                <label htmlFor="passcode">Enter Sync Code:</label>
                <input
                    id="passcode"
                    value={passcode}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
                <p className="error" id="feedback"></p>
            </form>
            <p>This synchronizes exam instructions across devices. Timers are not synced.<br />If you are proctoring multiple sections of the same exam, they should all use the same sync code.</p>
        </div>
    );
};

export default PasscodeInput;