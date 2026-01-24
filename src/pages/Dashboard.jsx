import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Inspector from '../components/Inspector';
import LessonView from '../components/LessonView';
import VectorPiggy from '../components/games/VectorPiggy';
import { SYLLABUS } from '../data/syllabus';
import { CheckCircle2, Lock, Zap } from 'lucide-react';

const Dashboard = () => {
    const [activeSubject, setActiveSubject] = useState('maths');
    const [selectedNode, setSelectedNode] = useState(null);
    const [activeMode, setActiveMode] = useState(null);

    if (!SYLLABUS || !SYLLABUS[activeSubject]) return <div>Data Error</div>;
    const nodes = SYLLABUS[activeSubject];

    return (
        <div className="min-h-screen bg-bg text-white font-sans flex flex-col overflow-hidden">
            <Navbar />

            <main className="flex-1 relative overflow-y-auto bg-bg flex flex-col items-start p-8 pt-12 pl-8 md:pl-24">

                <div className="w-full max-w-6xl"> {/* Increased max-width to accommodate larger buttons */}

                    {/* TRACK HEADERS */}
                    {activeSubject === 'maths' && (
                        <div className="grid grid-cols-3 gap-8 mb-16 text-center border-b border-white/10 pb-4">
                            <div><h3 className="font-mono text-mag-1 tracking-widest text-sm">ALGEBRA</h3></div>
                            <div><h3 className="font-mono text-white tracking-widest text-sm">NUMBER</h3></div>
                            <div><h3 className="font-mono text-mag-2 tracking-widest text-sm">GEOMETRY</h3></div>
                        </div>
                    )}

                    {/* THE CONSTELLATION GRID */}
                    <div className="relative grid grid-cols-3 gap-y-24 gap-x-16 pb-40"> {/* Increased gap-x */}

                        {/* Background Lines */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute left-[16.6%] top-0 bottom-0 w-px bg-white/5" />
                            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-white/5" />
                            <div className="absolute right-[16.6%] top-0 bottom-0 w-px bg-white/5" />
                        </div>

                        {/* Render Nodes */}
                        {nodes.map((node) => (
                            <div
                                key={node.id}
                                className="relative flex flex-col items-center z-10"
                                style={{ gridRow: node.row, gridColumn: node.col }}
                            >
                                {/* 1. Main Node - UPDATED SIZE */}
                                <button
                                    onClick={() => node.status !== 'locked' && setSelectedNode(node)}
                                    disabled={node.status === 'locked'}
                                    className={`
                                        w-60 h-32 flex flex-col items-center justify-center text-center p-4 border-2 rounded-xl transition-all duration-300 relative group outline-none focus:outline-none focus:ring-0
                                        ${node.status === 'mastered' ? 'bg-surface border-mag-2 text-white shadow-[0_0_25px_rgba(0,216,255,0.15)]' : ''}
                                        ${node.status === 'unlocked' ? 'bg-surface border-white/20 text-white hover:border-white/50 hover:scale-105' : ''}
                                        ${node.status === 'locked' ? 'bg-black border-white/5 text-gray-700 opacity-50' : ''}
                                    `}
                                >
                                    <span className="font-bold text-lg uppercase tracking-tight leading-tight">{node.title}</span>
                                    {node.status === 'locked' && <Lock size={18} className="mt-2" />}
                                    {node.status === 'mastered' && <CheckCircle2 size={20} className="mt-2 text-mag-2" />}
                                </button>

                                {/* 2. LAB BUTTON (Sidecar) - UPDATED SIZE & COLOR */}
                                {node.heroGame && (
                                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 -translate-x-full flex flex-row-reverse items-center group/game">

                                        {/* Connecting Line */}
                                        <div className={`w-10 h-0.5 ${node.status === 'mastered' ? 'bg-purple-500' : 'bg-gray-800'}`} />

                                        <button
                                            disabled={!node.heroGame.unlocked}
                                            onClick={() => setActiveMode(node.heroGame.id)}
                                            className={`
                                                w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all hover:scale-110 relative outline-none z-20
                                                ${node.heroGame.unlocked
                                                    ? 'bg-black border-purple-500 text-purple-400 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:bg-purple-500/10'
                                                    : 'bg-black border-gray-800 text-gray-800 cursor-not-allowed'}
                                            `}
                                        >
                                            <Zap size={32} className="fill-current mb-1" />
                                            <span className="text-[10px] font-mono font-bold leading-none tracking-wider">GAME</span>

                                            {/* Optional: "New" Badge if unlocked */}
                                            {node.heroGame.unlocked && (
                                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-75" />
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* INSPECTOR & MODES */}
            {selectedNode && (
                <Inspector
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    onLaunch={(mode) => setActiveMode(mode)}
                />
            )}

            {activeMode === 'lesson' && selectedNode && (
                <LessonView node={selectedNode} onBack={() => setActiveMode(null)} />
            )}

            {activeMode === 'vector_piggy' && (
                <VectorPiggy onExit={() => setActiveMode(null)} />
            )}

        </div>
    );
};

export default Dashboard;