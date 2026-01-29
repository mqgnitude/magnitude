import React from 'react';
import StarBackground from '../components/StarBackground';
import { ArrowLeft, Orbit, Atom, Binary, Dna, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const PLANETS = {
    maths: { icon: Orbit, color: 'from-blue-600 to-indigo-600', name: 'MATHEMATICS' },
    phys: { icon: Atom, color: 'from-purple-600 to-fuchsia-600', name: 'PHYSICS' },
    cs: { icon: Binary, color: 'from-cyan-600 to-teal-600', name: 'COMP SCI' },
    bio: { icon: Dna, color: 'from-green-600 to-emerald-600', name: 'BIOLOGY' },
};

const StarChart = ({ subjects = [], onBack }) => {
    // Fallback if subjects is empty during testing
    const activeSubjects = subjects.length > 0 ? subjects : ['maths', 'phys', 'bio'];

    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col">
            <StarBackground />

            {/* HEADER */}
            <div className="p-6 z-20 flex items-center justify-between">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <ArrowLeft size={20} /> <span className="font-bold text-sm tracking-widest">RETURN TO HUB</span>
                </button>
                <div className="text-xs font-mono text-gray-500">SECTOR MAP // ALPHA</div>
            </div>

            {/* PLANET SCROLLER */}
            <div className="flex-1 flex items-center overflow-x-auto pb-12 pt-12 px-12 gap-16 snap-x z-10">
                {activeSubjects.map((subId, i) => {
                    const data = PLANETS[subId] || PLANETS['maths'];
                    const Icon = data.icon;

                    return (
                        <motion.div
                            key={subId}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="snap-center shrink-0 flex flex-col items-center group cursor-pointer"
                        >
                            {/* THE PLANET */}
                            <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${data.color} relative flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:shadow-[0_0_100px_rgba(255,255,255,0.3)] transition-all duration-500 border-4 border-black`}>
                                <div className="absolute inset-0 rounded-full opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                                <Icon size={64} className="text-white relative z-10 drop-shadow-lg" />
                            </div>

                            {/* THE LABEL */}
                            <div className="mt-8 text-center">
                                <h2 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">{data.name}</h2>
                                <button className="mt-4 px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors font-bold text-sm">
                                    ENTER ORBIT
                                </button>
                            </div>
                        </motion.div>
                    )
                })}

                {/* ADD NEW */}
                <div className="snap-center shrink-0 w-32 h-32 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-gray-600 hover:text-white hover:border-white transition-all cursor-pointer">
                    <Plus size={32} />
                </div>
            </div>
        </div>
    );
};

export default StarChart;