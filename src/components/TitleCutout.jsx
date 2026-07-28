import React from 'react';
import { motion } from 'framer-motion';

// Mapping letter indices for individual PNG image font
const LETTER_IMAGES = [
  'frontbolt(0).png',
  'fontbolt (1).png',
  'fontbolt (2).png',
  'fontbolt (3).png',
  'fontbolt (4).png',
  'fontbolt (5).png',
  'fontbolt (6).png',
  'fontbolt (7).png',
  'fontbolt (8).png',
  'fontbolt (9).png',
  'fontbolt (10).png',
  'fontbolt (11).png',
  'fontbolt (12).png',
  'fontbolt (13).png',
  'fontbolt (14).png',
  'fontbolt (15).png',
  'fontbolt (16).png',
  'fontbolt (17).png',
  'fontbolt (18).png',
  'fontbolt (19).png',
  'fontbolt (20).png',
  'fontbolt (21).png'
];

export default function TitleCutout({ onTitleClick }) {
  const words = [
    { text: "OBI'S", color: "bg-[#E60012] text-white" },
    { text: "SCRIPTING", color: "bg-white text-black" },
    { text: "PORTFOLIO", color: "bg-[#111111] text-white border-2 border-[#E60012]" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -40, skewX: -10 }}
      animate={{ opacity: 1, y: 0, skewX: -6 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
      onClick={onTitleClick}
      className="relative z-30 cursor-pointer group flex flex-col md:flex-row items-start md:items-center gap-3 p-4 select-none"
    >
      {/* Dynamic Persona Letter Cutout Header */}
      <div className="flex flex-wrap items-center gap-2">
        {words.map((wordObj, wordIdx) => (
          <div key={wordIdx} className="flex items-center gap-1.5 my-1">
            {wordObj.text.split('').map((char, charIdx) => {
              const globalIdx = (wordIdx * 7 + charIdx) % LETTER_IMAGES.length;
              const imgFileName = LETTER_IMAGES[globalIdx];
              const rotation = (charIdx % 2 === 0 ? 1 : -1) * ((charIdx * 3) % 9 + 3);

              return (
                <motion.div
                  key={charIdx}
                  whileHover={{ scale: 1.35, rotate: 0, y: -8 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    rotate: [rotation, -rotation, rotation],
                    y: [0, charIdx % 2 === 0 ? -3 : 3, 0]
                  }}
                  transition={{
                    rotate: { duration: 3 + (charIdx % 3), repeat: Infinity, ease: 'easeInOut' },
                    y: { duration: 2 + (charIdx % 2), repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="relative inline-flex items-center justify-center p-1"
                >
                  {/* Persona High-Contrast Angled Box */}
                  <div
                    className={`px-2.5 py-1 font-black text-2xl md:text-4xl tracking-tighter shadow-[4px_4px_0px_#000000] border-2 border-black transform ${
                      charIdx % 3 === 0 ? 'bg-[#E60012] text-white -rotate-3' :
                      charIdx % 3 === 1 ? 'bg-white text-black rotate-3' : 'bg-[#111111] text-[#E60012] -rotate-2'
                    }`}
                    style={{
                      fontFamily: "'Persona Aura', sans-serif",
                      clipPath: 'polygon(0% 0%, 100% 4%, 96% 100%, 4% 96%)'
                    }}
                  >
                    {char}
                  </div>

                  {/* PNG Font Accent Floating Badge if available */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <img
                      src={`./assets/obis scripting portfolio persona style image font/${imgFileName}`}
                      alt={char}
                      className="w-full h-full object-contain filter invert drop-shadow-[0_0_4px_#E60012]"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Subtitle Badge */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-[#E60012] text-white text-xs md:text-sm px-3 py-1 font-bold tracking-widest border border-white transform -rotate-3 shadow-[3px_3px_0px_#000]"
      >
        ★ TAKE YOUR TIME // METANOIA & ROBOTICS ARCHITECT ★
      </motion.div>
    </motion.div>
  );
}
