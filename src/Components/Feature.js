import React, { useEffect, useState } from 'react';
import { RxLapTimer } from "react-icons/rx";
import { HiLightBulb } from "react-icons/hi";

export const Feature = ({ initialTime, onTimeUp, completed, resetTimer, setResetTimer, hint, setHint }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (resetTimer) {
            setTime(initialTime); // Reset time to initial value
            setResetTimer(false); // Clear reset flag
        }
    }, [resetTimer, initialTime, setResetTimer]);

    useEffect(() => {
        if (time > 0 && !completed) {
            const timerId = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else if (completed) {
            clearInterval();
        } else {
            if (typeof onTimeUp === 'function') {
                setTime(0);
                onTimeUp();
            } else {
                console.error('onTimeUp is not a function');
            }
        }
    }, [time, onTimeUp, completed]);

    const handleHint = () => {
        setHint(!hint); // Toggle hint visibility
    };

    return (
        <div className='feature'>
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <button className="hint-button" onClick={handleHint}>
                    <div style={{ marginRight: '10px' }}>
                        <HiLightBulb size={40} />
                    </div>
                </button>
                <div>
                    <RxLapTimer size={30} /> {time} sec
                </div>
            </span>
        </div>
    );
};
