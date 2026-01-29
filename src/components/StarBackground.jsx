import React, { useMemo } from 'react';

const StarBackground = () => {
    // 1. GENERATE STARS ONCE (Fixes flickering)
    const stars = useMemo(() => {
        return [...Array(100)].map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1,
            animDuration: 10 + Math.random() * 20, // Different speeds for parallax feel
        }));
    }, []); // Empty dependency array = Runs once on mount

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">
            {/* Deep Space Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0B0c15] via-[#020617] to-black" />

            {/* Static Noise Texture (Film Grain) */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* MEMOIZED STARS */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        // CSS Animation for smooth upward drift
                        animation: `floatUp ${star.animDuration}s linear infinite`,
                        boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`
                    }}
                />
            ))}

            {/* Global Animation Styles */}
            <style>{`
        @keyframes floatUp {
          from { transform: translateY(0px); }
          to { transform: translateY(-100vh); }
        }
      `}</style>
        </div>
    );
};

export default React.memo(StarBackground);