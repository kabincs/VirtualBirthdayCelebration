import confetti from 'canvas-confetti';

export function triggerBlowConfetti() {
  // Gentle puff around cake
  confetti({
    particleCount: 35,
    spread: 60,
    origin: { y: 0.45 },
    colors: ['#FDE047', '#F472B6', '#60A5FA', '#FBBF24'],
    ticks: 120,
    gravity: 0.9,
    scalar: 0.8,
  });
}

export function triggerCutSparkles() {
  confetti({
    particleCount: 20,
    spread: 45,
    origin: { x: 0.52, y: 0.5 },
    colors: ['#F43F5E', '#FBBF24', '#F472B6', '#FFFFFF'],
    ticks: 80,
    gravity: 1.1,
    scalar: 0.7,
  });
}

export function triggerSliceConfetti() {
  confetti({
    particleCount: 45,
    spread: 75,
    origin: { x: 0.5, y: 0.4 },
    colors: ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981', '#38BDF8'],
    ticks: 140,
    gravity: 0.75,
    scalar: 0.9,
  });
}

export function triggerGrandCelebration() {
  const duration = 4000;
  const animationEnd = Date.now() + duration;

  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Left and right cannon burst
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 65,
    origin: { x: 0, y: 0.7 },
    colors: ['#ff1744', '#f50057', '#d500f9', '#651fff', '#2979ff', '#00e5ff', '#1de9b6', '#ffea00'],
  });
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 65,
    origin: { x: 1, y: 0.7 },
    colors: ['#ff1744', '#f50057', '#d500f9', '#651fff', '#2979ff', '#00e5ff', '#1de9b6', '#ffea00'],
  });

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    // Random fireworks bursts in the sky
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.15, 0.4), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.85), y: Math.random() - 0.2 },
    });
  }, 250);
}
