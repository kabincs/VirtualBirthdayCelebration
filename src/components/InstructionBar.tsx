import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, CheckCircle2, Sparkles } from 'lucide-react';
import { Step } from '../types';

interface InstructionBarProps {
  currentStep: Step;
  knifeDragging: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  personName: string;
  onChangeName: (name: string) => void;
}

const stepsConfig = [
  { id: 'blow-candles', number: 1, label: 'Blow Candles', icon: '🕯️' },
  { id: 'cut-cake', number: 2, label: 'Cut Cake', icon: '🔪' },
  { id: 'take-slice', number: 3, label: 'Take a Slice', icon: '🍰' },
  { id: 'celebration', number: 4, label: 'Celebrate', icon: '🎉' },
];

export function InstructionBar({
  currentStep,
  knifeDragging,
  soundEnabled,
  onToggleSound,
  personName,
  onChangeName,
}: InstructionBarProps) {
  // Determine message
  const getInstructionText = () => {
    switch (currentStep) {
      case 'blow-candles':
        return "🎂 It's Birthday Time! Click the button below to blow out the candles!";
      case 'cut-cake':
        if (knifeDragging) {
          return "🔪 Move the knife to the highlighted area on the cake to cut!";
        }
        return "🔪 Great! Now grab the knife and touch the cake to cut a slice.";
      case 'take-slice':
        return "🍰 One more step! Click the cake slice to celebrate!";
      case 'celebration':
        return `🎉 Happy Birthday${personName ? `, ${personName}` : ''}! Enjoy your special day!`;
      default:
        return "🎂 Happy Birthday!";
    }
  };

  const getStepIndex = (step: Step) => {
    switch (step) {
      case 'blow-candles': return 0;
      case 'cut-cake': return 1;
      case 'take-slice': return 2;
      case 'celebration': return 3;
    }
  };

  const currentIdx = getStepIndex(currentStep);

  return (
    <header className="w-full max-w-4xl mx-auto px-4 pt-4 pb-2 select-none z-20">
      {/* Top Utility Bar with Name and Audio controls */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-pink-100/80">
          <span className="text-sm">🎈 Celebrating:</span>
          <input
            type="text"
            value={personName}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Birthday Star"
            maxLength={20}
            aria-label="Birthday person name"
            className="text-sm font-bold text-pink-600 bg-transparent border-b border-dashed border-pink-300 focus:outline-none focus:border-pink-500 max-w-[140px] px-1 py-0.5"
          />
        </div>

        <button
          type="button"
          onClick={onToggleSound}
          title={soundEnabled ? "Mute sounds" : "Enable sounds"}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-amber-100 text-slate-600 hover:text-pink-600 hover:border-pink-200 shadow-sm transition cursor-pointer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>Sound On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>Muted</span>
            </>
          )}
        </button>
      </div>

      {/* Main Dynamic Instruction Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-pink-100 p-4 md:p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200/40 via-amber-100/20 to-transparent rounded-bl-full pointer-events-none" />
        
        <div className="flex items-center justify-center text-center min-h-[3.25rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={getInstructionText()}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-lg md:text-xl font-bold text-slate-800 tracking-tight flex items-center justify-center gap-2 flex-wrap"
            >
              <span>{getInstructionText()}</span>
              {currentStep === 'celebration' && (
                <Sparkles className="w-5 h-5 text-amber-500 animate-bounce inline" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 pt-3 border-t border-slate-100/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {stepsConfig.map((s, idx) => {
              const isCompleted = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20 ring-2 ring-pink-300 ring-offset-1'
                      : isCompleted
                      ? 'bg-pink-50 text-pink-700 border border-pink-200/60'
                      : 'bg-slate-50 text-slate-400 border border-slate-100'
                  }`}
                >
                  <span className="text-sm shrink-0">{s.icon}</span>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] uppercase tracking-wider opacity-80 leading-none">
                      Step {s.number}
                    </span>
                    <span className="truncate font-bold leading-tight">{s.label}</span>
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0 ml-auto" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
