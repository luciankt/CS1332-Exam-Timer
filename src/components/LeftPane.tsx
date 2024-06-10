import React, { useState, useEffect } from 'react';
import './css/LeftPane.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Timer from './Timer';
import CurrentTime from './CurrentTime';
import TimerModal from './TimerModal';
import StartEndDisplay from './StartEndDisplay';

// Props
interface LeftPaneProps {}

// LeftPane component
const LeftPane: React.FC<LeftPaneProps> = (props) => {

    // Calculate current time in seconds
    const calculateCurrentTime = () => {
        const now = new Date();
        return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    }

    // Recalculate current time every second
    React.useEffect(() => {
        const interval = setInterval(() => {
        setCurrentTime(calculateCurrentTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Function to calculate the next half hour
    const calculateNextHalfHour = (offset: number) => {
        const now = new Date();
        const nextHalfHour = new Date(Math.ceil(now.getTime() / (1000 * 60 * 30)) * (1000 * 60 * 30));
        nextHalfHour.setSeconds(offset);
        return nextHalfHour;
    }

    // Variables
    const defaultDuration = 3000; // Default duration of the timer in seconds
    const [startTime, setStartTime] = useState<Date>(calculateNextHalfHour(0)); // The start time
    const [endTime, setEndTime] = useState<Date>(calculateNextHalfHour(defaultDuration)); // The end time
    const [duration, setDuration] = useState<number>(defaultDuration); // The total time from startTime to endTime
    const [timeLeft, setTimeLeft] = useState<number>(defaultDuration); // The time left from now
    const [timerIsActive, activateTimer] = useState<boolean>(false); // Whether the timer is active
    const [timerModalIsOpen, setTimerModalIsOpen] = useState(false); // Whether the settings modal is open
    const [currentTime, setCurrentTime] = React.useState(calculateCurrentTime());

    // Settings modal
    const openTimerModal = () => setTimerModalIsOpen(true);
    const closeTimerModal = () => {
        if (timerModalIsOpen) {
            setTimerModalIsOpen(false);
        }
    };

    // Set the new times when updated in settings modal
    const setNewTimes = (newStartTime: Date, newEndTime: Date) => {
        let time = Math.floor((newEndTime.getTime() - newStartTime.getTime()) / 1000);

        // Update the times
        setStartTime(newStartTime);
        setEndTime(newEndTime);
        setDuration(time);
    };

    const reachZero = () => {
        activateTimer(false);
        setTimeout(resetTimer, 2500);
    }

    // Reset the timer to default values
    const resetTimer = () => {
        activateTimer(true);
        setNewTimes(calculateNextHalfHour(0), calculateNextHalfHour(defaultDuration));
    }

    // Format Date object to HH:MM:SS in 24 hour time
    const formatDatetime = (datetime: Date): string => {
        return datetime.toLocaleTimeString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, hour12: false });
    };
    
    // Convert seconds to HH:MM:SS
    const secondsToHHMMSS = (seconds: number, publicDisplay?: boolean) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        let time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        if (publicDisplay) {
            time = time.replace(/^00:/, '').replace(/^0/, '');
        }
        return time;
    }

    // Convert seconds to 12 hour time with AM/PM
    const secondsTo12HR = (seconds: number) => {
        const hours = Math.floor(seconds / 3600) % 12 || 12;
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const period = hours >= 12 ? 'PM' : 'AM';
        let time = `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')} ${period}`;
        return time;
    }

    useEffect(() => {
        const now = new Date();
        const currentDuration = (endTime.getTime() - now.getTime() + 1) / 1000;

        // Check if the timer should be active and update the time left
        if (now >= startTime) {
            activateTimer(true);
            setTimeLeft(currentDuration);
        }

        // Make timer inactive and display total time
        else {
            activateTimer(false);
            setTimeLeft(duration);
        }

        // Check if the timer has reached zero
        if (currentDuration <= 0) {
            reachZero();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime]); 

    return (
        <div className='leftPane' onClick={closeTimerModal}>
            <TimerModal isOpen={timerModalIsOpen} onClose={closeTimerModal} onSave={setNewTimes} defaultStartTime={startTime} defaultEndTime={endTime} defaultDuration={secondsToHHMMSS(timeLeft)} formatDatetime={formatDatetime} />
            <div className='settingsButton' onClick={openTimerModal}>
                <i className='fas fa-cog'></i>
            </div>
            <CurrentTime currentTime={secondsTo12HR(currentTime)} />
            {timeLeft > 0 && (
                <Timer duration={duration} timeLeft={timeLeft} secondsToHHMMSS={secondsToHHMMSS} active={timerIsActive} reachZero={reachZero} />
            )}
            {timeLeft <= 0 && (
                <h1 style={{ color: 'pink' }}>Time is up!</h1>
            )}
            <StartEndDisplay startTime={startTime} endTime={endTime} formatDatetime={formatDatetime} />
        </div>
    );
};

export default LeftPane;