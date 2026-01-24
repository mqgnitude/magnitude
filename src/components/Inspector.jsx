import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Target, Zap, Clock } from 'lucide-react';

const Inspector = ({ node, onClose, onLaunch }) => {
    if (!node) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#0c0c0c] border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >

                {/* Header Image / Status */}
                <div className="relative h-48 bg-surface border-b border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-mag-9/10 blur-[80px] opacity-50" />
                    <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
                        <div className="flex justify-between items-start mb-2">
                            <span className="px-2 py-1 bg-mag-2/10 text-mag-2 text-[10px] font-bold uppercase tracking-widest border border-mag-2/20 rounded">
                                {node.status === 'mastered' ? 'Module Complete' : 'Ready to Deploy'}
                            </span>
                            <button onClick={onClose} className="p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        <h2 className="text-3xl font-black text-white leading-none uppercase">{node.title}</h2>
                    </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    <p className="text-gray-400 leading-relaxed border-l-2 border-mag-2/50 pl-4">
                        {node.description || "Initialize mastery protocols for this sector. Complete the briefing to unlock simulation and training modules."}
                    </p>

                    <div className="space-y-3">
                        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Select Protocol</div>

                        {/* 1. BRIEFING (Lesson) */}
                        <button
                            onClick={() => onLaunch('lesson')}
                            className="w-full flex items-center gap-4 p-4 bg-surface border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all rounded-xl group text-left"
                        >
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-white group-hover:text-blue-400">Interactive Briefing</div>
                                <div className="text-xs text-gray-500">Acquire knowledge via visual breakdown.</div>
                            </div>
                        </button>

                        {/* 2. TRAINING (Game) */}
                        <button
                            onClick={() => onLaunch('game')}
                            className="w-full flex items-center gap-4 p-4 bg-surface border border-white/5 hover:border-mag-1/50 hover:bg-mag-1/5 transition-all rounded-xl group text-left"
                        >
                            <div className="w-12 h-12 rounded-lg bg-mag-1/10 flex items-center justify-center text-mag-1 group-hover:scale-110 transition-transform">
                                <Zap size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-white group-hover:text-mag-1">Neural Patch Bay</div>
                                <div className="text-xs text-gray-500">Connect concepts to stabilize the core.</div>
                            </div>
                        </button>

                        {/* 3. SIMULATION (Exam) */}
                        <button
                            onClick={() => onLaunch('exam')}
                            className="w-full flex items-center gap-4 p-4 bg-surface border border-white/5 hover:border-red-500/50 hover:bg-red-500/5 transition-all rounded-xl group text-left"
                        >
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                <Target size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-white group-hover:text-red-400">Exam Simulation</div>
                                <div className="text-xs text-gray-500">Past paper questions under timed pressure.</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 bg-surface/50 flex justify-between items-center text-xs font-mono text-gray-500">
                    <span className="flex items-center gap-2"><Clock size={12} /> EST. 15 MINS</span>
                    <span>XP REWARD: 500</span>
                </div>

            </motion.div>
        </AnimatePresence>
    );
};

export default Inspector;