import { motion } from 'motion/react';
import { Sparkles, RotateCcw, Heart, Gift, PartyPopper } from 'lucide-react';

interface CelebrationScreenProps {
  personName: string;
  onReset: () => void;
}

export function CelebrationScreen({ personName, onReset }: CelebrationScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto px-4 py-6 z-40 relative select-none"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 text-center shadow-2xl border-2 border-pink-200/80 relative overflow-hidden">
        {/* Decorative corner glows */}
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Floating party badges */}
        <div className="flex justify-center gap-3 mb-4">
          <motion.span
            animate={{ rotate: [-8, 8, -8], y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 shadow-xs"
          >
            <PartyPopper className="w-3.5 h-3.5 text-amber-600" />
            <span>VIP Day</span>
          </motion.span>
          <motion.span
            animate={{ rotate: [8, -8, 8], y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 0.3 }}
            className="inline-flex items-center gap-1 bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full border border-pink-300 shadow-xs"
          >
            <Gift className="w-3.5 h-3.5 text-pink-600" />
            <span>Special Celebration</span>
          </motion.span>
        </div>

        {/* Big Animated Typography */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 tracking-tight font-['Fredoka',sans-serif] leading-tight mb-2 drop-shadow-sm"
        >
          🎉 HAPPY BIRTHDAY! 🎉
        </motion.h1>

        {personName && (
          <motion.h2
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-2xl sm:text-3xl font-extrabold text-pink-600 mb-3"
          >
            Dear {personName}! ✨
          </motion.h2>
        )}

        {/* Prompt secondary message */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-base sm:text-lg text-slate-700 font-semibold max-w-lg mx-auto mb-4 leading-relaxed"
        >
          May your day be filled with happiness, laughter and lots of cake! ❤️
        </motion.p>

        {/* Prompt subline: Mission Complete */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm sm:text-base px-5 py-2 rounded-full shadow-lg shadow-emerald-500/20 mb-6"
        >
          <span>Mission Complete: Cake successfully enjoyed! 🍰</span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
        </motion.div>

        {/* Interactive Party Hat and Cake Icon */}
        <div className="flex items-center justify-center gap-4 text-4xl mb-8">
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🎈
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🎂
          </motion.span>
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            🎁
          </motion.span>
        </div>

        {/* Celebrate Again Button */}
        <motion.button
          type="button"
          onClick={onReset}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-pink-500/30 transition-all border-2 border-white/60 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>🎂 Celebrate Again</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
