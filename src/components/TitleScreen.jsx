import React from 'react';
import { motion } from 'framer-motion';

export default function TitleScreen({ onSelectPastWork, onSelectExperiences, onOpenContact }) {
  return (
    <motion.div
      key="title-screen"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center overflow-y-auto bg-transparent pointer-events-auto select-none py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* Top Right Contact Button */}
      <div className="absolute top-4 right-4 md:right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.1, x: 20, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenContact}
          className="relative px-3 py-1.5 md:px-6 md:py-2.5 bg-[#E60012] text-white font-black text-xs md:text-base tracking-widest uppercase transform -skew-x-12 shadow-[4px_4px_0px_#111] md:shadow-[6px_6px_0px_#111] border-2 border-white hover:bg-white hover:text-black hover:border-black transition-all"
          style={{ fontFamily: "'Persona Aura', sans-serif" }}
        >
          CALLING CARD (CONTACT)
        </motion.button>
      </div>

      {/* Bottom Left Text */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-50 pointer-events-none">
        <p className="text-white/40 italic text-xs md:text-sm tracking-wide">
          yes i made this website
        </p>
      </div>

      <div className="relative flex flex-col items-center" style={{ marginTop: 'clamp(-4rem, -8vh, -1rem)' }}>

        {/* Main Floating Textbox Graphic */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative aspect-[2/1]"
          style={{
            width: 'min(90vw, 1250px, 130vh)',
            '--box-w': 'min(90vw, 1250px, 130vh)',
          }}
        >
          <img
            src="./new-assets/obis programming portfolio box main.png"
            alt="Title Box"
            className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[10px_10px_0px_rgba(0,0,0,0.8)]"
            onError={(e) => { e.target.style.display = 'none'; }}
          />

          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ transform: 'translate(calc(var(--box-w) * 0.205), 0.5rem)' }}
          >
            <h1
              className="text-white font-black tracking-tighter transform -skew-x-6 drop-shadow-[4px_4px_0px_#E60012]"
              style={{
                fontFamily: "'Persona Aura', sans-serif",
                fontSize: 'calc(var(--box-w) * 0.0704)',
              }}
            >
              SELECT ARCHIVE
            </h1>
          </div>
        </motion.div>

        {/* Menu Options Below the Box */}
        <div className="mt-8 flex flex-col gap-6 z-10">
          <motion.button
            whileHover={{ scale: 1.1, x: 20, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelectPastWork}
            className="group relative px-8 py-3 bg-black border-4 border-white text-white text-2xl md:text-4xl font-black tracking-widest uppercase transform -skew-x-12 shadow-[8px_8px_0px_#E60012] hover:bg-[#E60012] hover:text-white transition-colors text-center"
            style={{ fontFamily: "'Persona Aura', sans-serif" }}
          >
            PAST WORK
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#E60012] group-hover:text-white text-3xl">►</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: -20, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelectExperiences}
            className="group relative px-8 py-3 bg-white border-4 border-black text-black text-2xl md:text-4xl font-black tracking-widest uppercase transform skew-x-12 shadow-[8px_8px_0px_#000] hover:bg-[#111] hover:text-[#E60012] hover:border-[#E60012] transition-colors text-center"
            style={{ fontFamily: "'Persona Aura', sans-serif" }}
          >
            <span className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#E60012] text-3xl rotate-180">►</span>
            PAST EXPERIENCES
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
}
