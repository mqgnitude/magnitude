import React from 'react';
import { motion } from 'framer-motion';
import { PACKS } from '../data/packs';
import { Zap, BookOpen, Globe, Beaker } from 'lucide-react';

const getIcon = (cat) => {
    if (cat.includes('GEO')) return <Globe size={18} />;
    if (cat.includes('ENG')) return <BookOpen size={18} />;
    return <Beaker size={18} />;
};



const SeismicHub = ({ onPackSelect }) => { // <--- Receive the function here
    return (
        <div className="w-full py-8">
            <h2 className="text-xl font-mono text-gray-400 mb-4 px-6 tracking-widest flex items-center gap-2">
                <Zap size={16} className="text-mag-3" /> AVAILABLE SECTORS
            </h2>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto pb-8 px-6 gap-6 snap-x scrollbar-hide">
                {PACKS.map((pack) => (
                    <motion.button
                        key={pack.id}
                        onClick={() => onPackSelect(pack)} // <--- Add this Click Event!
                        // ... rest of the button code ...
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="snap-center shrink-0 w-[280px] h-[350px] bg-surface border border-white/10 rounded-xl p-6 flex flex-col justify-between text-left group relative overflow-hidden transition-colors hover:border-white/30"
                    >
                        {/* Background Glow (Visible on Hover) */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white to-transparent`} />

                        <div>
                            <span className={`text-xs font-bold tracking-widest border border-white/20 px-2 py-1 rounded ${pack.color}`}>
                                {pack.category}
                            </span>

                            <h3 className="text-3xl font-black text-white mt-4 leading-none uppercase">
                                {pack.title.split(':')[0]}
                            </h3>
                            <p className="text-gray-400 mt-2 text-sm line-clamp-2">
                                {pack.desc}
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                            <div className="flex gap-1">
                                {/* Difficulty Dots */}
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`w-1 h-3 rounded-full ${i < pack.difficulty ? pack.color : 'bg-gray-800'}`} />
                                ))}
                            </div>
                            {getIcon(pack.category)}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default SeismicHub;