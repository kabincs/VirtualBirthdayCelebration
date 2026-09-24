import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { GameQuestion, GameState } from '../../types';
import { triggerRevealBurst, triggerGrandCelebration } from '../../utils/confetti';
import { GameSetup } from './GameSetup';
import { AnsweringStage } from './AnsweringStage';
import { WaitingForReveal } from './WaitingForReveal';
import { AnswerReveal } from './AnswerReveal';
import { GameComplete } from './GameComplete';

const DEFAULT_QUESTIONS: GameQuestion[] = [
  { question: 'What is your dream travel destination?', answer: '', revealed: false },
  { question: 'What food can you eat every day without getting bored?', answer: '', revealed: false },
  { question: 'What is your most useless talent?', answer: '', revealed: false },
  { question: 'If you suddenly got \u20B91 crore, what would you buy first?', answer: '', revealed: false },
  { question: 'Which colleague would survive longest with you on a deserted island?', answer: '', revealed: false },
];

interface KnowYourColleagueProps {
  personName: string;
  onBack: () => void;
}

export function KnowYourColleague({ personName, onBack }: KnowYourColleagueProps) {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [questions, setQuestions] = useState<GameQuestion[]>(DEFAULT_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealIndex, setRevealIndex] = useState(0);

  const handleStartGame = (finalQuestions: GameQuestion[]) => {
    setQuestions(finalQuestions);
    setCurrentQuestionIndex(0);
    setGameState('answering');
  };

  const handleAnswerSubmitted = (answer: string) => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === currentQuestionIndex ? { ...q, answer } : q))
    );

    if (currentQuestionIndex === questions.length - 1) {
      setGameState('waitingForReveal');
    } else {
      setCurrentQuestionIndex((idx) => idx + 1);
    }
  };

  const handleStartReveal = () => {
    setRevealIndex(0);
    setGameState('revealing');
  };

  const handleRevealAnswer = () => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === revealIndex ? { ...q, revealed: true } : q))
    );
    triggerRevealBurst();
  };

  const handleNextReveal = () => {
    if (revealIndex === questions.length - 1) {
      setGameState('completed');
      triggerGrandCelebration();
    } else {
      setRevealIndex((idx) => idx + 1);
    }
  };

  const handlePlayAgain = () => {
    setQuestions(DEFAULT_QUESTIONS);
    setCurrentQuestionIndex(0);
    setRevealIndex(0);
    setGameState('setup');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 z-30 relative select-none">
      <AnimatePresence mode="wait">
        {gameState === 'setup' && (
          <GameSetup
            key="setup"
            initialQuestions={questions}
            onStartGame={handleStartGame}
            onBack={onBack}
          />
        )}

        {gameState === 'answering' && (
          <AnsweringStage
            key="answering"
            personName={personName}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onAnswerSubmitted={handleAnswerSubmitted}
          />
        )}

        {gameState === 'waitingForReveal' && (
          <WaitingForReveal key="waiting" personName={personName} onStartReveal={handleStartReveal} />
        )}

        {gameState === 'revealing' && (
          <AnswerReveal
            key="revealing"
            personName={personName}
            questions={questions}
            revealIndex={revealIndex}
            onRevealAnswer={handleRevealAnswer}
            onNext={handleNextReveal}
          />
        )}

        {gameState === 'completed' && (
          <GameComplete key="completed" onPlayAgain={handlePlayAgain} onBack={onBack} />
        )}
      </AnimatePresence>
    </div>
  );
}
