import React from 'react';
import './css/LeftPane.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Timer from './Timer';
import CurrentTime from './CurrentTime';

// Props
interface LeftPaneProps {}

// Variables
let timerDuration = 60*50;

// LeftPane component
const LeftPane: React.FC<LeftPaneProps> = (props) => {
    return (
        <div className='leftPane'>
            <div className='settingsButton'>
                <i className='fas fa-cog'></i>
            </div>
            <CurrentTime />
            <Timer timerDuration={timerDuration}/>
        </div>
    );
};

export default LeftPane;