import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[9999] bg-[#E60012] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Center Graphic */}
        <div className="relative flex flex-col items-center justify-center transform -skew-x-3">
          {/* Spinning Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute w-64 h-64 opacity-80"
          >
            <img
              src="./new-assets/loading-ring-1.png"
              alt="Loading Ring"
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </motion.div>

          {/* Animated Hat Spritesheet */}
          <div className="relative z-10 w-32 h-32 mt-4 hat-sprite"></div>

          {/* Loading Text */}
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-12 text-white font-black text-2xl tracking-widest uppercase bg-black px-4 py-1 border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: "'Persona Aura', sans-serif" }}
          >
            LOADING...
          </motion.div>
        </div>

        {/* Bottom Anchored City Silhouette */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-full"
        >
          <img
            src="./new-assets/city-silhouette.png"
            alt="City Silhouette"
            className="w-full h-auto object-cover opacity-90"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
