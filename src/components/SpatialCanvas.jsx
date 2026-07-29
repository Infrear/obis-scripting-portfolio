import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PersonaVideoCard from './PersonaVideoCard';

export default function SpatialCanvas({ videos, onOpenVideo }) {
  const canvasRef = useRef(null);

  const [zIndices, setZIndices] = useState(() => {
    const initialMap = {};
    videos.forEach((v, idx) => {
      initialMap[v.id] = v.zIndex || (10 + idx);
    });
    return initialMap;
  });

  const [maxZ, setMaxZ] = useState(100);

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
    <div className="relative w-full h-full overflow-y-auto md:overflow-hidden overflow-x-hidden pt-4 pb-32 md:p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <motion.div
        ref={canvasRef}
        className="relative w-full min-h-max md:h-full flex flex-col md:block items-center gap-8 md:gap-0"
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
            canvasRef={canvasRef}
          />
        ))}
      </motion.div>

      <div className="absolute bottom-4 left-6 z-40 pointer-events-auto hidden md:flex items-center gap-3">
        <div className="bg-black/90 border-2 border-[#E60012] px-4 py-2 text-white font-bold text-xs md:text-sm tracking-widest uppercase transform -skew-x-6 shadow-[4px_4px_0px_#000000] flex items-center gap-2">
          <span>explore video collection!</span>
        </div>
      </div>
    </div>
  );
}