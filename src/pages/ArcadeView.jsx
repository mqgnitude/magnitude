import React, { useState } from 'react';
import StarBackground from '../components/StarBackground';
import { ArrowLeft, Box, Play, PlusCircle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ArcadeView = ({ onBack, onLaunchCustomGame }) => {
    // Input State
    const [inputMode, setInputMode] = useState(false);
    const [rawText, setRawText] = useState('');

    // Loot Crate State
    const [crates, setCrates] = useState(3); // Mock data

    const handleParseAndLaunch = () => {
        // PARSER LOGIC: Turn "Question - Answer" text into objects
        const lines = rawText.split('\n');
        const newDeck = lines
            .filter(line => line.includes('-')) // Simple validation
            .map((line, index) => {
                const [q, a] = line.split('-');
                return { id: index, q: q.trim(), a: a.trim() };
            });

        if (newDeck.length > 0) {
            onLaunchCustomGame(newDeck);
        } else {
            alert("Invalid Format! Use: Question - Answer");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col relative">
            <StarBackground />

            {/* 1. HEADER & LOOT CRATES */}
            <div className="p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} /> <span className="font-bold text-sm tracking-widest">EXIT ARCADE</span>
                </button>

                {/* THE LOOT CRATE AREA */}
                <button className="flex items-center gap-3 bg-purple-900/40 border border-purple-500/50 px-4 py-2 rounded-xl hover:bg-purple-500/20 transition-all group">
                    <div className="relative">
                        <Box size={24} className="text-purple-300 group-hover:animate-bounce" />
                        {crates > 0 && <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">{crates}</div>}
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] text-purple-300 font-bold tracking-widest uppercase">Cargo Hold</div>
                        <div className="text-xs font-bold">OPEN CRATES</div>
                    </div>
                </button>
            </div>

            {/* 2. MAIN CONTENT */}
            <div className="flex-1 z-10 flex flex-col items-center justify-center p-6 gap-8">

                {/* GAME SELECTION CARD */}
                {!inputMode ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                        <h1 className="text-3xl font-black italic tracking-tighter mb-2">NEBULA ARCHITECT</h1>
                        <p className="text-gray-400 mb-6 text-sm">Create a custom simulation deck.</p>

                        <button
                            onClick={() => setInputMode(true)}
                            className="w-full h-24 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white hover:bg-white/5 transition-all gap-2"
                        >
                            <PlusCircle size={32} />
                            <span className="font-bold text-sm uppercase">Create New Deck</span>
                        </button>
                    </motion.div>
                ) : (
                    /* INPUT MODE (The "Teacher Tool") */
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-2xl bg-black/80 border border-white/20 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-xl">Input Data</h2>
                            <button onClick={() => setInputMode(false)} className="text-gray-500 hover:text-white"><Trash2 size={20} /></button>
                        </div>

                        <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2 font-mono">FORMAT: QUESTION - ANSWER</p>
                            <textarea
                                value={rawText}
                                onChange={(e) => setRawText(e.target.value)}
                                placeholder={`Powerhouse of the cell? - Mitochondria\nForce = ? - Mass x Acceleration\nCapital of France? - Paris`}
                                className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:border-purple-500 resize-none"
                            />
                        </div>

                        <button
                            onClick={handleParseAndLaunch}
                            className="w-full py-4 bg-white text-black font-black tracking-widest rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                        >
                            <Play size={20} fill="black" /> LAUNCH SIMULATION
                        </button>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default ArcadeView;