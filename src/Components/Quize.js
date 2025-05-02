import React, { useEffect, useState } from 'react';
import { Data } from './Data';
import { HiSpeakerWave } from "react-icons/hi2";

export const Quize = ({ completed, setCompleted, handleReset, timeUp, hint, setHint, goToHome }) => {
    // Helper functions and states
    const getRanQuestions = (data, number) => {
        let shuffled = [...data].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, number);
    };

    const [ranQuestions, setRanQuestions] = useState([]);
    const [curIndex, setCurIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [answer, setAnswer] = useState(0);
    const [error, setError] = useState('');
    const [currentAudio, setCurrentAudio] = useState(null);

    useEffect(() => {
        setRanQuestions(getRanQuestions(Data, 5)); // Generate new random questions
        setCurIndex(0); // Reset question index
        setSelectedOption(''); // Clear selection
        setAnswer(0); // Reset score
        setError(''); // Clear errors
        setHint(false); // Reset hints
    }, [handleReset, setHint]);

    const handleNext = () => {
        if (!selectedOption) {
            setError('Please choose an option');
            return; // Prevent further execution if no option is selected
        }

        setError('');

        if (selectedOption.trim() === ranQuestions[curIndex].ans.trim()) {
            setAnswer((prevAnswer) => prevAnswer + 1);
        }

        setSelectedOption('');
        setHint(false);

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            setCurrentAudio(null);
        }

        if (curIndex < ranQuestions.length - 1) {
            setCurIndex(curIndex + 1);
        } else {
            setCompleted(true);
        }
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setError('');
    };

    const resetQuiz = () => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        handleReset();
        setRanQuestions(getRanQuestions(Data, 5));
        setCurIndex(0);
        setSelectedOption('');
        setAnswer(0);
        setError('');
        setHint(false);
    };

    const handleAudioPlay = (audioSrc) => {
        if (currentAudio) {
            if (currentAudio.src === audioSrc) {
                // If the same audio is already selected, reset to the beginning
                currentAudio.currentTime = 0; // Reset the audio
                currentAudio.play();
            } else {
                // Play the new audio
                const newAudio = new Audio(audioSrc);
                setCurrentAudio(newAudio);
                newAudio.play();
            }
        } else {
            // Play a new audio if none is currently playing
            const newAudio = new Audio(audioSrc);
            setCurrentAudio(newAudio);
            newAudio.play();
        }
    };


    // Ensure the return block is inside the component
    return (
        <div className='quize-container'>
            {!timeUp ? (
                <div className='quize'>
                    {!completed ? (
                        <div>
                            {ranQuestions.length > 0 && (
                                <div key={curIndex}>
                                    <h2>{`Q${curIndex + 1}: ${ranQuestions[curIndex].q}`}</h2>

                                    {ranQuestions[curIndex].image && (
                                        <img
                                            src={ranQuestions[curIndex].image}
                                            alt='Qus-img'
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                    )}

                                    {ranQuestions[curIndex].audio && (
                                        <button
                                            className="button"
                                            onClick={() => handleAudioPlay(ranQuestions[curIndex].audio)}
                                            style={{ marginBottom: '10px' }}
                                        >
                                            <HiSpeakerWave size={40} />
                                        </button>
                                    )}
                                    {['a', 'b', 'c', 'd'].map((key, optIndex) => (
                                        <ul key={optIndex}>
                                            <input
                                                type='radio'
                                                name={`question${curIndex}`}
                                                id={`q${curIndex}_${key}`}
                                                value={ranQuestions[curIndex][key]}
                                                checked={selectedOption === ranQuestions[curIndex][key]}
                                                onChange={handleOptionChange}
                                            />
                                            <label htmlFor={`q${curIndex}_${key}`}>{ranQuestions[curIndex][key]}</label>
                                        </ul>
                                    ))}

                                    {hint && <p className='hint'>{ranQuestions[curIndex].hint}</p>}
                                </div>
                            )}
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <div className='btn'>
                                <button className="button" onClick={handleNext}>Next</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1>🎉Quiz Completed!🎉</h1>
                            <p>
                                You got {answer} out of {ranQuestions.length} questions correct.
                            </p>
                            <div className='btn'>
                                <button className="button" onClick={resetQuiz}>Play Again</button>
                                <button className="button" onClick={goToHome}>Go to Home</button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className='quize'>
                    <h1>Time's Up!</h1>
                    <div className='btn'>
                        <button className="button" onClick={resetQuiz}>Play Again</button>
                        <button className="button" onClick={goToHome}>Go to Home</button>
                    </div>
                </div>
            )}
        </div>
    );
};
