import React from 'react';
import StarBackground from '../components/StarBackground';
import { Compass, Home, Gamepad2, User, Zap, Flame, AlertCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ userProfile, onNavigate }) => {

    // TASK CARD COMPONENT
    const TaskCard = ({ title, subject }) => (
        <div className="w-full bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 ${subject === 'Maths' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                    <AlertCircle size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm">{title}</h3>
                    <p className="text-xs text-gray-400">Class Assignment</p>
                </div>
            </div>
            <ChevronRight size={16} className="text-gray-600" />
        </div>
    );

    return (
        <div className="min-h-screen bg-bg text-white font-sans flex flex-col pb-24">
            <StarBackground />

            {/* 1. STATS HEADER */}
            <div className="w-full max-w-5xl mx-auto flex items-center justify-between p-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center border border-white/20">
                        <User size={20} />
                    </div>
                    <div>
                        <h2 className="font-bold text-sm">Cmdr. {userProfile.name}</h2>
                        <div className="text-xs text-purple-300">Level 5</div>
                    </div>
                </div>
                <div className="flex gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <div className="flex items-center gap-1 text-orange-400"><Flame size={16} /><span className="font-bold">{userProfile.streak}</span></div>
                    <div className="flex items-center gap-1 text-cyan-400"><Zap size={16} /><span className="font-bold">{userProfile.currency}</span></div>
                </div>
            </div>

            {/* 2. MAIN HUB CONTENT */}
            <div className="flex-1 max-w-5xl mx-auto w-full px-6 flex flex-col gap-6 relative z-10">

                {/* THE BIG "OPEN STAR CHART" BUTTON */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => onNavigate('galaxy')}
                    className="w-full h-48 rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 border border-white/20 relative overflow-hidden group shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80')] bg-cover opacity-40 mix-blend-overlay" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <Compass size={48} className="text-white mb-2 group-hover:rotate-45 transition-transform" />
                        <h1 className="text-2xl font-black tracking-widest text-white">OPEN STAR CHART</h1>
                        <p className="text-purple-200 text-xs tracking-wider">SELECT DESTINATION</p>
                    </div>
                </motion.button>

                {/* HOMEWORK SECTION (Read Only for now) */}
                <div>
                    <h3 className="text-sm font-bold text-gray-400 mb-3 tracking-widest">ACTIVE ORDERS</h3>
                    <TaskCard title="Vectors 1.1" subject="Maths" />
                    <TaskCard title="Cell Membranes" subject="Biology" />
                </div>

            </div>

            {/* 3. BOTTOM NAV - This actually works now */}
            <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
                <div className="pointer-events-auto bg-[#0f172a]/90 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 flex gap-8 shadow-xl">
                    <button onClick={() => onNavigate('home')} className="flex flex-col items-center text-purple-400"><Home size={24} /><span className="text-[10px] font-bold">HUB</span></button>
                    <button onClick={() => onNavigate('galaxy')} className="flex flex-col items-center text-gray-500 hover:text-white"><Compass size={24} /><span className="text-[10px] font-bold">MAP</span></button>
                    {/* ARCADE BUTTON: Triggers Flashcards */}
                    <button onClick={() => onNavigate('arcade')} className="flex flex-col items-center text-gray-500 hover:text-white"><Gamepad2 size={24} /><span className="text-[10px] font-bold">ARCADE</span></button>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;