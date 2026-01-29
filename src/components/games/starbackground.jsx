import React from 'react';
import { motion } from 'framer-motion';

const StarBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">

            {/* 1. Deep Space Gradient (The Void) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#17153B] via-[#020617] to-black opacity-90" />

            {/* 2. Static Noise (Film Grain Texture for "Gritty" feel) */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* 3. Parallax Star Layers (CSS Animation is smoother for bg) */}
            {/* Small/Slow Stars */}
            <div className="absolute inset-0 animate-[pulse_8s_infinite]">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`s-${i}`}
                        className="absolute bg-white rounded-full opacity-30"
                        initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                        animate={{ y: [null, Math.random() * -100] }}
                        transition={{ duration: 20 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
                        style={{ width: Math.random() * 2, height: Math.random() * 2 }}
                    />
                ))}
            </div>

            {/* Medium/Bright Stars */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`m-${i}`}
                        className="absolute bg-blue-100 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                        initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 3 + Math.random() * 4, repeat: Infinity }}
                        style={{ width: Math.random() * 3 + 1, height: Math.random() * 3 + 1 }}
                    />
                ))}
            </div>

            {/* 4. Shooting Stars (Occasional) */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[1px] bg-gradient-to-l from-transparent via-white to-transparent -rotate-45 animate-shooting-star opacity-0" />
                <div className="absolute top-1/4 right-1/4 w-[200px] h-[1px] bg-gradient-to-l from-transparent via-cyan-300 to-transparent -rotate-45 animate-shooting-star-delayed opacity-0" />
            </div>

            {/* 5. Atmosphere Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-900/20 to-transparent blur-3xl" />
        </div>
    );
};

export default StarBackground;