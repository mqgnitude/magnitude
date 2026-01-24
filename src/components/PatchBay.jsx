import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle, Activity } from 'lucide-react';

const PatchBay = ({ pack, onExit }) => {
    return (
        <div className="fixed inset-0 bg-bg z-50 flex flex-col items-center justify-center">

            {/* HUD Header (The Top Bar) */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center border-b border-white/10 bg-bg/90 backdrop-blur">
                <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-mag-3 animate-pulse" />
                    <h2 className="font-mono text-mag-2 tracking-widest uppercase">
                        PATCH BAY // {pack.title}
                    </h2>
                </div>

                {/* The Abort Button */}
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors font-mono text-sm"
                >
                    <XCircle size={18} /> ABORT SESSION
                </button>
            </div>

            {/* Main Game Area (Placeholder for now) */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6"
            >
                <Activity size={64} className="mx-auto text-mag-9 animate-pulse-slow" />
                <h1 className="text-4xl font-black text-white">
                    SYSTEM LINK ESTABLISHED
                </h1>
                <p className="text-gray-500 font-mono">
                    Ready to initialize {pack.category} protocols.
                </p>

                <button className="px-8 py-3 bg-mag-9 text-black font-bold hover:scale-105 transition-transform rounded-sm">
                    BEGIN SEQUENCE
                </button>
            </motion.div>

        </div>
    );
};

export default PatchBay;