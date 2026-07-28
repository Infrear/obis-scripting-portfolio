import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PersonaScreenWipe({ active, onComplete }) {
  if (!active) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] pointer-events-none overflow-hidden select-none">
        
        {/* Layer 1: Red Diagonal Slash Wipe */}
        <motion.div
          initial={{ x: '-100%', skewX: -20 }}
          animate={{ x: ['-100%', '0%', '100%'], skewX: [-20, -10, -20] }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          onAnimationComplete={onComplete}
          className="absolute inset-0 bg-[#E60012] border-y-8 border-white z-10"
        />

        {/* Layer 2: Black Counter Slash Wipe */}
        <motion.div
          initial={{ x: '100%', skewX: 20 }}
          animate={{ x: ['100%', '0%', '-100%'], skewX: [20, 10, 20] }}
          transition={{ duration: 0.95, ease: [0.77, 0, 0.175, 1], delay: 0.05 }}
          className="absolute inset-0 bg-black border-y-8 border-[#E60012] z-20"
        />

        {/* Take Your Time Hat Loading Asset Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
          transition={{ duration: 0.9 }}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-3 bg-black/90 p-3 border-2 border-white transform -skew-x-12 shadow-[6px_6px_0px_#E60012]"
        >
          <img
            src="./assets/loading screen assets/take your time loading screen.png"
            alt="Take Your Time"
            className="h-8 object-contain filter invert"
            onError={(e) => {
              e.target.src = './assets/loading screen assets/loading screen hat in corner.png';
            }}
          />
          <span
            className="text-white font-black text-sm tracking-widest uppercase"
            style={{ fontFamily: "'Persona Aura', sans-serif" }}
          >
            TAKE YOUR TIME
          </span>
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
