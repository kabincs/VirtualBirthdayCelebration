import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake } from './Cake';
import { InteractiveKnife } from './InteractiveKnife';
import { BlowCandlesButton } from './BlowCandlesButton';
import { Step } from '../types';

interface BirthdaySceneProps {
  currentStep: Step;
  candlesBlown: boolean;
  cakeCut: boolean;
  sliceSelected: boolean;
  onBlowCandles: () => void;
  onKnifeStartDrag: () => void;
  onKnifeEndDrag: () => void;
  onCutTriggered: () => void;
  onClickSlice: () => void;
}

export function BirthdayScene({
  currentStep,
  candlesBlown,
  cakeCut,
  sliceSelected,
  onBlowCandles,
  onKnifeStartDrag,
  onKnifeEndDrag,
  onCutTriggered,
  onClickSlice,
}: BirthdaySceneProps) {
  const cutTargetRef = useRef<HTMLDivElement | null>(null);
  const [isCuttingAreaHighlighted, setIsCuttingAreaHighlighted] = useState(false);

  // Flying slice animation state
  const [isSliceFlying, setIsSliceFlying] = useState(false);

  const handleSliceClick = () => {
    if (currentStep !== 'take-slice' || isSliceFlying) return;
    setIsSliceFlying(true);
    // After animation, trigger parent slice selection
    setTimeout(() => {
      onClickSlice();
      setIsSliceFlying(false);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-[540px] md:min-h-[580px] flex flex-col items-center justify-center px-4 py-6 select-none overflow-visible">
      {/* 🎈 FESTIVE BACKGROUND BALLOONS 🎈 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Balloon 1: Top Left Coral */}
        <div className="absolute top-6 left-4 md:left-12 animate-balloon-1">
          <BalloonSvg color="#F43F5E" shine="#FECDD3" size={64} />
        </div>

        {/* Balloon 2: Top Right Gold */}
        <div className="absolute top-10 right-6 md:right-16 animate-balloon-2">
          <BalloonSvg color="#F59E0B" shine="#FEF3C7" size={56} />
        </div>

        {/* Balloon 3: Mid Left Purple */}
        <div className="absolute top-36 left-2 md:left-8 animate-balloon-3 opacity-80">
          <BalloonSvg color="#8B5CF6" shine="#EDE9FE" size={48} />
        </div>

        {/* Balloon 4: Mid Right Turquoise */}
        <div className="absolute top-44 right-4 md:right-10 animate-balloon-4 opacity-85">
          <BalloonSvg color="#06B6D4" shine="#CFFAFE" size={52} />
        </div>

        {/* Party Bunting Pennants Banner across the top */}
        <div className="absolute top-0 inset-x-0 flex justify-around opacity-75">
          {['#EC4899', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#F43F5E', '#06B6D4', '#EAB308'].map(
            (c, i) => (
              <div
                key={i}
                className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] shadow-xs"
                style={{ borderTopColor: c }}
              />
            )
          )}
        </div>
      </div>

      {/* FLYING SLICE ANIMATION (When user clicks the slice in Step 4) */}
      <AnimatePresence>
        {isSliceFlying && (
          <motion.div
            initial={{
              position: 'fixed',
              top: '50%',
              left: '55%',
              scale: 1,
              opacity: 1,
              zIndex: 999,
            }}
            animate={{
              top: '25%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              scale: 0.6,
              rotate: 20,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="pointer-events-none text-7xl flex flex-col items-center"
          >
            <span>🍰</span>
            <span className="text-2xl animate-ping">✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CENTRAL STAGE: Cake in center + Knife Tray to the side */}
      <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-10 my-auto z-10">
        {/* Knife and Tray Station on Left/Bottom */}
        <div className="order-2 lg:order-1 flex flex-col items-center">
          <InteractiveKnife
            enabled={currentStep === 'cut-cake'}
            isCut={cakeCut}
            cutTargetRef={cutTargetRef}
            onStartDrag={onKnifeStartDrag}
            onEndDrag={onKnifeEndDrag}
            onProximityChange={setIsCuttingAreaHighlighted}
            onCutTriggered={onCutTriggered}
          />

          {/* Helper hint below knife */}
          {currentStep === 'cut-cake' && !cakeCut && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold text-pink-700 bg-pink-50/90 border border-pink-200 px-3 py-1 rounded-full mt-2 shadow-xs"
            >
              Move your mouse over the knife and drag it toward the cake.
            </motion.p>
          )}
        </div>

        {/* HERO CAKE in Center */}
        <div className="order-1 lg:order-2 flex flex-col items-center">
          <Cake
            candlesBlown={candlesBlown}
            cakeCut={cakeCut}
            sliceSelected={sliceSelected}
            isCuttingAreaHighlighted={isCuttingAreaHighlighted}
            canClickSlice={currentStep === 'take-slice' && !sliceSelected}
            onClickSlice={handleSliceClick}
            cutTargetRef={cutTargetRef}
          />
        </div>
      </div>

      {/* BOTTOM ACTION BUTTON: Blow Candles (Step 1) */}
      <div className="mt-4 md:mt-6 z-20">
        <AnimatePresence>
          {currentStep === 'blow-candles' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <BlowCandlesButton
                candlesBlown={candlesBlown}
                onBlowCandles={onBlowCandles}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Balloon with string illustration
 */
function BalloonSvg({ color, shine, size }: { color: string; shine: string; size: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 90" className="drop-shadow-md">
      {/* Balloon body */}
      <path
        d="M 30 5 C 48 5, 56 22, 56 38 C 56 58, 33 66, 30 68 C 27 66, 4 58, 4 38 C 4 22, 12 5, 30 5 Z"
        fill={color}
      />
      {/* Balloon reflection */}
      <ellipse cx="20" cy="22" rx="6" ry="12" fill={shine} opacity="0.6" transform="rotate(-25 20 22)" />
      {/* Balloon knot */}
      <polygon points="26,67 34,67 36,72 24,72" fill={color} />
      {/* Balloon string */}
      <path
        d="M 30 72 Q 22 78, 30 84 Q 36 88, 30 92"
        stroke="#94A3B8"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}
