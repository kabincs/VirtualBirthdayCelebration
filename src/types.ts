export type Step = 'blow-candles' | 'cut-cake' | 'take-slice' | 'celebration';

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
  soundEnabled: boolean;
}
