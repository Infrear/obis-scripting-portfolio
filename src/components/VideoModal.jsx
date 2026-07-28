import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Tag } from 'lucide-react';

export default function VideoModal({ video, isOpen, onClose }) {
  if (!isOpen || !video) return null;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9500] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-lg">
        
        {/* Fullscreen Backdrop Trigger */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Persona Stylized Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative w-full max-w-5xl bg-[#0e0e0e] border-4 border-[#E60012] p-4 md:p-8 shadow-[20px_20px_0px_#000000] z-10 transform -skew-x-2"
        >
          {/* Top Title Bar */}
          <div className="flex items-center justify-between bg-[#111] p-3 border-b-4 border-[#E60012] mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#E60012] text-white text-xs font-bold px-2 py-0.5 tracking-widest uppercase">
                SHOWCASE
              </span>
              <h2
                className="text-white text-lg md:text-2xl font-black tracking-tight"
                style={{ fontFamily: "'Persona Aura', sans-serif" }}
              >
                {video.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="bg-[#E60012] hover:bg-white text-white hover:text-black px-3 py-1 border-2 border-white font-bold transition-colors shadow-[2px_2px_0px_#000]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Video Viewport Wrapper */}
          <div className="relative w-full aspect-video bg-black border-2 border-white overflow-hidden persona-mask-2 shadow-[8px_8px_0px_#000]">
            <video
              ref={videoRef}
              src={video.videoUrl}
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Custom Video Controls Bar */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/80 p-2 flex items-center justify-between border-t-2 border-[#E60012] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="bg-[#E60012] hover:bg-white text-white hover:text-black p-1.5 border border-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="bg-black hover:bg-white text-white hover:text-black p-1.5 border border-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-white/80 font-mono text-xs hidden md:inline">
                  {video.category}
                </span>

                <button
                  onClick={toggleFullscreen}
                  className="bg-black hover:bg-white text-white hover:text-black p-1.5 border border-white transition-colors"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Description & Tags */}
          <div className="mt-5 p-4 bg-[#141414] border-l-4 border-[#E60012] flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                {video.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 min-w-[200px]">
              {video.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-black text-[#E60012] border border-[#E60012] text-xs font-bold px-2 py-1 uppercase tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
