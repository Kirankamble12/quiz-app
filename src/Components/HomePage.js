// HomePage.js
import React from 'react';

export const HomePage = ({ onPlayClick }) => {
    const handleHowToPlayClick = () => {
        window.open('/document/How to play the Quiz.pdf', '_blank'); // Replace with the actual path to your PDF file
    };

    return (
        <div className='quize-container'>
            <button className="home-button" onClick={onPlayClick}>Play</button><br />
            <button className="home-button" onClick={handleHowToPlayClick}>How to Play</button>
        </div>
    );
};
