import { RefObject } from 'react';
import { motion } from 'motion/react';
import { Candles } from './Candles';
import { CakeSlice } from './CakeSlice';

interface CakeProps {
  candlesBlown: boolean;
  cakeCut: boolean;
  sliceSelected: boolean;
  isCuttingAreaHighlighted: boolean;
  canClickSlice: boolean;
  onClickSlice: () => void;
  cutTargetRef: RefObject<HTMLDivElement | null>;
}

export function Cake({
  candlesBlown,
  cakeCut,
  sliceSelected,
  isCuttingAreaHighlighted,
  canClickSlice,
  onClickSlice,
  cutTargetRef,
}: CakeProps) {
  return (
    <div className="relative w-[340px] sm:w-[420px] md:w-[480px] h-[360px] sm:h-[400px] flex items-center justify-center select-none">
      {/* Glow Aura underneath cake */}
      <div className="absolute inset-x-8 bottom-6 h-28 bg-gradient-to-t from-pink-300/30 via-amber-200/20 to-transparent blur-2xl rounded-full pointer-events-none" />

      {/* 1. Cake Plate / Stand */}
      <div className="absolute bottom-4 inset-x-2 h-20 flex flex-col items-center pointer-events-none z-0">
        {/* Ceramic Rim Top */}
        <div className="w-full h-12 bg-gradient-to-b from-white via-slate-50 to-slate-200 rounded-[50%] shadow-[0_12px_24px_rgba(0,0,0,0.12)] border-2 border-slate-100 flex items-center justify-center">
          {/* Inner Plate Inset Ring */}
          <div className="w-[94%] h-[78%] rounded-[50%] border border-pink-200/50 bg-gradient-to-b from-slate-100/60 to-white" />
        </div>
        {/* Stand Base Stem */}
        <div className="w-24 h-8 bg-gradient-to-r from-slate-200 via-white to-slate-200 -mt-4 rounded-b-xl shadow-md border-x border-b border-slate-300/60" />
        {/* Stand Pedestal Foot */}
        <div className="w-36 h-4 bg-gradient-to-r from-slate-300 via-white to-slate-300 -mt-1 rounded-[50%] shadow-lg border border-slate-200" />
      </div>

      {/* 2. Main SVG Cake Body */}
      <div className="relative w-full h-full z-10">
        {/* Candles sitting on cake top */}
        <Candles candlesBlown={candlesBlown} />

        {/* Interactive Slice Wedge Component */}
        <CakeSlice
          isCut={cakeCut}
          isSelected={sliceSelected}
          isCuttingAreaHighlighted={isCuttingAreaHighlighted}
          canClickSlice={canClickSlice}
          onClickSlice={onClickSlice}
        />

        {/* Knife Target Area for cutting detection */}
        <div
          ref={cutTargetRef}
          id="cake-cut-target"
          className="absolute top-[32%] right-[18%] w-[110px] h-[130px] pointer-events-none z-25 rounded-2xl"
        >
          {/* Faint cut line indicator when cut */}
          {cakeCut && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-white via-pink-400 to-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
            />
          )}
        </div>

        {/* SVG Cake Rendering */}
        <svg
          viewBox="0 0 480 380"
          className="w-full h-full filter drop-shadow-xl"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="cakeFrostingPink" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
            <linearGradient id="cakeTopCream" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="60%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <linearGradient id="tierBottom" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDF2F8" />
              <stop offset="100%" stopColor="#FCE7F3" />
            </linearGradient>
            <linearGradient id="cutFaceInterior" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFE4E6" />
              <stop offset="100%" stopColor="#FFF1F2" />
            </linearGradient>
            <linearGradient id="spongeDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="jamStripe" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
          </defs>

          {/* === LOWER TIER === */}
          {/* Lower Tier Body */}
          <path
            d="M 60 210 C 60 210, 60 280, 60 280 C 60 325, 420 325, 420 280 C 420 280, 420 210, 420 210 C 420 250, 60 250, 60 210 Z"
            fill="url(#tierBottom)"
            stroke="#FBCFE8"
            strokeWidth="1.5"
          />

          {/* Lower Tier Middle Cream Ribbon */}
          <path
            d="M 60 240 C 60 275, 420 275, 420 240 C 420 250, 60 250, 60 240 Z"
            fill="#F472B6"
            opacity="0.85"
          />

          {/* Lower Tier Top Surface (Oval Ring) */}
          <ellipse cx="240" cy="210" rx="180" ry="42" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1.5" />

          {/* === UPPER TIER === */}
          {/* Upper Tier Side Cylinder */}
          <path
            d="M 100 130 C 100 130, 100 205, 100 205 C 100 242, 380 242, 380 205 C 380 205, 380 130, 380 130 C 380 165, 100 165, 100 130 Z"
            fill="url(#cakeFrostingPink)"
            stroke="#E11D48"
            strokeWidth="1"
          />

          {/* Decorative Drips hanging from Upper Tier Top */}
          <path
            d="M 100 130 
               C 115 155, 125 155, 135 132 
               C 145 160, 160 160, 175 133 
               C 190 165, 205 165, 220 135 
               C 235 158, 250 158, 265 134 
               C 280 168, 295 168, 310 135 
               C 325 160, 340 160, 355 132 
               C 365 148, 375 145, 380 130 
               C 380 165, 100 165, 100 130 Z"
            fill="#FFE4E6"
            opacity="0.95"
          />

          {/* Upper Tier Top Surface (Vanilla Icing Disk) */}
          <ellipse cx="240" cy="130" rx="140" ry="34" fill="url(#cakeTopCream)" stroke="#F59E0B" strokeWidth="1.5" />

          {/* Exposed inside cut-wall on the main cake body when slice is cut! */}
          {cakeCut && (
            <g>
              {/* Triangular wedge cut opening */}
              <path
                d="M 240 130 L 320 105 L 320 180 L 240 205 Z"
                fill="url(#cutFaceInterior)"
                stroke="#F472B6"
                strokeWidth="1.2"
              />
              {/* Exposed inside sponge layers */}
              <path d="M 240 190 L 320 165 L 320 180 L 240 205 Z" fill="url(#spongeDark)" />
              <path d="M 240 185 L 320 160 L 320 165 L 240 190 Z" fill="url(#jamStripe)" />
              <path d="M 240 160 L 320 135 L 320 150 L 240 175 Z" fill="url(#spongeDark)" />
              <path d="M 240 155 L 320 130 L 320 135 L 240 160 Z" fill="url(#jamStripe)" />
              <path d="M 240 135 L 320 110 L 320 125 L 240 150 Z" fill="url(#spongeDark)" />
            </g>
          )}

          {/* === FROSTING ROSETTES AND TOPPING DECORATIONS === */}
          {/* Piped whipped cream swirls on upper rim */}
          {[
            { cx: 120, cy: 138, r: 8 },
            { cx: 150, cy: 152, r: 8.5 },
            { cx: 190, cy: 161, r: 9 },
            { cx: 240, cy: 164, r: 9 },
            { cx: 290, cy: 161, r: 9 },
            { cx: 330, cy: 152, r: 8.5 },
            { cx: 360, cy: 138, r: 8 },
            { cx: 345, cy: 115, r: 7.5 },
            { cx: 300, cy: 102, r: 7 },
            { cx: 240, cy: 98, r: 7 },
            { cx: 180, cy: 102, r: 7 },
            { cx: 135, cy: 115, r: 7.5 },
          ].map((rosette, i) => (
            <g key={i}>
              <circle cx={rosette.cx} cy={rosette.cy} r={rosette.r} fill="#FFFFFF" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.08))" />
              <circle cx={rosette.cx - 1} cy={rosette.cy - 1} r={rosette.r * 0.65} fill="#FEF3C7" opacity="0.9" />
              {/* Pearl or Cherry on top of alternate rosettes */}
              {i % 2 === 0 ? (
                <circle cx={rosette.cx} cy={rosette.cy - 2} r={rosette.r * 0.45} fill="#EF4444" />
              ) : (
                <circle cx={rosette.cx} cy={rosette.cy - 2} r={rosette.r * 0.35} fill="#F59E0B" />
              )}
            </g>
          ))}

          {/* Colorful Sugar Sprinkles on Top of Cake */}
          <rect x="180" y="125" width="8" height="3" rx="1.5" fill="#3B82F6" transform="rotate(20 180 125)" />
          <rect x="220" y="118" width="8" height="3" rx="1.5" fill="#10B981" transform="rotate(-35 220 118)" />
          <rect x="260" y="122" width="8" height="3" rx="1.5" fill="#EC4899" transform="rotate(40 260 122)" />
          <rect x="200" y="140" width="8" height="3" rx="1.5" fill="#F59E0B" transform="rotate(-15 200 140)" />
          <rect x="240" y="145" width="8" height="3" rx="1.5" fill="#8B5CF6" transform="rotate(25 240 145)" />
          <rect x="275" y="138" width="8" height="3" rx="1.5" fill="#06B6D4" transform="rotate(-20 275 138)" />
          <rect x="160" y="132" width="7" height="3" rx="1.5" fill="#EF4444" transform="rotate(50 160 132)" />

          {/* Colorful Sprinkles on Lower Tier */}
          <rect x="120" y="235" width="9" height="3.5" rx="1.5" fill="#F59E0B" transform="rotate(15 120 235)" />
          <rect x="170" y="245" width="9" height="3.5" rx="1.5" fill="#3B82F6" transform="rotate(-30 170 245)" />
          <rect x="220" y="250" width="9" height="3.5" rx="1.5" fill="#10B981" transform="rotate(35 220 250)" />
          <rect x="270" y="250" width="9" height="3.5" rx="1.5" fill="#EC4899" transform="rotate(-20 270 250)" />
          <rect x="320" y="245" width="9" height="3.5" rx="1.5" fill="#8B5CF6" transform="rotate(25 320 245)" />
          <rect x="370" y="235" width="9" height="3.5" rx="1.5" fill="#06B6D4" transform="rotate(-40 370 235)" />
        </svg>
      </div>
    </div>
  );
}
