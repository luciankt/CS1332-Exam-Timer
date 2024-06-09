import React from 'react';
import './css/LeftPane.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface LeftPaneProps {
    totalTime: number;
    timerDuration: number;
    formatTime: (time: number, publicDisplay: boolean) => string;
    active: boolean;
    reachZero: () => void;
}

const LeftPane: React.FC<LeftPaneProps> = (props) => {

    // Calculate the remaining time for the circle
    const [remainingTime, setRemainingTime] = React.useState(props.timerDuration);
    React.useEffect(() => {
        setRemainingTime(props.timerDuration);
        const interval = setInterval(() => {
            if (props.active && remainingTime > 0) {
                setRemainingTime((prevRemainingTime: number) => prevRemainingTime - 1)
            }
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.timerDuration, props.active]);
    const strokeDashoffset = (remainingTime / props.totalTime) * 1256;
    const formattedTime = props.formatTime(remainingTime, true);
    
    // Timer reaches zero
    React.useEffect(() => {
        if (remainingTime <= 0 && props.active) {
            props.reachZero();
        }
    }, [remainingTime, props]);

    return (
        <div className="timer">
            <div className="timeLeftText">Time Left</div>
            <svg viewBox="0 0 480 480">
                <circle
                    r="200"
                    cx="240"
                    cy="240"
                    className="backgroundCircle"
                    ></circle>
                <circle
                    r="200"
                    cx="240"
                    cy="240"
                    className="timerCircle"
                    style={{ strokeDashoffset }}
                ></circle>                
            </svg>
            <div className="timerText">{formattedTime}</div>
        </div>
    );
};
        
export default LeftPane;