import React from 'react';
import './css/RightPane.css';
import Instructions from './Instructions';

interface RightPaneProps {}

const RightPane: React.FC<RightPaneProps> = (props) => {

    return (
        <div className='rightPane'>
            <h1>Instructions and Clarifications</h1>
            <Instructions />
        </div>
    );
};

export default RightPane;