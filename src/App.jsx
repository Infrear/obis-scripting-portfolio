import React, { useState, useEffect } from 'react';
import ParallaxBackground from './components/ParallaxBackground';
import PersonaCursor from './components/PersonaCursor';
import TitleCutout from './components/TitleCutout';
import PersonaMenuNav from './components/PersonaMenuNav';
import SpatialCanvas from './components/SpatialCanvas';
import AboutCallingCardModal from './components/AboutCallingCardModal';
import VideoModal from './components/VideoModal';
import PersonaScreenWipe from './components/PersonaScreenWipe';

export default function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeTab, setActiveTab] = useState('spatial');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isWipeActive, setIsWipeActive] = useState(false);

  // Read portfolio.json dynamically
  useEffect(() => {
    fetch('./portfolio.json')
      .then((res) => res.json())
      .then((data) => setPortfolioData(data))
      .catch((err) => {
        console.error('Error loading portfolio.json:', err);
      });
  }, []);

  // Trigger Persona screen wipe effect
  const triggerTransition = (callback) => {
    setIsWipeActive(true);
    setTimeout(() => {
      if (callback) callback();
    }, 450);
  };

  const handleOpenVideo = (video) => {
    triggerTransition(() => {
      setSelectedVideo(video);
    });
  };

  const handleOpenAbout = () => {
    triggerTransition(() => {
      setIsAboutOpen(true);
    });
  };

  const handleOpenContact = () => {
    triggerTransition(() => {
      setIsAboutOpen(true);
    });
  };

  const handleCloseModals = () => {
    setSelectedVideo(null);
    setIsAboutOpen(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0b0b0b] text-white font-persona select-none">
      {/* Custom Trailing Persona Cursor */}
      <PersonaCursor />

      {/* Multi-layered Framer Motion Parallax Background */}
      <ParallaxBackground />

      {/* Dynamic Screen Slash Transition Wipe */}
      <PersonaScreenWipe
        active={isWipeActive}
        onComplete={() => setIsWipeActive(false)}
      />

      {/* Top Header Title Cutout */}
      <header className="relative z-30 pt-3 px-4 md:px-8">
        <TitleCutout onTitleClick={() => triggerTransition(() => setActiveTab('spatial'))} />
      </header>

      {/* Angled Persona Menu Navigation Bar */}
      <PersonaMenuNav
        activeTab={activeTab}
        onSelectTab={(tab) => triggerTransition(() => setActiveTab(tab))}
        onOpenAbout={handleOpenAbout}
        onOpenContact={handleOpenContact}
      />

      {/* Main Free-Form Spatial Canvas Viewport */}
      <main className="relative z-10 w-full h-full">
        {portfolioData && portfolioData.videos && (
          <SpatialCanvas
            videos={portfolioData.videos}
            onOpenVideo={handleOpenVideo}
          />
        )}
      </main>

      {/* Persona Calling Card (About Me & Contact) Modal */}
      {portfolioData && (
        <AboutCallingCardModal
          profile={portfolioData.profile}
          isOpen={isAboutOpen}
          onClose={handleCloseModals}
        />
      )}

      {/* Fullscreen Video Player Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={handleCloseModals}
      />
    </div>
  );
}
