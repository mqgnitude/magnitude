import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Inspector from '../components/Inspector';
import LessonView from '../components/LessonView'; // <--- Ensure this is imported!
import { SYLLABUS } from '../data/syllabus';
import { CheckCircle2, Lock, Zap } from 'lucide-react';

const Dashboard = () => {
    const [activeSubject, setActiveSubject] = useState('maths');
    const [selectedNode, setSelectedNode] = useState(null);

    // This state was missing! It tracks if we are looking at the grid, lesson, or game.
    const [activeMode, setActiveMode] = useState(null); // 'lesson' | 'game' | 'exam'

    // Safety Check
    if (!SYLLABUS || !SYLLABUS[activeSubject]) {
        return <div className="min-h-screen bg-bg text-white flex items-center justify-center">Data Error</div>;
    }

    const nodes = SYLLABUS[activeSubject];

    return (
        <div className="min-h-screen bg-bg text-white font-sans flex flex-col overflow-hidden">
            <Navbar />

            <main className="flex-1 relative overflow-y-auto bg-bg flex flex-col items-center p-8 pt-12">

                <div className="max-w-5xl w-full">

                    {/* TRACK HEADERS */}
                    {activeSubject === 'maths' && (
                        <div className="grid grid-cols-3 gap-8 mb-16 text-center border-b border-white/10 pb-4">
                            <div><h3 className="font-mono text-mag-1 tracking-widest text-sm">ALGEBRA</h3></div>
                            <div><h3 className="font-mono text-white tracking-widest text-sm">NUMBER</h3></div>
                            <div><h3 className="font-mono text-mag-2 tracking-widest text-sm">GEOMETRY</h3></div>
                        </div>
                    )}

                    {/* THE CONSTELLATION GRID */}
                    <div className="relative grid grid-cols-3 gap-y-24 gap-x-12 pb-40">

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

                                {/* 1. The Main Lesson Node */}
                                <button
                                    onClick={() => node.status !== 'locked' && setSelectedNode(node)}
                                    disabled={node.status === 'locked'}
                                    className={`
                    w-48 h-24 flex flex-col items-center justify-center text-center p-2 border-2 rounded-lg transition-all duration-300 relative group outline-none focus:outline-none focus:ring-0
                    ${node.status === 'mastered' ? 'bg-surface border-mag-2 text-white shadow-[0_0_20px_rgba(0,216,255,0.15)]' : ''}
                    ${node.status === 'unlocked' ? 'bg-surface border-white/20 text-white hover:border-white/50' : ''}
                    ${node.status === 'locked' ? 'bg-black border-white/5 text-gray-700 opacity-50' : ''}
                  `}
                                >
                                    <span className="font-bold text-sm uppercase tracking-tight">{node.title}</span>
                                    {node.status === 'locked' && <Lock size={14} className="mt-2" />}
                                    {node.status === 'mastered' && <CheckCircle2 size={14} className="mt-2 text-mag-2" />}
                                </button>

                                {/* 2. The "Sidecar" Game Node */}
                                {node.heroGame && (
                                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 translate-x-full flex items-center group/game">
                                        <div className={`w-8 h-0.5 ${node.status === 'mastered' ? 'bg-mag-2' : 'bg-gray-800'}`} />
                                        <button
                                            disabled={!node.heroGame.unlocked}
                                            className={`
                        w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-all hover:scale-110 relative outline-none
                        ${node.heroGame.unlocked
                                                    ? 'bg-black border-mag-1 text-mag-1 cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                                                    : 'bg-black border-gray-800 text-gray-800 cursor-not-allowed'}
                      `}
                                        >
                                            <Zap size={24} className="fill-current mb-1" />
                                            <span className="text-[8px] font-mono font-bold leading-none">LAB</span>
                                        </button>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* INSPECTOR PANEL */}
            {selectedNode && (
                <Inspector
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    onLaunch={(mode) => setActiveMode(mode)} // <--- This now updates the state!
                />
            )}

            {/* LESSON MODE OVERLAY */}
            {activeMode === 'lesson' && selectedNode && (
                <LessonView
                    node={selectedNode}
                    onBack={() => setActiveMode(null)}
                />
            )}

        </div>
    );
};

export default Dashboard;