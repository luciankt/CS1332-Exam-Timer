import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface StartEndDisplayProps {
    startTime: Date;
    endTime: Date;
    formatDatetime: (datetime: Date) => string;
}


const StartEndDisplay: React.FC<StartEndDisplayProps> = ({startTime, endTime, formatDatetime}) => {
    
    // Check if the start or end times have seconds
    const hasSeconds = () => {
        return startTime.getSeconds() !== 0 || endTime.getSeconds() !== 0;
    }

    // Convert to 12 hour time and truncate seconds if 0
    const formatStartEndTime = (time: string) => {
        const [hours, minutes, seconds] = time.split(':');
        let period = 'AM';
        let hour = Number(hours);
        if (hour >= 12) {
            period = 'PM';
            if (hour > 12) {
                hour -= 12;
            }
        }
        hour = hour === 0 ? 12 : hour;
        let formattedTime = `${hour}:${minutes}`;
        if (hasSeconds()) {
            formattedTime += `:${seconds}`;
        }
        formattedTime += ` ${period}`;
        return formattedTime;
    }

    return (
        <div className="startEndTimes">
            <div className="startEndTime">
                <span className="currentTimeLabel">Start: </span>
                <span className="currentTimeValue">{formatStartEndTime(formatDatetime(startTime))}</span>
            </div>
            <div className="startEndTime">
                <span className="currentTimeLabel">End: </span>
                <span className="currentTimeValue">{formatStartEndTime(formatDatetime(endTime))}</span>
            </div>
        </div>
    );
};
        
export default StartEndDisplay;