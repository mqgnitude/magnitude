import React from 'react';
import { motion } from 'framer-motion';

const SUBJECTS = [
    "BIOLOGY", "CHEMISTRY", "PHYSICS", "GEOGRAPHY", "GERMAN", "HISTORY",
    "ENGLISH LIT", "FRENCH", "COMPUTER SCIENCE", "MATHS", "ECONOMICS", "SPANISH",
];

const Marquee = () => {
    return (
        // Changed bg-mag-1 to bg-surface/50 (subtle dark) and added border
        <div className="w-full bg-surface/50 border-y border-white/5 py-4 overflow-hidden flex relative z-10 backdrop-blur-sm">
            <motion.div
                className="flex gap-12 whitespace-nowrap font-black tracking-tighter text-lg"
                animate={{ x: "-50%" }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                {[...SUBJECTS, ...SUBJECTS, ...SUBJECTS, ...SUBJECTS].map((sub, i) => (
                    <span key={i} className="flex items-center gap-4">
                        {/* Applied the gradient text style here */}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                            {sub}
                        </span>
                        {/* Changed dot color to match the theme (dark grey/white) */}
                        <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;