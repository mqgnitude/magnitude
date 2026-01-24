import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const LessonView = ({ node, onBack }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [quizStatus, setQuizStatus] = useState(null); // 'correct' | 'wrong' | null

  const handleOptionClick = (index, correctIndex) => {
    if (index === correctIndex) {
      setQuizStatus('correct');
    } else {
      setQuizStatus('wrong');
    }
  };

  return (
    <div className="fixed inset-0 bg-bg z-[60] overflow-y-auto flex flex-col">

      {/* Navbar */}
      <div className="sticky top-0 bg-bg/90 backdrop-blur border-b border-white/10 p-4 flex items-center gap-4 z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <h2 className="text-sm text-gray-400 font-mono uppercase tracking-widest">BRIEFING</h2>
          <h1 className="text-xl font-bold text-white">{node.title}</h1>
        </div>
        <div className="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-mag-2 w-1/3" /> {/* Mock Progress */}
        </div>
      </div>

      {/* Content Stream */}
      <div className="max-w-2xl mx-auto w-full p-6 pb-32 space-y-12">

        {node.lesson?.sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >

            {/* TEXT BLOCK */}
            {section.type === 'text' && (
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                {section.content}
              </p>
            )}

            {/* IMAGE BLOCK */}
            {section.type === 'image' && (
              <div className="bg-black/40 border border-white/5 rounded-2xl p-2">
                <img src={section.src} alt="diagram" className="w-full rounded-xl" />
                <div className="p-3 text-center text-xs text-gray-500 font-mono">
                  FIG 1.0 // {section.caption}
                </div>
              </div>
            )}

            {/* INTERACTIVE TABLE (Simple version) */}
            {section.type === 'interactive' && (
              <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-white/5 p-4 border-b border-white/5 font-bold text-mag-2">
                  {section.title}
                </div>
                {section.data.map((row, i) => (
                  <div key={i} className="flex justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-default">
                    <span className="font-bold text-white">{row.label}</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-400"> {row.charge}</div>
                      <div className="text-xs text-gray-400"> {row.mass}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CHECKPOINT (Quiz) */}
            {section.type === 'checkpoint' && (
              <div className="bg-gradient-to-br from-gray-900 to-black border border-mag-2/30 rounded-2xl p-8 text-center space-y-6">
                <h3 className="text-2xl font-bold text-white">Test your knowledge:</h3>
                <p className="text-gray-400">{section.question}</p>

                <div className="grid grid-cols-1 gap-3">
                  {section.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(i, section.correct)}
                      disabled={quizStatus === 'correct'}
                      className={`p-4 rounded-xl border font-bold transition-all ${quizStatus === 'correct' && i === section.correct ? 'bg-green-500/20 border-green-500 text-green-500' :
                        quizStatus === 'wrong' && quizStatus !== 'correct' ? 'bg-red-500/10 border-red-500/50 text-red-500' :
                          'bg-surface border-white/10 hover:border-mag-2 text-gray-300 hover:text-white'
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {quizStatus === 'correct' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center justify-center gap-2 text-green-500 font-bold">
                    <CheckCircle /> LESSON COMPLETE!
                  </motion.div>
                )}
              </div>
            )}

          </motion.div>
        ))}

      </div>

    </div>
  );
};

export default LessonView;