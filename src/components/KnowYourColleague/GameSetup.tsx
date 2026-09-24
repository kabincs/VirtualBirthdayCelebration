import { useState } from 'react';
import { motion } from 'motion/react';
import { Target, ArrowLeft, Play } from 'lucide-react';
import { GameQuestion } from '../../types';

interface GameSetupProps {
  initialQuestions: GameQuestion[];
  onStartGame: (questions: GameQuestion[]) => void;
  onBack: () => void;
}

export function GameSetup({ initialQuestions, onStartGame, onBack }: GameSetupProps) {
  const [drafts, setDrafts] = useState<string[]>(initialQuestions.map((q) => q.question));

  const handleChange = (index: number, value: string) => {
    setDrafts((prev) => prev.map((q, idx) => (idx === index ? value : q)));
  };

  const handleStart = () => {
    const finalQuestions: GameQuestion[] = drafts.map((question) => ({
      question: question.trim() || 'Untitled question',
      answer: '',
      revealed: false,
    }));
    onStartGame(finalQuestions);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="bg-white/90 backdrop-blur-xl rounded-3xl p-5 sm:p-8 shadow-2xl border-2 border-pink-200/80 relative overflow-hidden"
    >
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-pink-400/15 rounded-full blur-3xl pointer-events-none" />

      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-pink-600 transition mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Birthday Celebration</span>
      </button>

      <div className="flex items-center gap-2 mb-1.5">
        <Target className="w-6 h-6 text-pink-600" />
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Know Your Colleague
        </h1>
      </div>
      <p className="text-sm sm:text-base text-slate-600 font-medium mb-6">
        The birthday person secretly answers 5 questions. Everyone else guesses. Edit the questions below, then start the game!
      </p>

      <div className="space-y-3 mb-6">
        {drafts.map((question, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-pink-50/60 border border-pink-100 rounded-2xl p-3">
            <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-pink-500 text-white text-xs font-bold mt-0.5">
              {idx + 1}
            </span>
            <label className="flex-1">
              <span className="sr-only">Question {idx + 1}</span>
              <input
                type="text"
                value={question}
                onChange={(e) => handleChange(idx, e.target.value)}
                maxLength={140}
                className="w-full bg-white text-sm sm:text-base font-semibold text-slate-800 rounded-xl px-3 py-2 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </label>
          </div>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={handleStart}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base shadow-xl hover:shadow-pink-500/30 transition-all border-2 border-white/60 cursor-pointer"
      >
        <Play className="w-5 h-5" />
        <span>Start Game</span>
      </motion.button>
    </motion.div>
  );
}
