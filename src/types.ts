export type Step = 'blow-candles' | 'cut-cake' | 'take-slice' | 'celebration';

export type Occasion = 'birthday' | 'congratulations' | 'all-the-best';

export interface CakeInteractionState {
  currentStep: Step;
  candlesBlown: boolean;
  knifeDragging: boolean;
  knifePosition: { x: number; y: number } | null;
  knifeHovered: boolean;
  cakeCut: boolean;
  sliceSelected: boolean;
  celebrationStarted: boolean;
  personName: string;
  occasion: Occasion;
  soundEnabled: boolean;
}

// "Know Your Colleague" game
export interface GameQuestion {
  question: string;
  answer: string;
  revealed: boolean;
}

export type GameState = 'setup' | 'answering' | 'waitingForReveal' | 'revealing' | 'completed';

