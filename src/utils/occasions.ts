import { Occasion } from '../types';

interface OccasionConfig {
  label: string;
  emoji: string;
  blowCandlesText: string;
  celebrationInstructionText: string;
  title: string;
  message: string;
  missionText: string;
  badgeOne: string;
  badgeTwo: string;
  buttonText: string;
}

export const OCCASION_OPTIONS: { value: Occasion; label: string; emoji: string }[] = [
  { value: 'birthday', label: 'Birthday', emoji: '🎂' },
  { value: 'congratulations', label: 'Congratulations', emoji: '🎉' },
  { value: 'all-the-best', label: 'All the Best', emoji: '🍀' },
];

const OCCASION_CONFIG: Record<Occasion, OccasionConfig> = {
  birthday: {
    label: 'Birthday',
    emoji: '🎂',
    blowCandlesText: "🎂 It's Birthday Time! Click the button below to blow out the candles!",
    celebrationInstructionText: 'Happy Birthday',
    title: '🎉 HAPPY BIRTHDAY! 🎉',
    message: 'May your day be filled with happiness, laughter and lots of cake! ❤️',
    missionText: 'Mission Complete: Cake successfully enjoyed! 🍰',
    badgeOne: 'VIP Day',
    badgeTwo: 'Special Celebration',
    buttonText: '🎂 Celebrate Again',
  },
  congratulations: {
    label: 'Congratulations',
    emoji: '🎉',
    blowCandlesText: '🎉 Time to Celebrate! Click the button below to blow out the candles!',
    celebrationInstructionText: 'Congratulations',
    title: '🎉 CONGRATULATIONS! 🎉',
    message: "Your hard work and dedication truly paid off. Here's to your success! ❤️",
    missionText: 'Mission Complete: Success sweetly celebrated! 🍰',
    badgeOne: 'Well Deserved',
    badgeTwo: 'Special Celebration',
    buttonText: '🎉 Celebrate Again',
  },
  'all-the-best': {
    label: 'All the Best',
    emoji: '🍀',
    blowCandlesText: '🍀 Wishing You the Best! Click the button below to blow out the candles!',
    celebrationInstructionText: 'All the Best',
    title: '🍀 ALL THE BEST! 🍀',
    message: 'Wishing you courage, strength and success in everything ahead! ❤️',
    missionText: 'Mission Complete: Good luck cake served! 🍰',
    badgeOne: 'Good Luck',
    badgeTwo: 'Special Wishes',
    buttonText: '🍀 Celebrate Again',
  },
};

export function getOccasionConfig(occasion: Occasion): OccasionConfig {
  return OCCASION_CONFIG[occasion];
}
