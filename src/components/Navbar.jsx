import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-bg/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    {/* Brand */}
                    <div
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 cursor-pointer z-50"
                    >
                        <div className="w-8 h-8 bg-gradient-to-tr from-mag-9 to-mag-2 rounded-lg flex items-center justify-center text-black font-bold text-lg">
                            M
                        </div>
                        <span className="font-bold tracking-tighter text-xl text-white">MAGNITUDE</span>
                    </div>

                    {/* Desktop Links (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <button className="hover:text-white transition-colors">Features</button>
                        <button className="hover:text-white transition-colors">Pricing</button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-mag-10 transition-colors"
                        >
                            <Zap size={16} className="fill-current" />
                            <span>TRY DEMO</span>

                        </button>
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        className="md:hidden z-50 text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-bg pt-24 px-6 md:hidden flex flex-col gap-6"
                    >
                        <button onClick={() => navigate('/dashboard')} className="text-2xl font-bold text-white text-left">
                            Launch Demo
                        </button>
                        <button className="text-2xl font-bold text-gray-500 text-left">Features</button>
                        <button className="text-2xl font-bold text-gray-500 text-left">Pricing</button>
                        <button className="text-2xl font-bold text-gray-500 text-left">Log In</button>

                        <div className="mt-auto mb-10 p-6 bg-surface rounded-xl border border-white/10">
                            <p className="text-sm text-gray-400">Mobile V2.0 Active</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;