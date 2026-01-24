import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bg text-white font-sans overflow-x-hidden">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-24 pb-12 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* Copy */}
                <div className="flex-1 space-y-6 md:space-y-8 z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-mag-9/30 bg-mag-9/10 text-mag-9 text-xs font-bold tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-mag-9 animate-pulse" />
                        v2.0 Mobile Ready
                    </div>

                    {/* Responsive Text Size */}
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                        STUDY SMARTER, WITH
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mag-1 to-mag-2">
                            MAGNITUDE.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Introducing Magnitude. An interactive revision website with engaging games and specialised lessons.
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-lg font-bold text-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                            Start Free Demo <ArrowRight size={20} />
                        </button>
                        <div className="text-sm text-gray-500">
                            (No account required.)
                        </div>
                    </div>
                </div>

                {/* Visual (Hidden on very small phones if needed, or scaled down) */}
                <div className="flex-1 w-full relative mt-8 md:mt-0">
                    <div className="absolute inset-0 bg-mag-9/20 blur-[60px] md:blur-[100px] rounded-full" />

                    <div className="relative bg-surface border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                        {/* Mock UI content remains the same */}
                        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                            <div className="h-3 w-3 rounded-full bg-red-500" />
                            <div className="h-2 w-20 bg-gray-800 rounded-full" />
                        </div>
                        <div className="space-y-3">
                            <div className="h-3 w-3/4 bg-gray-700 rounded animate-pulse" />
                            <div className="h-3 w-1/2 bg-gray-800 rounded" />
                            <div className="h-24 md:h-32 w-full bg-black/50 rounded border border-white/5 mt-4 flex items-center justify-center text-gray-600 font-mono text-xs">
                 // MOBILE OPTIMIZED
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Marquee />

            {/* Feature Grid - Stacked on Mobile */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Active Recall", desc: "Forced interaction beats passive reading." },
                        { title: "Global Leaderboards", desc: "Compete against students worldwide." },
                        { title: "Curated Content", desc: "Verified by top examiners." }
                    ].map((feature, i) => (
                        <div key={i} className="p-6 bg-surface border border-white/5 rounded-xl">
                            <CheckCircle2 className="text-mag-2 mb-4" />
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
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