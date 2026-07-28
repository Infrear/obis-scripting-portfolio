import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function PersonaCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trail physics
  const springConfig = { stiffness: 450, damping: 28, mass: 0.5 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Detect hover over interactive elements
      const target = e.target;
      const isInteractive = target.closest('button, a, input, video, .interactive-card, [data-interactive="true"]');
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Trailing Star Accent */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isMouseDown ? 0.7 : isHovered ? 1.6 : 1,
          rotate: isHovered ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute w-12 h-12 flex items-center justify-center opacity-80"
      >
        <img
          src="./assets/starwithcircle.png"
          alt="star cursor"
          className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(230,0,18,0.8)]"
          onError={(e) => { e.target.src = './assets/starwithoutline.png'; }}
        />
      </motion.div>

      {/* Main Cursor Element */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-20%',
          translateY: '-20%',
        }}
        animate={{
          scale: isMouseDown ? 0.8 : isHovered ? 1.3 : 1,
        }}
        className="absolute w-8 h-8 pointer-events-none"
      >
        <div className="relative w-full h-full">
          {/* Custom Persona Red Angle Cursor */}
          <div className="w-5 h-5 bg-[#E60012] border-2 border-white transform -rotate-12 shadow-[2px_2px_0px_#000]" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-ping" />
        </div>
      </motion.div>
    </div>
  );
}
