import React from 'react';
import './css/LeftPane.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface LeftPaneProps {
    duration: number;
    timeLeft: number;
    active: boolean;
    examEnded: boolean;
    secondsToHHMMSS: (seconds: number, publicDisplay?: boolean) => string;
    reachZero: () => void;
}

const LeftPane: React.FC<LeftPaneProps> = (props) => {

    // Update circle graphic as timeLeft updates
    const strokeDashoffset = ((props.timeLeft - 1) / props.duration) * 1256;
    
    // Timer reaches zero
    React.useEffect(() => {
        if (props.timeLeft <= 0 && props.active) {
            props.reachZero();
        }
    }, [props]);

    return (
        <>
            <div className="timer">
                {(!props.examEnded) && <div className="timeLeftText">Time Left</div> }
                {(props.examEnded) && <div className="timeLeftText examCompleteText">Exam Complete!</div> }
                <svg viewBox="0 0 480 480">
                    <circle
                        r="200"
                        cx="240"
                        cy="240"
                        className={`backgroundCircle ${props.examEnded ? 'examEndedTimer' : ''}`}
                    ></circle>
                    {props.active && (
                        <circle
                            r="200"
                            cx="240"
                            cy="240"
                            className="timerCircle"
                            style={{ strokeDashoffset }}
                        ></circle>                
                    )}
                </svg>
                {(!props.examEnded) && <div className="timerText">{props.secondsToHHMMSS(props.timeLeft, true)}</div> }
            </div>
        </>
    );
};
        
export default LeftPane;