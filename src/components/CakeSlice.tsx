import { motion } from 'motion/react';
import { Sparkles, Hand } from 'lucide-react';

interface CakeSliceProps {
  isCut: boolean;
  isSelected: boolean;
  isCuttingAreaHighlighted: boolean;
  canClickSlice: boolean;
  onClickSlice: () => void;
}

export function CakeSlice({
  isCut,
  isSelected,
  isCuttingAreaHighlighted,
  canClickSlice,
  onClickSlice,
}: CakeSliceProps) {
  // If the slice has already flown away, don't render it
  if (isSelected) {
    return null;
  }

  return (
    <motion.div
      id="cake-slice-container"
      className="absolute top-[28%] right-[12%] w-[160px] h-[180px] z-30 select-none"
      initial={false}
      animate={
        isCut
          ? {
              x: 36,
              y: 16,
              scale: 1.02,
              rotate: 3,
            }
          : {
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 140,
        damping: 18,
      }}
    >
      {/* Visual Guide / Glowing highlight when knife is near before cutting */}
      {!isCut && isCuttingAreaHighlighted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute inset-0 rounded-2xl border-2 border-dashed border-pink-400 bg-pink-400/20 pointer-events-none z-40 shadow-[0_0_15px_rgba(244,114,182,0.8)]"
        >
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-pink-600 bg-white px-2 py-0.5 rounded-full shadow border border-pink-200 whitespace-nowrap">
            Cut Here! ✂️
          </span>
        </motion.div>
      )}

      {/* The Slice Interactive Button / Wrapper */}
      <div
        onClick={canClickSlice ? onClickSlice : undefined}
        className={`relative w-full h-full cursor-pointer transition-transform duration-200 ${
          canClickSlice ? 'hover:scale-105 active:scale-95 group' : ''
        }`}
      >
        {/* Floating Hint Pill when slice is ready to be picked up */}
        {canClickSlice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.3 },
              y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
            }}
            className="absolute -top-10 -left-6 z-50 flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/60 pointer-events-none whitespace-nowrap"
          >
            <Hand className="w-3.5 h-3.5 animate-bounce" />
            <span>Click to pick up slice!</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </motion.div>
        )}

        {/* SVG Graphic of the Cake Slice */}
        <svg
          viewBox="0 0 160 180"
          className={`w-full h-full filter drop-shadow-md transition-all ${
            canClickSlice ? 'group-hover:drop-shadow-xl' : ''
          }`}
        >
          <defs>
            <linearGradient id="sliceTopCream" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <linearGradient id="sliceSideInterior" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF1F2" />
              <stop offset="100%" stopColor="#FFE4E6" />
            </linearGradient>
            <linearGradient id="spongeColor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="jamColor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="sliceOuterFrosting" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>

          {/* Wedge Slice Top Face */}
          <path
            d="M 20 50 L 95 18 L 140 45 L 65 77 Z"
            fill="url(#sliceTopCream)"
            stroke="#F59E0B"
            strokeWidth="1.2"
          />

          {/* Top Rosette / Strawberry decoration on slice */}
          <g transform="translate(75, 42)">
            {/* Cream dollop */}
            <circle cx="0" cy="0" r="10" fill="#FFF" />
            <circle cx="-3" cy="-2" r="7" fill="#FEF3C7" opacity="0.8" />
            {/* Strawberry */}
            <path
              d="M -6 -1 C -6 -7, 6 -7, 6 -1 C 6 6, 0 10, 0 10 C 0 10, -6 6, -6 -1 Z"
              fill="#E11D48"
            />
            {/* Seeds */}
            <circle cx="-2" cy="0" r="0.7" fill="#FEF08A" />
            <circle cx="2" cy="1" r="0.7" fill="#FEF08A" />
            <circle cx="0" cy="4" r="0.7" fill="#FEF08A" />
            {/* Leaf */}
            <path d="M 0 -7 Q -3 -11 -6 -8 Q -1 -6 0 -7 Q 3 -11 6 -8 Q 1 -6 0 -7" fill="#16A34A" />
          </g>

          {/* Inside Cut Face (Showing Delicious Layers!) */}
          {/* This face is only fully visible when the slice is cut */}
          <g>
            {/* Base side polygon */}
            <path
              d="M 20 50 L 65 77 L 65 145 L 20 118 Z"
              fill="url(#sliceSideInterior)"
              stroke="#FBCFE8"
              strokeWidth="1"
            />

            {/* Layer 1 - Bottom Sponge */}
            <path d="M 20 102 L 65 129 L 65 145 L 20 118 Z" fill="url(#spongeColor)" />
            {/* Jam Ribbon 1 */}
            <path d="M 20 98 L 65 125 L 65 129 L 20 102 Z" fill="url(#jamColor)" />
            {/* Vanilla Cream 1 */}
            <path d="M 20 94 L 65 121 L 65 125 L 20 98 Z" fill="#FFFBEB" />

            {/* Layer 2 - Middle Sponge */}
            <path d="M 20 78 L 65 105 L 65 121 L 20 94 Z" fill="url(#spongeColor)" />
            {/* Jam Ribbon 2 */}
            <path d="M 20 74 L 65 101 L 65 105 L 20 78 Z" fill="url(#jamColor)" />
            {/* Vanilla Cream 2 */}
            <path d="M 20 70 L 65 97 L 65 101 L 20 74 Z" fill="#FFFBEB" />

            {/* Layer 3 - Top Sponge */}
            <path d="M 20 54 L 65 81 L 65 97 L 20 70 Z" fill="url(#spongeColor)" />
            {/* Top Frosting Rim */}
            <path d="M 20 50 L 65 77 L 65 81 L 20 54 Z" fill="#F472B6" />
          </g>

          {/* Outer Curved Edge of Slice */}
          <path
            d="M 65 77 L 140 45 L 140 113 L 65 145 Z"
            fill="url(#sliceOuterFrosting)"
            stroke="#FB7185"
            strokeWidth="1"
          />

          {/* Decorative Icing Drips on the outer crust */}
          <path
            d="M 65 77 Q 85 86, 100 80 Q 115 85, 125 74 Q 135 78, 140 70 L 140 45 L 65 77 Z"
            fill="#FFF1F2"
            opacity="0.9"
          />

          {/* Sprinkles on Outer Frosting */}
          <rect x="80" y="90" width="6" height="2" rx="1" fill="#FDE047" transform="rotate(25 80 90)" />
          <rect x="110" y="85" width="6" height="2" rx="1" fill="#38BDF8" transform="rotate(-30 110 85)" />
          <rect x="95" y="115" width="6" height="2" rx="1" fill="#A855F7" transform="rotate(45 95 115)" />
          <rect x="125" y="105" width="6" height="2" rx="1" fill="#34D399" transform="rotate(-15 125 105)" />

          {/* Slice Separation highlight sheen */}
          {isCut && (
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.6 }}
              d="M 20 50 L 65 77 L 65 145"
              stroke="#FFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </svg>
      </div>
    </motion.div>
  );
}
