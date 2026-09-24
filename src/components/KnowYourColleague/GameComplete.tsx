import { motion } from 'motion/react';
import { Cake, Heart, PartyPopper, RotateCcw } from 'lucide-react';

interface GameCompleteProps {
  onPlayAgain: () => void;
  onBack: () => void;
}

export function GameComplete({ onPlayAgain, onBack }: GameCompleteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 text-center shadow-2xl border-2 border-pink-200/80 relative overflow-hidden"
    >
      <div className="absolute -top-12 -left-12 w-44 h-44 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      <motion.h1
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 mb-3"
      >
        🎉 GAME COMPLETE!
      </motion.h1>

      <p className="text-base sm:text-lg font-bold text-slate-700 mb-6">
        How well do you know your colleague?
      </p>

      <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base font-bold text-slate-600 mb-8 flex-wrap">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-rose-500" /> 5 Questions
        </span>
        <span className="inline-flex items-center gap-1.5">
          <PartyPopper className="w-4 h-4 text-amber-500" /> 5 Secrets
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Cake className="w-4 h-4 text-pink-500" /> 1 Birthday Baby
        </span>
      </div>

      <p className="text-sm font-semibold text-slate-500 mb-8">Thank you for playing!</p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <motion.button
          type="button"
          onClick={onPlayAgain}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-pink-300 text-pink-600 font-bold shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base shadow-xl hover:shadow-pink-500/30 transition-all border-2 border-white/60 cursor-pointer"
        >
          <Cake className="w-5 h-5" />
          <span>Back to Birthday Celebration</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
