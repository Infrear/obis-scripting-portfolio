import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExperienceCard from './ExperienceCard';

export default function ExperiencesView({ experiences }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  if (!experiences || experiences.length === 0) return null;

  return (
    <div className="relative w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center overflow-hidden z-20">

      {/* Background Decor */}
      <div className="absolute top-10 left-10 text-[#E60012] font-black text-6xl opacity-65 transform -skew-x-12 select-none pointer-events-none" style={{ fontFamily: "'Persona Aura', sans-serif" }}>
        EXPERIENCE ARCHIVE
      </div>

      <div className="relative w-full max-w-5xl flex items-center justify-center">
        <AnimatePresence mode="wait">
          <ExperienceCard
            key={currentIndex}
            experience={experiences[currentIndex]}
            isActive={true}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Controls for Cards */}
      <div className="mt-8 flex items-center gap-6 pointer-events-auto">
        <button
          onClick={prevCard}
          className="bg-black text-white px-6 py-2 border-2 border-white font-black text-xl hover:bg-[#E60012] hover:border-black transform -skew-x-12 shadow-[4px_4px_0px_#000] transition-colors"
          style={{ fontFamily: "'Persona Aura', sans-serif" }}
        >
          PREV
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {experiences.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 transform rotate-45 border border-white transition-colors ${idx === currentIndex ? 'bg-[#E60012]' : 'bg-transparent'}`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="bg-black text-white px-6 py-2 border-2 border-white font-black text-xl hover:bg-[#E60012] hover:border-black transform -skew-x-12 shadow-[4px_4px_0px_#000] transition-colors"
          style={{ fontFamily: "'Persona Aura', sans-serif" }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
