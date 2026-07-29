import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoadingScreen({ onComplete }) {
  useEffect(() => {
    // Extend timer slightly to let animations breathe
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Framer Motion variants for the background rings
  const ringVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom) => ({
      scale: [0, 1.2, 1],
      opacity: [0, 0.8, 0.5],
      rotate: custom.direction === 1 ? [0, 360] : [0, -360],
      transition: {
        scale: { delay: custom.delay, duration: 0.8, type: 'spring', bounce: 0.5 },
        opacity: { delay: custom.delay, duration: 0.8 },
        rotate: { duration: 15, repeat: Infinity, ease: 'linear' }
      }
    })
  };

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[9999] bg-[#E60012] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Center Graphic Container */}
        <div className="relative flex flex-col items-center justify-center w-full h-full transform -skew-x-3">

          {/* Concentric Bouncing Rings */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              custom={{ delay: i * 0.15, direction: i % 2 === 0 ? 1 : -1 }}
              variants={ringVariants}
              initial="hidden"
              animate="visible"
              className="absolute pointer-events-none"
              style={{
                width: `${100 + i * 450}px`,
                height: `${100 + i * 450}px`,
                zIndex: 10 - i
              }}
            >
              <img
                src="./new-assets/loading-ring-1.png"
                alt="Loading Ring"
                className="w-full h-full object-contain filter brightness-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>
          ))}

          {/* Dynamic Hat Drop */}
          <motion.div
            initial={{ y: -800, scale: 0.5, rotate: -20 }}
            animate={{ y: 0, scale: [0.5, 1.5, 1], rotate: [-20, 10, 0] }}
            transition={{
              duration: 1.2,
              type: 'spring',
              bounce: 0.6,
              delay: 0.4
            }}
            className="relative z-20 w-48 md:w-64 h-48 md:h-64"
          >
            {/* Hover float after landing */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
              className="w-full h-full"
            >
              <img
                src="./new-assets/loading screen hat.png"
                alt="Phantom Hat"
                className="w-full h-full object-contain filter drop-shadow-[10px_10px_0px_rgba(0,0,0,0.8)]"
              />
            </motion.div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: [0, 1, 0.5, 1], y: 0 }}
            transition={{
              opacity: { duration: 1.5, repeat: Infinity, delay: 1 },
              y: { duration: 0.5, delay: 0.8 }
            }}
            className="absolute bottom-[30%] z-20 text-white font-black text-3xl md:text-5xl tracking-widest uppercase bg-black px-6 py-2 border-4 border-white shadow-[8px_8px_0px_rgba(0,0,0,0.5)] transform -skew-x-6"
            style={{ fontFamily: "'Persona Aura', sans-serif" }}
          >
            LOADING...
          </motion.div>
        </div>

        {/* Bottom Anchored City Silhouette */}
        <motion.div
          initial={{ y: 1000, scale: 1.1, opacity: 0 }}
          // To move the city DOWN, increase the 'y' value in animate (e.g., y: 100). 
          // To zoom it OUT (make it smaller), decrease the 'scale' value (e.g., scale: 0.8).
          animate={{ y: 850, scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
        >
          <img
            src="./new-assets/city-silhouette-new.png"
            alt="City Silhouette"
            className="w-full h-auto object-cover opacity-90 filter drop-shadow-[0_-5px_15px_rgba(0,0,0,0.8)]"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
