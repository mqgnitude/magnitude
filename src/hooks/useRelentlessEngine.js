import { useState, useCallback } from 'react';

export const useRelentlessEngine = (initialQuestions) => {
    const [queue, setQueue] = useState(initialQuestions);
    const [currentInfo, setCurrentInfo] = useState({
        streak: 0,
        wrongCount: 0,
        completed: false
    });

    const submitAnswer = useCallback((isCorrect) => {
        setQueue((prevQueue) => {
            const [currentCard, ...rest] = prevQueue;

            if (isCorrect) {
                // SUCCESS: Card is removed (or moved to 'mastered' pile in DB)
                setCurrentInfo(p => ({ ...p, streak: p.streak + 1 }));
                if (rest.length === 0) {
                    setCurrentInfo(p => ({ ...p, completed: true }));
                    return [];
                }
                return rest;
            } else {
                // FAILURE: The "Relentless" Insert
                // Insert the card 3 spots back (or at end if length < 3)
                const insertIndex = Math.min(rest.length, 3);
                const newQueue = [
                    ...rest.slice(0, insertIndex),
                    { ...currentCard, isRetry: true }, // Mark as retry for UI feedback
                    ...rest.slice(insertIndex)
                ];

                setCurrentInfo(p => ({ ...p, streak: 0, wrongCount: p.wrongCount + 1 }));
                return newQueue;
            }
        });
    }, []);

    return {
        currentCard: queue[0],
        remaining: queue.length,
        stats: currentInfo,
        submitAnswer
    };
};