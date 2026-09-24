import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Users, ArrowRight, PartyPopper } from 'lucide-react';
import { GameQuestion } from '../../types';

interface AnswerRevealProps {
  personName: string;
  questions: GameQuestion[];
  revealIndex: number;
  onRevealAnswer: () => void;
  onNext: () => void;
}

export function AnswerReveal({
  personName,
  questions,
  revealIndex,
  onRevealAnswer,
  onNext,
}: AnswerRevealProps) {
  const [teamGuess, setTeamGuess] = useState('');
  const total = questions.length;
  const current = questions[revealIndex];
  const isLast = revealIndex === total - 1;
  const name = personName || 'The Birthday Star';

  // Clear the guess scratchpad for each new question
  useEffect(() => {
    setTeamGuess('');
  }, [revealIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="bg-white/90 backdrop-blur-xl rounded-3xl p-5 sm:p-8 shadow-2xl border-2 border-pink-200/80 relative overflow-hidden"
    >
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-pink-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between text-xs font-bold text-pink-600 uppercase tracking-wider mb-4">
        <span>
          Question {revealIndex + 1} / {total}
        </span>
        {current.revealed && (
          <span className="inline-flex items-center gap-1 text-emerald-600">
            ✅ Answer Revealed
          </span>
        )}
      </div>

      <p className="text-xl sm:text-2xl font-bold text-slate-800 mb-5 leading-snug">
        {current.question}
      </p>

      <div className="flex items-center gap-2 text-sm font-bold text-sky-700 mb-2">
        <Users className="w-4 h-4" />
        <span>Team Guess (optional)</span>
      </div>
      <input
        type="text"
        value={teamGuess}
        onChange={(e) => setTeamGuess(e.target.value)}
        placeholder="Type the team's guess here…"
        aria-label="Team's guess for this question"
        disabled={current.revealed}
        className="w-full text-base font-semibold text-slate-700 bg-sky-50/70 rounded-xl px-4 py-2.5 border-2 border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-60 mb-6"
      />

      <AnimatePresence mode="wait">
        {!current.revealed ? (
          <motion.div key="hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-500 font-bold text-sm px-4 py-2 rounded-full mb-6">
              <span>🔒 HIDDEN</span>
            </div>
            <div>
              <motion.button
                type="button"
                onClick={onRevealAnswer}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Reveal birthday person's answer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base shadow-xl hover:shadow-pink-500/30 transition-all border-2 border-white/60 cursor-pointer"
              >
                <Eye className="w-5 h-5" />
                <span>Reveal Answer</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.7, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            className="mb-6"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-1">
              🎂 {name.toUpperCase()}'S ANSWER
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xl sm:text-2xl px-6 py-3 rounded-2xl shadow-lg">
              <PartyPopper className="w-5 h-5 text-yellow-300" />
              <span>{current.answer}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {current.revealed && (
        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-lg hover:shadow-sky-500/30 transition-all cursor-pointer"
        >
          <span>{isLast ? 'See Final Results' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  );
}
