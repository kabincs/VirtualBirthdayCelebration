/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { InstructionBar } from './components/InstructionBar';
import { BirthdayScene } from './components/BirthdayScene';
import { CelebrationScreen } from './components/CelebrationScreen';
import { Step, Occasion } from './types';
import { soundEngine } from './utils/audio';
import {
  triggerBlowConfetti,
  triggerCutSparkles,
  triggerSliceConfetti,
  triggerGrandCelebration,
} from './utils/confetti';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('blow-candles');
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [knifeDragging, setKnifeDragging] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [sliceSelected, setSliceSelected] = useState(false);
  const [personName, setPersonName] = useState('Aman');
  const [occasion, setOccasion] = useState<Occasion>('birthday');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync soundEngine enabled state
  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Step 1: Blow out candles
  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    soundEngine.playBlowSound();
    triggerBlowConfetti();

    // Advance to Step 2 after candle puff animation
    setTimeout(() => {
      setCurrentStep('cut-cake');
    }, 600);
  };

  // Step 2: Knife pickup
  const handleKnifeStartDrag = () => {
    setKnifeDragging(true);
    soundEngine.playKnifePickup();
  };

  const handleKnifeEndDrag = () => {
    setKnifeDragging(false);
  };

  // Step 3: Knife cuts cake
  const handleCutTriggered = () => {
    if (cakeCut) return;
    setCakeCut(true);
    soundEngine.playCutSound();
    triggerCutSparkles();

    // Advance to Step 3: Take a slice
    setTimeout(() => {
      setCurrentStep('take-slice');
    }, 400);
  };

  // Step 4: Click cake slice to pick up
  const handleClickSlice = () => {
    if (sliceSelected) return;
    setSliceSelected(true);
    soundEngine.playSliceLift();
    triggerSliceConfetti();

    // Transition to Grand Celebration
    setTimeout(() => {
      setCurrentStep('celebration');
      soundEngine.playCelebrationFanfare();
      triggerGrandCelebration();
    }, 650);
  };

  // Reset entire experience back to Step 1
  const handleReset = () => {
    setCurrentStep('blow-candles');
    setCandlesBlown(false);
    setKnifeDragging(false);
    setCakeCut(false);
    setSliceSelected(false);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-amber-50/70 via-pink-50/60 to-rose-100/50 text-slate-800 relative overflow-x-hidden selection:bg-pink-300 selection:text-pink-900">
      {/* Background festive ambient gradient circles */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-pink-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Instruction & Progress Bar */}
      <InstructionBar
        currentStep={currentStep}
        knifeDragging={knifeDragging}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        personName={personName}
        onChangeName={setPersonName}
        occasion={occasion}
        onChangeOccasion={setOccasion}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 flex flex-col items-center justify-center relative w-full my-auto">
        {currentStep !== 'celebration' ? (
          <BirthdayScene
            currentStep={currentStep}
            candlesBlown={candlesBlown}
            cakeCut={cakeCut}
            sliceSelected={sliceSelected}
            onBlowCandles={handleBlowCandles}
            onKnifeStartDrag={handleKnifeStartDrag}
            onKnifeEndDrag={handleKnifeEndDrag}
            onCutTriggered={handleCutTriggered}
            onClickSlice={handleClickSlice}
          />
        ) : (
          <CelebrationScreen
            personName={personName}
            occasion={occasion}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Subtle celebratory footer */}
      <footer className="w-full text-center py-2 text-xs font-semibold text-slate-400 select-none z-10">
        ✨ Interactive Virtual Birthday Experience • Made with Joy & Cake 🎂
      </footer>
    </div>
  );
}
