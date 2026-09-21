import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MoveRight } from 'lucide-react';

interface InteractiveKnifeProps {
  enabled: boolean;
  isCut: boolean;
  cutTargetRef: React.RefObject<HTMLDivElement | null>;
  onStartDrag: () => void;
  onEndDrag: () => void;
  onProximityChange: (isNear: boolean) => void;
  onCutTriggered: () => void;
}

export function InteractiveKnife({
  enabled,
  isCut,
  cutTargetRef,
  onStartDrag,
  onEndDrag,
  onProximityChange,
  onCutTriggered,
}: InteractiveKnifeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCuttingAnimation, setIsCuttingAnimation] = useState(false);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);

  const knifeRef = useRef<HTMLDivElement | null>(null);
  const trayRef = useRef<HTMLDivElement | null>(null);

  // Check proximity to cake cut target
  const checkCollision = useCallback(
    (clientX: number, clientY: number) => {
      if (!cutTargetRef.current) return;
      const targetRect = cutTargetRef.current.getBoundingClientRect();

      // Knife blade tip is roughly at (clientX + 20, clientY - 30) due to rotation
      const tipX = clientX;
      const tipY = clientY;

      // Distance to target center
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      const dx = tipX - targetCenterX;
      const dy = tipY - targetCenterY;
      const dist = Math.hypot(dx, dy);

      // Proximity highlight threshold
      const isNear = dist < 170;
      onProximityChange(isNear);

      // Collision trigger threshold
      const insideBox =
        tipX >= targetRect.left - 20 &&
        tipX <= targetRect.right + 20 &&
        tipY >= targetRect.top - 20 &&
        tipY <= targetRect.bottom + 20;

      if ((insideBox || dist < 65) && !isCuttingAnimation && !isCut) {
        // Trigger cut sequence!
        setIsCuttingAnimation(true);
        setIsDragging(false);
        onEndDrag();
        onProximityChange(false);

        // Perform animated slice down stroke
        setTimeout(() => {
          onCutTriggered();
          setIsCuttingAnimation(false);
        }, 500);
      }
    },
    [cutTargetRef, isCuttingAnimation, isCut, onProximityChange, onCutTriggered, onEndDrag]
  );

  // Pointer move / up listeners when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      setPointerPos({ x: e.clientX, y: e.clientY });
      checkCollision(e.clientX, e.clientY);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      onEndDrag();
      onProximityChange(false);
      setPointerPos(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, checkCollision, onEndDrag, onProximityChange]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!enabled || isCut || isCuttingAnimation) return;
    e.preventDefault();
    setIsDragging(true);
    setPointerPos({ x: e.clientX, y: e.clientY });
    onStartDrag();
  };

  return (
    <div className="relative select-none">
      {/* 1. Side Tray / Resting Plate */}
      <div
        ref={trayRef}
        id="knife-tray"
        className={`w-36 sm:w-44 h-16 sm:h-20 rounded-2xl bg-gradient-to-b from-white/95 to-slate-100/90 backdrop-blur-sm border-2 ${
          enabled && !isCut
            ? 'border-pink-300 shadow-[0_8px_20px_rgba(244,114,182,0.25)] ring-2 ring-pink-400/30'
            : 'border-slate-200/80 shadow-md opacity-75'
        } flex items-center justify-center relative transition-all duration-300`}
      >
        {/* Tray Inset */}
        <div className="w-[88%] h-[75%] rounded-xl bg-gradient-to-b from-slate-100/50 to-white/70 border border-slate-200/60 flex items-center justify-center relative overflow-hidden">
          {/* Subtle gold rim */}
          <div className="absolute inset-x-2 top-1 h-[1px] bg-amber-300/60" />

          {/* Tray Label */}
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            {isCut ? 'Knife Returned' : 'Cake Knife'}
          </span>
        </div>

        {/* Floating Hint when enabled and resting */}
        <AnimatePresence>
          {enabled && !isCut && !isDragging && !isCuttingAnimation && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2 },
                y: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
              }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-pink-400 whitespace-nowrap pointer-events-none"
            >
              <span>Pick up & drag me!</span>
              <MoveRight className="w-3.5 h-3.5 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resting Knife (Visible on tray when NOT dragging and NOT cutting) */}
        {!isDragging && !isCuttingAnimation && (
          <div
            ref={knifeRef}
            onPointerDown={handlePointerDown}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
            className={`absolute inset-0 flex items-center justify-center ${
              enabled && !isCut
                ? 'cursor-grab active:cursor-grabbing hover:scale-105 transition-transform'
                : 'cursor-not-allowed opacity-60'
            }`}
          >
            {/* Knife SVG Graphic */}
            <div className={`transform -rotate-12 transition-transform duration-200 ${isHovered && enabled && !isCut ? '-translate-y-1 rotate-[-16deg]' : ''}`}>
              <KnifeGraphic isGleaming={enabled && !isCut} />
            </div>
          </div>
        )}
      </div>

      {/* 2. Dragging Knife (Follows Pointer over the entire screen) */}
      {isDragging && pointerPos && (
        <div
          className="fixed pointer-events-none z-50 transition-none"
          style={{
            left: `${pointerPos.x}px`,
            top: `${pointerPos.y}px`,
            transform: 'translate(-35%, -65%) rotate(-42deg)',
            filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.3)) drop-shadow(0 5px 10px rgba(244,63,94,0.3))',
          }}
        >
          <KnifeGraphic isGleaming={true} />
          
          {/* Sparkles trailing knife tip */}
          <div className="absolute top-0 right-4 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          </div>
        </div>
      )}

      {/* 3. Automatic Cutting Stroke Animation when collision triggers */}
      {isCuttingAnimation && cutTargetRef.current && (
        <motion.div
          className="fixed pointer-events-none z-50"
          initial={{
            left: cutTargetRef.current.getBoundingClientRect().left + 40,
            top: cutTargetRef.current.getBoundingClientRect().top - 40,
            rotate: -45,
            scale: 1.1,
          }}
          animate={{
            top: cutTargetRef.current.getBoundingClientRect().bottom - 20,
            rotate: -35,
          }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <KnifeGraphic isGleaming={true} />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
          >
            ✨
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

/**
 * Detailed SVG illustration of a sleek party cake knife / server
 */
function KnifeGraphic({ isGleaming }: { isGleaming?: boolean }) {
  return (
    <svg
      viewBox="0 0 160 48"
      className="w-36 sm:w-44 h-12 filter drop-shadow-md overflow-visible"
    >
      <defs>
        {/* Blade metallic gradient */}
        <linearGradient id="knifeBlade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Handle pearl/rose-gold gradient */}
        <linearGradient id="knifeHandle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="40%" stopColor="#FDA4AF" />
          <stop offset="80%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>

        {/* Gold bolster / accents */}
        <linearGradient id="knifeGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Knife Blade */}
      <path
        d="M 50 24 
           L 135 15 
           Q 155 24 145 33 
           L 50 28 Z"
        fill="url(#knifeBlade)"
        stroke="#94A3B8"
        strokeWidth="1.2"
      />

      {/* Blade Cutting Edge bevel / sheen */}
      <path
        d="M 50 28 L 145 33"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Blade Serrations / festive accents */}
      <path
        d="M 60 28.5 L 63 27 M 70 29 L 73 27.5 M 80 29.5 L 83 28 M 90 30 L 93 28.5 M 100 30.5 L 103 29 M 110 31 L 113 29.5"
        stroke="#94A3B8"
        strokeWidth="0.8"
      />

      {/* Gold Bolster Ring */}
      <rect x="47" y="19" width="5" height="14" rx="2" fill="url(#knifeGold)" stroke="#D97706" strokeWidth="0.8" />

      {/* Handle */}
      <path
        d="M 6 22 
           C 6 18, 47 18, 47 21 
           L 47 31 
           C 47 34, 6 34, 6 30 
           C 2 28, 2 24, 6 22 Z"
        fill="url(#knifeHandle)"
        stroke="#BE123C"
        strokeWidth="1"
      />

      {/* Handle Rivets / Gold Dots */}
      <circle cx="16" cy="26" r="2" fill="url(#knifeGold)" />
      <circle cx="28" cy="26" r="2" fill="url(#knifeGold)" />
      <circle cx="40" cy="26" r="2" fill="url(#knifeGold)" />

      {/* Handle Top Highlight */}
      <path d="M 10 21 L 43 21" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" strokeLinecap="round" />

      {/* Gleaming shine sweep on blade when active */}
      {isGleaming && (
        <circle cx="120" cy="23" r="3" fill="#FFFFFF" opacity="0.9">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}
