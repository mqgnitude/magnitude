import React from 'react';
import { motion } from 'framer-motion';

const SUBJECTS = [
    "BIOLOGY", "CHEMISTRY", "PHYSICS", "GEOGRAPHY", "HISTORY",
    "ENGLISH LIT", "COMPUTER SCIENCE", "MATHS", "ECONOMICS"
];

const Marquee = () => {
    return (
        <div className="w-full bg-mag-1 text-black py-3 overflow-hidden flex relative z-10">
            {/* We duplicate the list to make the loop seamless */}
            <motion.div
                className="flex gap-12 whitespace-nowrap font-black tracking-tighter text-lg"
                animate={{ x: "-50%" }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
                {[...SUBJECTS, ...SUBJECTS, ...SUBJECTS, ...SUBJECTS].map((sub, i) => (
                    <span key={i} className="flex items-center gap-4">
                        {sub} <span className="w-2 h-2 bg-black rounded-full" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;