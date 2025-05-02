// App.js
import React, { useState, useCallback } from 'react';
import './App.css';
import { Quize } from './Components/Quize';
import { HomePage } from './Components/HomePage';
import { Feature } from './Components/Feature';

export const App = () => {
  const initialTime = 30; // Example initial time
  const [completed, setCompleted] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [hint, setHint] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleTimeUp = useCallback(() => {
    setTimeUp(true);
  }, []);

  const handleReset = useCallback(() => {
    setCompleted(false); // Reset quiz completion state
    setResetTimer(true); // Reset timer in Feature component
    setTimeUp(false); // Reset time-up state
    setHint(false); // Reset hints
  }, []);

  const handlePlayClick = () => {
    setShowQuiz(true); // Show quiz
  };

  const handleGoHome = () => {
    setShowQuiz(false); // Show Home Page
    handleReset(); // Reset states
  };

  return (
    <div className='app-container'>
      <div className='title-img'>
        <img src="/imges/QuizeTitle.png" alt="Quiz Title" />
      </div>

      {!showQuiz ? (
        <div>
          <HomePage onPlayClick={handlePlayClick} />
        </div>
      ) : (
        <div>
          <Feature
            initialTime={initialTime}
            onTimeUp={handleTimeUp}
            completed={completed}
            resetTimer={resetTimer}
            setResetTimer={setResetTimer}
            hint={hint}
            setHint={setHint}
          />
          <Quize
            completed={completed}
            setCompleted={setCompleted}
            handleReset={handleReset}
            timeUp={timeUp}
            hint={hint}
            setHint={setHint}
            goToHome={handleGoHome}
          />
        </div>
      )}
    </div>
  );
};
