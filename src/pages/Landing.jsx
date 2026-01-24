import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bg text-white font-sans overflow-x-hidden">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-24 pb-4 md:pt-32 md:pb-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">

                {/* Copy */}
                <div className="flex-1 space-y-4 md:space-y-8 z-10 text-center md:text-left">

                    {/* TAG: Unified Purple */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                        v2.0 Mobile Ready
                    </div>

                    {/* TITLE: Unified Purple Gradient */}
                    <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.95] md:leading-[0.9]">
                        STUDY SMARTER, WITH
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                            MAGNITUDE.
                        </span>
                    </h1>

                    <p className="text-base md:text-xl text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Introducing Magnitude. An interactive revision website with engaging games and specialised lessons.
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 justify-center md:justify-start">
                        {/* PRIMARY BUTTON: White text on Purple Button for pop */}
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full md:w-auto bg-white text-black hover:bg-purple-50 px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                        >
                            Start Free Demo <ArrowRight size={18} />
                        </button>
                        <div className="text-xs md:text-sm text-gray-500">
                            (No account required.)
                        </div>
                    </div>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full relative mt-4 md:mt-0">
                    {/* GLOW: Unified Purple */}
                    <div className="absolute inset-0 bg-violet-600/20 blur-[60px] md:blur-[100px] rounded-full" />

                    <div className="relative bg-surface border border-white/10 rounded-2xl p-3 md:p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                        {/* Mock UI content */}
                        <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/5 pb-2 md:pb-4">
                            <div className="flex gap-2">
                                <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-red-500" />
                                <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-yellow-500" />
                                <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-500" />
                            </div>
                            <div className="h-1.5 md:h-2 w-16 md:w-20 bg-gray-800 rounded-full" />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <div className="h-2 md:h-3 w-3/4 bg-gray-700 rounded animate-pulse" />
                            <div className="h-2 md:h-3 w-1/2 bg-gray-800 rounded" />

                            {/* Inner Card */}
                            <div className="h-20 md:h-32 w-full bg-[#0f172a] rounded border border-purple-500/20 mt-2 md:mt-4 flex flex-col items-center justify-center gap-2">
                                <Zap className="text-purple-500" size={24} />
                                <div className="text-purple-300 font-mono text-[10px] md:text-xs tracking-widest">
                                    SYSTEM OPTIMIZED
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MARQUEE */}
            <Marquee />

            {/* Feature Grid */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Active Recall", desc: "Forced interaction beats passive reading." },
                        { title: "Global Leaderboards", desc: "Compete against students worldwide." },
                        { title: "Curated Content", desc: "Verified by top examiners." }
                    ].map((feature, i) => (
                        <div key={i} className="p-6 bg-surface border border-white/5 rounded-xl hover:border-purple-500/30 transition-colors group">
                            <CheckCircle2 className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-200 transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Landing;