import React, { useState, useEffect } from 'react';
import './css/LeftPane.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Timer from './Timer';
import CurrentTime from './CurrentTime';
import TimerModal from './TimerModal';

// Props
interface LeftPaneProps {}


// LeftPane component
const LeftPane: React.FC<LeftPaneProps> = (props) => {

    // Function to calculate the next full hour
    const calculateNextFullHour = (offset: number) => {
        const now = new Date();
        const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
        const nextFullHour = new Date(nextHour.getFullYear(), nextHour.getMonth(), nextHour.getDate(), nextHour.getHours(), 0, offset);
        const formattedTime = nextFullHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        return formattedTime;
    }

    // Variables
    const [duration, setDuration] = useState<number>(3000);
    const [startTime, setStartTime] = useState<string>(calculateNextFullHour(0));
    const [endTime, setEndTime] = useState<string>(calculateNextFullHour(duration));
    const [timerIsActive, activateTimer] = useState<boolean>(false);
    const [totalTime, setTotalTime] = useState<number>(3000);

    // Settings modal
    const [timerModalIsOpen, setTimerModalIsOpen] = useState(false);
    const openTimerModal = () => setTimerModalIsOpen(true);
    const closeTimerModal = () => {
        if (timerModalIsOpen) {
            setTimerModalIsOpen(false);
        }
    };

    // Set the new times when updated in settings modal
    const setNewTimes = (newStartTime: string, newEndTime: string) => {
        activateTimer(false);
        setStartTime(newStartTime);
        setEndTime(newEndTime);
        setDuration((new Date(`1970-01-01T${newEndTime}`).getTime() - new Date(`1970-01-01T${newStartTime}`).getTime()) / 1000);
        setTotalTime((new Date(`1970-01-01T${newEndTime}`).getTime() - new Date(`1970-01-01T${newStartTime}`).getTime()) / 1000);
    };

    const reachZero = () => {
        activateTimer(false);
        setTimeout(resetTimer, 5000);
        console.log('reached zero')
    }

    const resetTimer = () => {
        setDuration(3000);
        setStartTime(calculateNextFullHour(0));
        setEndTime(calculateNextFullHour(3000));
        activateTimer(false);
        setTotalTime(3000);
    }

     // Format the time in HH:MM:SS format
     const formatTime = (time: number, publicDisplay?: boolean): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (publicDisplay) {
            if (time < 3600) {
                formattedTime = formattedTime.substring(3);
            }
            formattedTime = formattedTime.replace(/^0+/, '');
        }
        return formattedTime;
    };

    // Check if the timer should be activated
    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    
            if (currentTime >= startTime && !timerIsActive) {
                activateTimer(true);
                const currentDuration = (new Date(`1970-01-01T${endTime}`).getTime() - new Date(`1970-01-01T${currentTime}`).getTime()) / 1000;
                setDuration(currentDuration);
            } else if ((timerIsActive && currentTime < startTime)) {
                activateTimer(false);
            }

            // Reset clock if duration is negative
            if (duration < 0) {
                reachZero()            
            }
        }, 1000);
    
        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startTime, endTime, timerIsActive, duration]);

    return (
        <div className='leftPane' onClick={closeTimerModal}>
            <TimerModal isOpen={timerModalIsOpen} onClose={closeTimerModal} onSave={setNewTimes} defaultStartTime={startTime} defaultEndTime={endTime} defaultDuration={formatTime(duration)} />
            <div className='settingsButton' onClick={openTimerModal}>
                <i className='fas fa-cog'></i>
            </div>
            <CurrentTime />
            <Timer totalTime={totalTime} timerDuration={duration} formatTime={formatTime} active={timerIsActive} reachZero={reachZero} />
        </div>
    );
};

export default LeftPane;