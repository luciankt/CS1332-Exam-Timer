import React from 'react';
import './css/RightPane.css';

interface RightPaneProps {}

const instructions = `Sed ut eros id quam finibus tincidunt. Sed vitae eros eget eros congue pretium. Donec vel ligula sed sapien mollis varius. Nullam non urna ac orci varius fermentum. Donec et nibh sit amet nibh dictum ullamcorper. Nullam laoreet, orci ac fermentum hendrerit, augue nunc luctus quam, sit amet hendrerit lorem magna ac arcu. Sed id enim vitae sem bibendum porta.`

const RightPane: React.FC<RightPaneProps> = (props) => {
    // Implement the component logic here
    return (
        <div className='rightPane'>
            <h1>Instructions and Clarifications</h1>
            <textarea readOnly={true} value={instructions} />
        </div>
    );
};

export default RightPane;