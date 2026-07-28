import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PersonaVideoCard from './PersonaVideoCard';

export default function SpatialCanvas({ videos, onOpenVideo }) {
  // Map of video ID to its active z-index
  const [zIndices, setZIndices] = useState(() => {
    const initialMap = {};
    videos.forEach((v, idx) => {
      initialMap[v.id] = v.zIndex || (10 + idx);
    });
    return initialMap;
  });

  const [maxZ, setMaxZ] = useState(100);

  // Bring clicked/dragged video card to absolute front
  const handleBringToFront = (id) => {
    setMaxZ((prevMax) => {
      const nextZ = prevMax + 1;
      setZIndices((prev) => ({
        ...prev,
        [id]: nextZ
      }));
      return nextZ;
    });
  };

  return (
    <div className="relative w-full h-[calc(100vh-140px)] overflow-hidden">
      {/* Dynamic Free-form Canvas Grid Container */}
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {videos.map((video) => (
          <PersonaVideoCard
            key={video.id}
            video={video}
            activeZIndex={zIndices[video.id] || 10}
            onBringToFront={handleBringToFront}
            onOpenVideo={onOpenVideo}
          />
        ))}
      </motion.div>

      {/* Spatial Canvas Controls & Persona Sub-Banner */}
      <div className="absolute bottom-4 left-6 z-40 pointer-events-auto flex items-center gap-3">
        <div className="bg-black/90 border-2 border-[#E60012] px-4 py-2 text-white font-bold text-xs md:text-sm tracking-widest uppercase transform -skew-x-6 shadow-[4px_4px_0px_#000000] flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#E60012] rounded-full animate-pulse" />
          <span>FREE-FORM SPATIAL CANVAS // DRAG & EXPLORE CARDS</span>
        </div>
      </div>
    </div>
  );
}
