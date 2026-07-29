import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Tag, ExternalLink } from 'lucide-react';

export default function PersonaVideoCard({
  video,
  activeZIndex,
  onBringToFront,
  onOpenVideo,
  canvasRef
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDraggable, setIsDraggable] = useState(true);
  const videoRef = useRef(null);

  React.useEffect(() => {
    const handleResize = () => setIsDraggable(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const frameAsset = video.frameStyle === 'frame2'
    ? './assets/persona frame 2.png'
    : './assets/persona frame.png';

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      drag={isDraggable}
      dragConstraints={canvasRef}
      dragElastic={0.1}
      whileDrag={isDraggable ? { scale: 1.06, rotate: 0 } : {}}
      onDragStart={() => isDraggable && onBringToFront(video.id)}
      onMouseDown={() => isDraggable && onBringToFront(video.id)}
      initial={{ opacity: 0, scale: 0.8, rotate: video.rotation || 0 }}
      animate={{ opacity: 1, scale: 1, rotate: isHovered ? 0 : video.rotation || 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{
        '--md-left': `${video.x}%`,
        '--md-top': `${video.y}%`,
        width: 'clamp(200px, 22vw, 380px)',
        zIndex: activeZIndex,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`interactive-card ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''} group select-none relative md:absolute md:left-[var(--md-left)] md:top-[var(--md-top)]`}
    >
      <div className="relative p-2 rounded-sm bg-black/90 border-2 border-white/20 shadow-[10px_10px_0px_#000000] hover:shadow-[14px_14px_0px_#E60012] transition-all duration-300 transform -skew-x-2">

        <div className="absolute -inset-3 pointer-events-none z-20 opacity-90 transition-transform group-hover:scale-105">
          <img
            src={frameAsset}
            alt="Persona Frame"
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(230,0,18,0.6)]"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className="flex items-center justify-between bg-[#111111] px-3 py-1 mb-2 border-b-2 border-[#E60012]">
          <span className="text-[#E60012] text-xs font-bold tracking-widest uppercase flex items-center gap-1">
            <Tag className="w-3 h-3" /> {video.category}
          </span>
          <span className="text-white/60 text-[10px] font-mono">
            ID: #{video.id.slice(-4).toUpperCase()}
          </span>
        </div>

        <div
          onClick={() => onOpenVideo(video)}
          className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer persona-mask-1 border-2 border-[#111]"
        >
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.poster}
            loop
            muted
            playsInline
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 filter brightness-90 contrast-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: isHovered ? [1, 1.25, 1] : 1 }}
              transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
              className="w-14 h-14 bg-[#E60012] text-white flex items-center justify-center border-2 border-white transform -rotate-6 shadow-[4px_4px_0px_#000000]"
            >
              <Play className="w-7 h-7 fill-white translate-x-0.5" />
            </motion.div>
          </div>

          <div className="absolute bottom-2 left-2 right-2 bg-black/90 p-2 border-l-4 border-[#E60012] transform -skew-x-3">
            <h3
              className="text-white text-base md:text-lg font-black tracking-tight line-clamp-1 group-hover:text-[#E60012] transition-colors"
              style={{ fontFamily: "'Persona Aura', sans-serif" }}
            >
              {video.title}
            </h3>
          </div>
        </div>

        <div className="mt-3 px-2 flex flex-wrap items-center justify-between gap-1">
          <div className="flex flex-wrap gap-1">
            {video.tags?.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="bg-white/10 text-white/90 text-[10px] px-1.5 py-0.5 font-bold tracking-wider uppercase border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => onOpenVideo(video)}
            className="bg-[#E60012] hover:bg-white text-white hover:text-black text-xs px-2.5 py-1 font-bold tracking-wider uppercase border border-black transition-colors flex items-center gap-1 shadow-[2px_2px_0px_#000]"
          >
            VIEW <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}