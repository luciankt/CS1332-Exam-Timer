import React from 'react';
import './css/LeftPane.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface LeftPaneProps {
  timerDuration: number;
}

const LeftPane: React.FC<LeftPaneProps> = (props) => {

    // Calculate the remaining time for the circle
    const [remainingTime, setRemainingTime] = React.useState(props.timerDuration);
    React.useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime: number) => prevRemainingTime - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const strokeDashoffset = (remainingTime / props.timerDuration) * 1256;
    
    // Format the time in HH:MM:SS format
    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (time < 3600) {
            formattedTime = formattedTime.substring(3);
            }
        formattedTime = formattedTime.replace(/^0+/, '');
        return formattedTime;
    };
    const formattedTime = formatTime(remainingTime);

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