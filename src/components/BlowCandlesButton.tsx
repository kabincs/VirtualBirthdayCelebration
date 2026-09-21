import { motion } from 'motion/react';
import { Wind, Sparkles, Check } from 'lucide-react';

interface BlowCandlesButtonProps {
  candlesBlown: boolean;
  onBlowCandles: () => void;
}

export function BlowCandlesButton({
  candlesBlown,
  onBlowCandles,
}: BlowCandlesButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center select-none z-20">
      <motion.button
        type="button"
        id="blow-candles-btn"
        onClick={candlesBlown ? undefined : onBlowCandles}
        disabled={candlesBlown}
        whileHover={!candlesBlown ? { scale: 1.05, y: -2 } : undefined}
        whileTap={!candlesBlown ? { scale: 0.95 } : undefined}
        className={`relative group px-8 py-4 rounded-full font-bold text-lg md:text-xl shadow-xl transition-all duration-300 flex items-center gap-3 ${
          candlesBlown
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300 shadow-none'
            : 'bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 text-white cursor-pointer hover:shadow-pink-500/35 hover:shadow-2xl border-2 border-white/70 ring-4 ring-pink-300/40'
        }`}
      >
        {!candlesBlown ? (
          <>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            >
              <Wind className="w-6 h-6 text-yellow-200" />
            </motion.div>
            <span className="tracking-wide drop-shadow-sm font-['Fredoka',sans-serif]">
              💨 Blow Candles
            </span>
            <Sparkles className="w-5 h-5 text-amber-300 opacity-80 group-hover:rotate-45 transition-transform" />
          </>
        ) : (
          <>
            <Check className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium">Candles Blown Out! ✨</span>
          </>
        )}

        {/* Pulsing ring when active */}
        {!candlesBlown && (
          <span className="absolute -inset-1 rounded-full border border-pink-400 opacity-75 animate-ping pointer-events-none" />
        )}
      </motion.button>

      {/* Helpful small subtext when button is ready */}
      {!candlesBlown && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-xs font-semibold text-slate-500 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-amber-100 shadow-xs"
        >
          Make a birthday wish first! 🌟
        </motion.span>
      )}
    </div>
  );
}
