import { motion } from 'motion/react';
import { Eye, Users } from 'lucide-react';

interface WaitingForRevealProps {
  personName: string;
  onStartReveal: () => void;
}

export function WaitingForReveal({ personName, onStartReveal }: WaitingForRevealProps) {
  const name = personName || 'The birthday star';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 text-center shadow-2xl border-2 border-pink-200/80 relative overflow-hidden"
    >
      <div className="absolute -top-12 -left-12 w-44 h-44 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      <motion.h1
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 mb-3"
      >
        🎉 All Answers Are Locked!
      </motion.h1>

      <p className="text-base sm:text-lg font-bold text-slate-700 mb-1">
        {name} has answered all 5 questions.
      </p>
      <p className="text-sm sm:text-base font-semibold text-slate-500 mb-6">
        Now it's time to see how well everyone knows {name}! 😎
      </p>

      <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 font-bold text-sm px-4 py-2 rounded-full mb-8">
        <Users className="w-4 h-4" />
        <span>Everyone, make your guesses!</span>
      </div>

      <div>
        <motion.button
          type="button"
          onClick={onStartReveal}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Reveal birthday person's answer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-pink-500/30 transition-all border-2 border-white/60 cursor-pointer"
        >
          <Eye className="w-5 h-5" />
          <span>Reveal Answers</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
