import React from 'react';

interface CurrentTimeProps {
    currentTime: string;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ currentTime }) => {
    return (
        <div className="currentTime">
            <span className="currentTimeLabel">Current Time: </span>
            <span className="currentTimeValue">{currentTime}</span>
        </div>
    );
};

export default CurrentTime;