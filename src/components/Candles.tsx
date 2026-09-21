import { motion, AnimatePresence } from 'motion/react';

interface CandlesProps {
  candlesBlown: boolean;
}

interface CandleConfig {
  id: number;
  x: number; // percentage across cake top
  height: number;
  primaryColor: string;
  stripeColor: string;
  delayClass: string;
  tilt: number;
}

const CANDLES: CandleConfig[] = [
  { id: 1, x: 26, height: 58, primaryColor: '#EC4899', stripeColor: '#FDF2F8', delayClass: 'animate-flame', tilt: -3 },
  { id: 2, x: 38, height: 66, primaryColor: '#8B5CF6', stripeColor: '#EDE9FE', delayClass: 'animate-flame-delayed-1', tilt: -1 },
  { id: 3, x: 50, height: 72, primaryColor: '#F59E0B', stripeColor: '#FEF3C7', delayClass: 'animate-flame-delayed-2', tilt: 0 },
  { id: 4, x: 62, height: 65, primaryColor: '#06B6D4', stripeColor: '#ECFEFF', delayClass: 'animate-flame', tilt: 1 },
  { id: 5, x: 74, height: 58, primaryColor: '#10B981', stripeColor: '#D1FAE5', delayClass: 'animate-flame-delayed-1', tilt: 3 },
];

export function Candles({ candlesBlown }: CandlesProps) {
  return (
    <div className="absolute top-[8%] left-[10%] right-[10%] h-[120px] pointer-events-none z-20">
      {CANDLES.map((c) => (
        <div
          key={c.id}
          className="absolute bottom-0 flex flex-col items-center"
          style={{
            left: `${c.x}%`,
            transform: `translateX(-50%) rotate(${c.tilt}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          {/* Flame or Smoke */}
          <div className="relative w-7 h-10 flex items-center justify-center -mb-1">
            <AnimatePresence>
              {!candlesBlown ? (
                <motion.div
                  key="flame"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: [1, 1.2, 0], opacity: [1, 0.8, 0], y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`relative flex items-center justify-center ${c.delayClass}`}
                >
                  {/* Outer Flame Glow */}
                  <div className="absolute w-8 h-10 rounded-full bg-amber-400/30 blur-md pointer-events-none" />
                  
                  {/* Flame shape */}
                  <div
                    className="w-4 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
                    style={{
                      borderRadius: '50% 50% 35% 35% / 70% 70% 30% 30%',
                    }}
                  >
                    {/* Inner hot core */}
                    <div
                      className="w-2 h-4 mx-auto mt-2.5 rounded-full bg-gradient-to-t from-amber-200 to-white opacity-95"
                      style={{
                        borderRadius: '50% 50% 40% 40% / 70% 70% 30% 30%',
                      }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="smoke"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-2 flex flex-col items-center pointer-events-none"
                >
                  {/* Smoke puff */}
                  <div className="animate-smoke flex flex-col items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300/80 blur-[1px] mb-0.5" />
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-400/60 blur-[1.5px]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Candle Wick */}
          <div
            className={`w-[2.5px] h-3.5 transition-colors duration-500 ${
              candlesBlown ? 'bg-slate-700' : 'bg-slate-800'
            } rounded-t-sm`}
          />

          {/* Candle Body */}
          <div
            className="w-4 rounded-sm shadow-sm relative overflow-hidden border border-black/10"
            style={{
              height: `${c.height}px`,
              backgroundColor: c.primaryColor,
              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${c.stripeColor} 4px, ${c.stripeColor} 8px)`,
            }}
          >
            {/* Candle Highlight */}
            <div className="absolute inset-y-0 left-0.5 w-1 bg-white/40 rounded-full" />
            {/* Candle Shadow */}
            <div className="absolute inset-y-0 right-0 w-1 bg-black/15" />
          </div>

          {/* Base candle holder wax drop */}
          <div
            className="w-5 h-1.5 rounded-full -mt-0.5 shadow-sm opacity-90"
            style={{ backgroundColor: c.primaryColor }}
          />
        </div>
      ))}
    </div>
  );
}
