import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export default function ExperienceCard({ experience, isActive }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Combine inGameImage, promoImages, and promoVideo into a single media array for the carousel
  const mediaList = [];
  if (experience.promoVideo) {
    mediaList.push({ type: 'video', url: experience.promoVideo });
  }
  if (experience.inGameImage) {
    mediaList.push({ type: 'image', url: experience.inGameImage });
  }
  if (experience.promoImages && experience.promoImages.length > 0) {
    experience.promoImages.forEach(img => {
      mediaList.push({ type: 'image', url: img });
    });
  }

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  if (!isActive) return null;

  const currentMedia = mediaList[currentMediaIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, rotate: 5 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      exit={{ opacity: 0, x: -100, rotate: -5 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative w-[90vw] max-w-4xl bg-black border-4 border-white shadow-[12px_12px_0px_#E60012] p-4 md:p-6 flex flex-col md:flex-row gap-6 transform -skew-x-2"
    >
      {/* Left side: Media Carousel */}
      <div className="relative w-full md:w-1/2 aspect-video bg-[#111] border-2 border-[#E60012] persona-mask-1 overflow-hidden group">
        {mediaList.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMediaIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              {currentMedia.type === 'video' ? (
                <>
                  <video
                    ref={videoRef}
                    src={currentMedia.url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={toggleVideo}
                    className="absolute bottom-2 left-2 bg-[#E60012] text-white p-2 border border-white z-10"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </>
              ) : (
                <img
                  src={currentMedia.url}
                  alt="Experience Media"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 font-bold">
            NO MEDIA AVAILABLE
          </div>
        )}

        {/* Carousel Controls */}
        {mediaList.length > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
            <button onClick={prevMedia} className="pointer-events-auto bg-black text-white p-1 border-2 border-white hover:bg-[#E60012] transition-colors shadow-[2px_2px_0px_#000]">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextMedia} className="pointer-events-auto bg-black text-white p-1 border-2 border-white hover:bg-[#E60012] transition-colors shadow-[2px_2px_0px_#000]">
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Right side: Details */}
      <div className="relative w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <div className="flex items-start gap-4 mb-4">
            {/* Store Icon */}
            {experience.storeIcon && (
              <div className="w-16 h-16 shrink-0 bg-white border-2 border-black p-1 transform rotate-3 shadow-[2px_2px_0px_#E60012]">
                <img src={experience.storeIcon} alt="Icon" className="w-full h-full object-contain" />
              </div>
            )}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Persona Aura', sans-serif" }}>
                {experience.title}
              </h2>
              <h3 className="text-[#E60012] font-bold text-sm tracking-widest uppercase">
                {experience.role}
              </h3>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-4 border-l-4 border-[#E60012] shadow-[4px_4px_0px_#000] mb-4">
            <span className="inline-block bg-[#E60012] text-white text-[10px] font-bold px-2 py-0.5 mb-2 uppercase tracking-widest border border-white">
              {experience.dates}
            </span>
            <p className="text-white/90 text-sm leading-relaxed">
              {experience.description}
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="self-end text-white/20 font-black text-6xl transform rotate-12 select-none pointer-events-none absolute -bottom-8 -right-4">
          ★
        </div>
      </div>
    </motion.div>
  );
}
