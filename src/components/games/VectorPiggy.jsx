import React, { useState, useEffect } from 'react';
import { RotateCcw, X, HelpCircle, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- LEVEL CONFIGURATION ---
const LEVELS = [
    {
        id: 1,
        title: "The Basis",
        desc: "Use 'a' and 'b' to navigate the Bot to the target.",
        gridSize: 6,
        start: { x: 1, y: 1 },
        target: { x: 4, y: 4 },
        vectors: { a: { x: 1, y: 0 }, b: { x: 0, y: 1 } }
    },
    {
        id: 2,
        title: "The Skew",
        desc: "Vectors are diagonal now. Check the radar to see their path.",
        gridSize: 8,
        start: { x: 1, y: 4 },
        target: { x: 7, y: 6 },
        vectors: { a: { x: 1, y: 1 }, b: { x: 1, y: -1 } }
    },
    {
        id: 3,
        title: "The Detour",
        desc: "Sometimes you must go backwards to move forwards.",
        gridSize: 8,
        start: { x: 2, y: 2 },
        target: { x: 6, y: 6 },
        vectors: { a: { x: 2, y: 1 }, b: { x: 1, y: 0 } }
    }
];

// --- SOUND ENGINE ---
const playDing = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch (e) { console.error(e); }
};

// --- VECTOR BOT ---
const VectorBot = ({ isBlocked }) => (
    <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform ${isBlocked ? 'animate-shake' : ''}`}>
        <g transform="translate(10, 10) scale(0.8)">
            <ellipse cx="50" cy="95" rx="30" ry="10" fill="#3b82f6" opacity="0.8" className="animate-pulse" />
            <rect x="15" y="15" width="70" height="70" rx="12" fill={isBlocked ? "#7f1d1d" : "#0f172a"} stroke={isBlocked ? "#ef4444" : "#38bdf8"} strokeWidth="4" />
            <rect x="25" y="25" width="50" height="35" rx="6" fill="#000" />
            <circle cx="40" cy="42" r="6" fill={isBlocked ? "#ef4444" : "#06b6d4"} className="animate-pulse" />
            <circle cx="60" cy="42" r="6" fill={isBlocked ? "#ef4444" : "#06b6d4"} className="animate-pulse" />
            <line x1="30" y1="15" x2="20" y2="0" stroke="#38bdf8" strokeWidth="3" />
            <circle cx="20" cy="0" r="4" fill="#ef4444" />
            <line x1="70" y1="15" x2="80" y2="0" stroke="#38bdf8" strokeWidth="3" />
        </g>
    </svg>
);

// --- RADAR ---
const VectorRadar = ({ vec, color, label }) => {
    const scale = 20; const cx = 50; const cy = 50;
    const ex = cx + (vec.x * scale); const ey = cy - (vec.y * scale);
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 bg-black/40 rounded-xl border border-white/10 shadow-sm overflow-hidden group hover:border-white/30 transition-colors">
                <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs><pattern id={`grid-${label}`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5" /></pattern></defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${label})`} />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#64748b" strokeWidth="1" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#64748b" strokeWidth="1" />
                </svg>
                <svg className="absolute inset-0 w-full h-full">
                    <defs><marker id={`arrow-${label}`} markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 L0,0" fill={color} /></marker></defs>
                    <line x1={cx} y1={cy} x2={ex} y2={ey} stroke={color} strokeWidth="3" markerEnd={`url(#arrow-${label})`} strokeLinecap="round" />
                </svg>
                <div className="absolute bottom-1 right-2 text-[10px] font-mono font-bold text-slate-500">({vec.x}, {vec.y})</div>
            </div>
            <div className="mt-2 font-black text-sm uppercase" style={{ color }}>Vector {label}</div>
        </div>
    );
};

const VectorGame = ({ onExit }) => {
    const [levelIndex, setLevelIndex] = useState(0);
    const level = LEVELS[levelIndex];

    // GAME STATE
    const [pos, setPos] = useState(level.start);
    const [equation, setEquation] = useState([]);
    const [history, setHistory] = useState([level.start]);
    const [historyMoves, setHistoryMoves] = useState([]);

    // UI STATES
    const [status, setStatus] = useState('playing'); // 'playing' | 'won'
    const [showWinModal, setShowWinModal] = useState(false); // Controls the popup delay
    const [showTutorial, setShowTutorial] = useState(true);
    const [blockedFeedback, setBlockedFeedback] = useState(false);

    useEffect(() => {
        // Reset Everything on Level Change
        setPos(level.start);
        setHistory([level.start]);
        setHistoryMoves([]);
        setEquation([]);
        setStatus('playing');
        setShowWinModal(false);
    }, [level]);

    const simplified = equation.reduce((acc, curr) => {
        if (curr === 'a') acc.a++; if (curr === '-a') acc.a--;
        if (curr === 'b') acc.b++; if (curr === '-b') acc.b--;
        return acc;
    }, { a: 0, b: 0 });

    const handleMove = (type, vector) => {
        if (status !== 'playing') return;
        const newPos = { x: pos.x + vector.x, y: pos.y + vector.y };
        if (newPos.x < 0 || newPos.x >= level.gridSize || newPos.y < 0 || newPos.y >= level.gridSize) { triggerBlock(); return; }

        setPos(newPos);
        setHistory([...history, newPos]);
        setHistoryMoves([...historyMoves, type]);
        setEquation([...equation, type]);

        // WIN CONDITION
        if (newPos.x === level.target.x && newPos.y === level.target.y) {
            playDing();
            setStatus('won'); // 1. Trigger Visuals IMMEDIATELY

            // 2. Trigger Modal after 2 seconds
            setTimeout(() => {
                setShowWinModal(true);
            }, 2000);
        }
    };

    const triggerBlock = () => { setBlockedFeedback(true); setTimeout(() => setBlockedFeedback(false), 400); };
    const nextLevel = () => { if (levelIndex < LEVELS.length - 1) setLevelIndex(prev => prev + 1); else onExit(); };
    const getCssPos = (p) => ({ left: `${p.x * (100 / level.gridSize)}%`, top: `${(level.gridSize - 1 - p.y) * (100 / level.gridSize)}%`, width: `${100 / level.gridSize}%`, height: `${100 / level.gridSize}%` });

    return (
        <div className="fixed inset-0 z-[60] bg-[#020617] flex items-center justify-center p-4 font-sans select-none">

            {/* Tutorial Overlay */}
            <AnimatePresence>
                {showTutorial && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] bg-black/90 flex items-center justify-center backdrop-blur-md">
                        <div className="bg-[#0f172a] max-w-md w-full p-8 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.2)] text-center border border-white/10">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500"><Zap size={32} /></div>
                            <h2 className="text-3xl font-black text-white mb-2">VECTOR BOT</h2>
                            <p className="text-slate-400 mb-6 leading-relaxed">Pilot the bot to the <span className="text-red-500 font-bold">Target Zone</span>.<br /><br />Check the <span className="font-bold text-white">Control panel</span> to see where vectors 'a' and 'b' take you.</p>
                            <button onClick={() => setShowTutorial(false)} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors">START</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl w-full h-[90vh] bg-[#0f172a] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10">

                {/* === LEFT: GAME VIEWPORT === */}
                <div className="flex-1 relative bg-[#020617] overflow-hidden p-6 flex items-center justify-center">
                    <div className="absolute top-6 left-6 z-10">
                        <h3 className="font-black text-2xl text-white tracking-tight">LEVEL 0{levelIndex + 1}</h3>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{level.title}</p>
                    </div>

                    <div className="relative aspect-square h-full max-h-[600px] border border-white/10 rounded-xl bg-[#0B0C10] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <defs><pattern id="main-grid" width={100 / level.gridSize + "%"} height={100 / level.gridSize + "%"} patternUnits="userSpaceOnUse"><path d={`M ${100} 0 L 0 0 0 ${100}`} fill="none" stroke="#38bdf8" strokeWidth="0.5" /></pattern></defs>
                            <rect width="100%" height="100%" fill="url(#main-grid)" />
                        </svg>

                        {/* Start Marker */}
                        <div className="absolute flex items-center justify-center" style={getCssPos(level.start)}><div className="w-3 h-3 bg-slate-600 rounded-full" /><span className="absolute -bottom-5 font-bold text-[10px] text-slate-600 tracking-widest">START</span></div>
                        {/* Target Marker */}
                        <div className="absolute flex items-center justify-center" style={getCssPos(level.target)}>
                            <div className="absolute inset-2 bg-red-500/20 rounded-lg animate-pulse" />
                            <div className="relative z-10 w-full h-full border border-dashed border-red-500/50 rounded-lg flex items-center justify-center"><div className="w-1 h-1 bg-red-500 rounded-full" /></div>
                        </div>

                        {/* --- PATH DRAWING LAYER --- */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                            {/* 1. Definitions for Markers (Must be here to render) */}
                            <defs>
                                <marker id="headResult" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                                    <path d="M0,0 L4,2 L0,4 L0,0" fill="#34d399" />
                                </marker>
                            </defs>

                            {/* 2. Resultant Vector (Green Bird's Eye) */}
                            {status === 'won' && (
                                <motion.line
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    x1={(level.start.x * (100 / level.gridSize)) + (50 / level.gridSize) + "%"}
                                    y1={((level.gridSize - 1 - level.start.y) * (100 / level.gridSize)) + (50 / level.gridSize) + "%"}
                                    x2={(level.target.x * (100 / level.gridSize)) + (50 / level.gridSize) + "%"}
                                    y2={((level.gridSize - 1 - level.target.y) * (100 / level.gridSize)) + (50 / level.gridSize) + "%"}
                                    stroke="#34d399" // Emerald Green
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray="8,8"
                                    markerEnd="url(#headResult)"
                                />
                            )}

                            {/* 3. User Path History */}
                            {history.map((p, i) => {
                                if (i === 0) return null;
                                const prev = history[i - 1];
                                const moveType = historyMoves[i - 1] || '';

                                // Default Grey
                                let color = "#94a3b8";

                                // If Won -> SPLIT into Red/Blue
                                if (status === 'won') {
                                    if (moveType.includes('a')) color = "#60a5fa"; // Blue
                                    if (moveType.includes('b')) color = "#f87171"; // Red
                                }

                                return (
                                    <line
                                        key={i}
                                        x1={(prev.x * (100 / level.gridSize)) + (50 / level.gridSize) + "%"}
                                        y1={((level.gridSize - 1 - prev.y) * (100 / level.gridSize)) + (50 / level.gridSize) + "%"}
                                        x2={(p.x * (100 / level.gridSize)) + (50 / level.gridSize) + "%"}
                                        y2={((level.gridSize - 1 - p.y) * (100 / level.gridSize)) + (50 / level.gridSize) + "%"}
                                        stroke={color}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        opacity={1}
                                        className="transition-colors duration-500" // Smoothly fades from grey to red/blue
                                    />
                                );
                            })}
                        </svg>

                        <motion.div className="absolute z-20" initial={false} animate={getCssPos(pos)} transition={{ type: "spring", stiffness: 250, damping: 20 }}>
                            <VectorBot isBlocked={blockedFeedback} />
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {/* Modal now depends on showWinModal state, NOT status directly */}
                        {showWinModal && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-sm">
                                <div className="bg-[#0f172a] p-8 rounded-2xl shadow-2xl text-center border border-green-500/30 max-w-sm w-full">
                                    <h2 className="text-2xl font-black text-white mb-4 tracking-tight">LEVEL COMPLETE</h2>
                                    <div className="bg-black/40 p-4 rounded-lg mb-6 font-mono text-lg border border-white/5">
                                        <span className="text-slate-500 block text-xs mb-1">RESULTANT VECTOR</span>
                                        <span className="text-blue-500 font-bold">{simplified.a}a</span> <span className="text-red-500 font-bold"> + {simplified.b}b</span>
                                    </div>
                                    <button onClick={nextLevel} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 flex items-center justify-center gap-2">{levelIndex < LEVELS.length - 1 ? 'NEXT LEVEL' : 'MISSION COMPLETE'} <ChevronRight size={18} /></button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* === RIGHT: CONTROL PANEL === */}
                <div className="w-full md:w-96 bg-[#0f172a] border-l border-white/10 flex flex-col z-20">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                        <div><h2 className="text-lg font-black text-white">CONTROLS</h2><div className="text-xs text-blue-500 font-bold tracking-wider">SYSTEM ONLINE</div></div>
                        <button onClick={onExit} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} className="text-white" /></button>
                    </div>
                    <div className="p-6 border-b border-white/10">
                        <div className="flex justify-between gap-4">
                            <VectorRadar vec={level.vectors.a} color="#3b82f6" label="a" />
                            <VectorRadar vec={level.vectors.b} color="#ef4444" label="b" />
                        </div>
                        <p className="mt-4 text-xs text-center text-slate-500 italic">{level.desc}</p>
                    </div>
                    <div className="flex-1 p-6 flex flex-col">
                        <div className="flex-1 bg-black/40 rounded-xl border border-white/10 p-4 mb-4 relative font-mono text-lg">
                            <div className="absolute top-2 right-2 text-[10px] font-bold text-slate-600">INPUT LOG</div>
                            <span className="text-green-500 mr-2">{'>'}</span>{equation.length === 0 && <span className="text-slate-600">waiting...</span>}
                            {equation.map((move, i) => (<span key={i} className={`mr-1 font-bold inline-block ${move.includes('a') ? 'text-blue-500' : 'text-red-500'}`}>{i > 0 && !move.startsWith('-') ? '+' : ''}{move}</span>))}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => handleMove('a', level.vectors.a)} className="h-14 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-[0_4px_0_rgb(30,58,138)] active:translate-y-[4px] active:shadow-none hover:bg-blue-500 flex items-center justify-center gap-1">+a</button>
                            <button onClick={() => handleMove('b', level.vectors.b)} className="h-14 rounded-xl bg-red-600 text-white font-bold text-lg shadow-[0_4px_0_rgb(153,27,27)] active:translate-y-[4px] active:shadow-none hover:bg-red-500 flex items-center justify-center gap-1">+b</button>
                            <button onClick={() => handleMove('-a', { x: -level.vectors.a.x, y: -level.vectors.a.y })} className="h-12 rounded-xl bg-transparent text-blue-500 font-bold text-lg border border-blue-500/30 hover:bg-blue-500/10 flex items-center justify-center gap-1">-a</button>
                            <button onClick={() => handleMove('-b', { x: -level.vectors.b.x, y: -level.vectors.b.y })} className="h-12 rounded-xl bg-transparent text-red-500 font-bold text-lg border border-red-500/30 hover:bg-red-500/10 flex items-center justify-center gap-1">-b</button>
                        </div>
                    </div>
                    <div className="px-6 pb-6"><button onClick={() => { setPos(level.start); setHistory([level.start]); setEquation([]); setStatus('playing'); }} className="w-full py-3 rounded-lg text-slate-500 font-bold hover:bg-white/5 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-widest"><RotateCcw size={14} /> Reset Sequence</button></div>
                </div>
            </div>
        </div>
    );
};

export default VectorGame;