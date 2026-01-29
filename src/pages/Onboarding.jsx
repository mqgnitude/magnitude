import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, ArrowRight, Zap } from 'lucide-react';
import StarBackground from '../components/StarBackground';

const DEFAULT_SUBJECTS = [
    { id: 'maths', label: 'Mathematics', color: 'bg-blue-500' },
    { id: 'bio', label: 'Biology', color: 'bg-green-500' },
    { id: 'chem', label: 'Chemistry', color: 'bg-orange-500' },
    { id: 'phys', label: 'Physics', color: 'bg-purple-500' },
    { id: 'cs', label: 'Comp Sci', color: 'bg-pink-500' },
];

const Onboarding = ({ onComplete }) => {
    const [selected, setSelected] = useState([]);
    const [customSubject, setCustomSubject] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const toggleSubject = (id) => {
        if (selected.includes(id)) setSelected(selected.filter(s => s !== id));
        else setSelected([...selected, id]);
    };

    const handleFinish = () => {
        if (selected.length > 0) onComplete(selected);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white relative">
            <StarBackground />

            <div className="z-10 w-full max-w-md">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <Zap size={32} className="text-yellow-400 fill-current" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">INITIALIZE SYSTEMS</h1>
                    <p className="text-gray-400">Select target sectors for calibration.</p>
                </motion.div>

                {/* Grid of Subjects */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {DEFAULT_SUBJECTS.map((sub) => (
                        <button
                            key={sub.id}
                            onClick={() => toggleSubject(sub.id)}
                            className={`
                relative h-24 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 group
                ${selected.includes(sub.id)
                                    ? 'bg-white/10 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                    : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30 hover:bg-white/5'}
              `}
                        >
                            <div className={`w-2 h-2 rounded-full ${sub.color}`} />
                            <span className="font-bold">{sub.label}</span>
                            {selected.includes(sub.id) && <div className="absolute top-2 right-2"><Check size={14} /></div>}
                        </button>
                    ))}

                    {/* Add Custom Button */}
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="h-24 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/50 transition-colors"
                    >
                        <Plus size={24} />
                        <span className="text-xs font-bold mt-1">ADD CUSTOM</span>
                    </button>
                </div>

                {/* Custom Input Field (Shows if Add is clicked) */}
                {isAdding && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mb-6">
                        <input
                            type="text"
                            placeholder="Enter Course Name..."
                            className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // In a real app, this would add to the list
                                    alert("Custom Course Logic Here");
                                    setIsAdding(false);
                                }
                            }}
                        />
                    </motion.div>
                )}

                {/* Launch Button */}
                <button
                    onClick={handleFinish}
                    disabled={selected.length === 0}
                    className={`
            w-full py-4 rounded-xl font-black tracking-widest flex items-center justify-center gap-2 transition-all
            ${selected.length > 0
                            ? 'bg-white text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                            : 'bg-white/10 text-gray-600 cursor-not-allowed'}
          `}
                >
                    ENGAGE HYPERDRIVE <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Onboarding;