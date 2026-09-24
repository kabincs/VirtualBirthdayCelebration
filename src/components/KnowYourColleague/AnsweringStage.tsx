import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Users, Cake } from 'lucide-react';
import { GameQuestion } from '../../types';

interface AnsweringStageProps {
  personName: string;
  questions: GameQuestion[];
  currentQuestionIndex: number;
  onAnswerSubmitted: (answer: string) => void;
}

export function AnsweringStage({
  personName,
  questions,
  currentQuestionIndex,
  onAnswerSubmitted,
}: AnsweringStageProps) {
  const [questionStarted, setQuestionStarted] = useState(false);
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const total = questions.length;
  const current = questions[currentQuestionIndex];
  const progressPercent = (currentQuestionIndex / total) * 100;

  // Reset local state whenever a new question comes up
  useEffect(() => {
    setQuestionStarted(false);
    setAnswer('');
    setErrorMessage(null);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (questionStarted) {
      inputRef.current?.focus();
    }
  }, [questionStarted]);

  const handleSubmit = () => {
    if (!answer.trim()) {
      setErrorMessage('Please enter an answer 😄');
      return;
    }
    onAnswerSubmitted(answer.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      {/* Progress Indicator */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-pink-100 px-4 py-3">
        <div className="flex items-center justify-between text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">
          <span>
            Question {currentQuestionIndex + 1} / {total}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-pink-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Split Screen: Host/Team vs Birthday Baby */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT: Host / Team */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-slate-100 p-5 sm:p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-slate-700">
            <Users className="w-5 h-5 text-sky-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider">Host / Team</h2>
          </div>

          <p className="text-xs font-semibold text-slate-400 mb-1">
            Question {currentQuestionIndex + 1} of {total}
          </p>
          <p className="text-lg sm:text-xl font-bold text-slate-800 mb-6 leading-snug">
            {current.question}
          </p>

          <div className="mt-auto">
            {!questionStarted ? (
              <button
                type="button"
                onClick={() => setQuestionStarted(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-lg hover:shadow-sky-500/30 transition-all cursor-pointer"
              >
                <span>Start Question</span>
              </button>
            ) : (
              <div className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold">
                <span>🔒 Waiting for secret answer&hellip;</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Birthday Baby */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-pink-100 p-5 sm:p-6 flex flex-col relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-4 text-pink-700">
            <Cake className="w-5 h-5 text-pink-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider">
              {personName || 'Birthday Baby'}
            </h2>
          </div>

          <p className="text-sm font-semibold text-slate-500 mb-3">
            🔒 Your answer is hidden from everyone
          </p>

          <label htmlFor="secret-answer-input" className="sr-only">
            Secret answer
          </label>
          <input
            id="secret-answer-input"
            ref={inputRef}
            type="password"
            autoComplete="off"
            disabled={!questionStarted}
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder={questionStarted ? 'Type your answer here...' : 'Waiting for host to start question…'}
            aria-label="Type your secret answer, hidden from everyone"
            className="w-full text-lg font-bold tracking-widest text-pink-700 bg-pink-50/70 rounded-xl px-4 py-3 border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-60 disabled:cursor-not-allowed mb-2"
          />

          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="text-sm font-semibold text-rose-600 mb-2"
            >
              {errorMessage}
            </motion.p>
          )}

          <p className="text-xs font-semibold text-slate-400 mt-auto">
            Press ENTER to continue →
          </p>
        </div>
      </div>
    </motion.div>
  );
}
