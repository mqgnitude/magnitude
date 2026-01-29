import React, { useState } from 'react';
import StarBackground from '../components/StarBackground';
import { X, Zap, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ActivityView = ({ deck, onExit }) => {
    // Use the passed deck, or a fallback if empty
    const [queue, setQueue] = useState(deck && deck.length > 0 ? deck : [{ q: "No Data", a: "Please create a deck" }]);
    const [flip, setFlip] = useState(false);
    const [streak, setStreak] = useState(0);

    // Get the current card (Always the first one in the queue)
    const currentCard = queue[0];

    const handleNext = (success) => {
        setFlip(false);

        // Wait for flip animation to reset before changing data (smoother)
        setTimeout(() => {
            if (success) {
                setStreak(s => s + 1);
                // Remove the top card
                setQueue(prev => prev.slice(1));
            } else {
                setStreak(0);
                // Relentless Logic: Move top card 3 steps back
                setQueue(prev => {
                    const [first, ...rest] = prev;
                    const insertIndex = Math.min(rest.length, 3);
                    return [
                        ...rest.slice(0, insertIndex),
                        { ...first, isRetry: true },
                        ...rest.slice(insertIndex)
                    ];
                });
            }
        }, 200);
    };

    // WIN STATE
    if (queue.length === 0) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-center relative">
                <StarBackground />
                <div className="z-10 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                    <h1 className="text-4xl font-black italic mb-4">COMPLETE</h1>
                    <button onClick={onExit} className="px-8 py-3 bg-white text-black font-bold rounded-full">Return to Arcade</button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
            <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

            <StarBackground />

            <div className="p-6 z-20 flex justify-between items-center">
                <button onClick={onExit} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><X /></button>
                <div className="font-bold text-yellow-400 flex gap-2"><Zap fill="currentColor" /> {streak}</div>
            </div>

            <div className="flex-1 flex items-center justify-center z-10 p-6 pb-32">
                <div className="w-full max-w-sm aspect-[3/4] perspective-1000 cursor-pointer group" onClick={() => setFlip(!flip)}>
                    <motion.div
                        className="relative w-full h-full preserve-3d transition-all duration-500"
                        animate={{ rotateY: flip ? 180 : 0 }}
                    >
                        {/* FRONT */}
                        <div className="absolute inset-0 backface-hidden bg-slate-900/90 border border-white/20 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            {currentCard.isRetry && <div className="text-red-400 text-xs font-bold mb-4 flex items-center gap-1"><RotateCw size={12} /> RECURRING NIGHTMARE</div>}
                            <h2 className="text-2xl font-bold">{currentCard.q}</h2>
                            <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest animate-pulse">Tap to Reveal</p>
                        </div>

                        {/* BACK */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-emerald-900/90 border border-emerald-500/50 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                            <h2 className="text-2xl font-bold text-emerald-100">{currentCard.a}</h2>
                        </div>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {flip && (
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-10 left-0 right-0 z-20 px-8 flex gap-4 justify-center max-w-lg mx-auto">
                        <button onClick={(e) => { e.stopPropagation(); handleNext(false); }} className="flex-1 py-4 bg-red-500/20 text-red-400 border border-red-500/50 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-colors">FORGOT</button>
                        <button onClick={(e) => { e.stopPropagation(); handleNext(true); }} className="flex-1 py-4 bg-green-500/20 text-green-400 border border-green-500/50 rounded-2xl font-bold hover:bg-green-500 hover:text-white transition-colors">MASTERED</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ActivityView;