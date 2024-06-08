import React from 'react';

interface CurrentTimeProps {}

const CurrentTime: React.FC<CurrentTimeProps> = () => {
    // Define the currentTime state variable
    const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());

    // Update the current time every second
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="currentTime">
            <span className="currentTimeLabel">Current Time: </span>
            <span className="currentTimeValue">{currentTime}</span>
        </div>
    );
};

export default CurrentTime;