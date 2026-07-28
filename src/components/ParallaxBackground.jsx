import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function ParallaxBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse coordinates centered around 0
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transforms for multi-layer depth
  const bgX1 = useTransform(springX, [-1, 1], [-20, 20]);
  const bgY1 = useTransform(springY, [-1, 1], [-20, 20]);

  const bgX2 = useTransform(springX, [-1, 1], [-45, 45]);
  const bgY2 = useTransform(springY, [-1, 1], [-45, 45]);

  const starsX = useTransform(springX, [-1, 1], [-70, 70]);
  const starsY = useTransform(springY, [-1, 1], [-70, 70]);

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#0a0a0a]">
      {/* Layer 0: Base Dark Pattern (ZigZag background) */}
      <motion.div
        style={{ x: bgX1, y: bgY1, scale: 1.05 }}
        className="absolute -inset-10 opacity-20 mix-blend-overlay bg-repeat"
      >
        <img
          src="./assets/zigzag background.png"
          alt="zigzag base"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Layer 1: Persona 5 Star Background (Nebula / Dark Red Pulse) */}
      <motion.div
        style={{ x: bgX2, y: bgY2, scale: 1.1 }}
        animate={{
          opacity: [0.35, 0.5, 0.35],
          rotate: [0, 1, 0, -1, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-12 bg-cover bg-center opacity-40 mix-blend-screen"
      >
        <img
          src="./assets/persona_5 star background.jpg"
          alt="star bg"
          className="w-full h-full object-cover filter brightness-75 contrast-125"
        />
      </motion.div>

      {/* Layer 2: Irregular Jagged Overlay */}
      <motion.div
        style={{ x: bgX1, y: bgY2 }}
        className="absolute -inset-8 opacity-15 pointer-events-none"
      >
        <img
          src="./assets/irregular zigzag.png"
          alt="irregular zigzag"
          className="w-full h-full object-cover transform rotate-6"
        />
      </motion.div>

      {/* Layer 3: Floating Parallax Star & Exclamation Accents */}
      <motion.div style={{ x: starsX, y: starsY }} className="absolute inset-0">
        <motion.img
          src="./assets/starwithcircle.png"
          alt="star 1"
          animate={{ rotate: 360, y: [0, -15, 0] }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute top-[12%] left-[8%] w-16 h-16 opacity-40 filter drop-shadow-[0_0_10px_#E60012]"
        />

        <motion.img
          src="./assets/starwithoutline.png"
          alt="star 2"
          animate={{ rotate: -360, y: [0, 18, 0] }}
          transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute top-[65%] left-[85%] w-24 h-24 opacity-30 filter drop-shadow-[0_0_12px_#FFFFFF]"
        />

        <motion.img
          src="./assets/exlaim.png"
          alt="exclamation"
          animate={{ scale: [1, 1.2, 1], rotate: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[25%] right-[15%] w-14 h-14 opacity-50"
        />

        <motion.img
          src="./assets/starwithcircle.png"
          alt="star 3"
          animate={{ rotate: 180, scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[18%] left-[22%] w-20 h-20 opacity-25"
        />
      </motion.div>
    </div>
  );
}
