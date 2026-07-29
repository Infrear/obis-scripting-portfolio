import React, { useState, useEffect } from 'react';
import ParallaxBackground from './components/ParallaxBackground';
import PersonaCursor from './components/PersonaCursor';
import TitleCutout from './components/TitleCutout';
import SpatialCanvas from './components/SpatialCanvas';
import AboutCallingCardModal from './components/AboutCallingCardModal';
import VideoModal from './components/VideoModal';
import PersonaScreenWipe from './components/PersonaScreenWipe';
import IntroLoadingScreen from './components/IntroLoadingScreen';
import TitleScreen from './components/TitleScreen';
import FloatingNavArrows from './components/FloatingNavArrows';
import ExperiencesView from './components/ExperiencesView';

export default function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [currentView, setCurrentView] = useState('loading'); // loading, title, past-work, experiences
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isWipeActive, setIsWipeActive] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Read portfolio.json dynamically
  useEffect(() => {
    fetch('./portfolio.json')
      .then((res) => res.json())
      .then((data) => setPortfolioData(data))
      .catch((err) => {
        console.error('Error loading portfolio.json:', err);
      });
  }, []);

  // Trigger Persona screen wipe effect for video modals (still sharp)
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

  const handleOpenContact = () => {
    triggerTransition(() => {
      setIsAboutOpen(true);
    });
  };

  const handleCloseModals = () => {
    setSelectedVideo(null);
    setIsAboutOpen(false);
  };

  const navigateTo = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0b0b0b] text-white font-persona select-none">
      {/* Custom Trailing Persona Cursor */}
      <PersonaCursor />

      {/* Multi-layered Framer Motion Parallax Background */}
      <ParallaxBackground />

      {/* Dynamic Screen Slash Transition Wipe for Modals */}
      <PersonaScreenWipe
        active={isWipeActive}
        onComplete={() => setIsWipeActive(false)}
      />

      {/* Intro Loading Screen */}
      {currentView === 'loading' && (
        <IntroLoadingScreen onComplete={() => navigateTo('title')} />
      )}

      {/* Title Screen */}
      {currentView === 'title' && (
        <TitleScreen 
          onSelectPastWork={() => navigateTo('past-work')}
          onSelectExperiences={() => navigateTo('experiences')}
          onOpenContact={handleOpenContact}
        />
      )}

      {/* Content Views (Past Work / Experiences) */}
      {(currentView === 'past-work' || currentView === 'experiences') && (
        <>
          {/* Top Header Title Cutout */}
          <header className="relative z-30 pt-3 px-4 md:px-8">
            <TitleCutout onTitleClick={() => navigateTo('title')} />
          </header>
          
          {/* Floating Navigation Arrows to go back to Title */}
          <FloatingNavArrows onBack={() => navigateTo('title')} />

          {/* Main Content Area */}
          <main className="relative z-10 w-full h-full">
            {currentView === 'past-work' && portfolioData && portfolioData.videos && (
              <SpatialCanvas
                videos={portfolioData.videos}
                onOpenVideo={handleOpenVideo}
              />
            )}
            
            {currentView === 'experiences' && portfolioData && portfolioData.experiences && (
              <ExperiencesView
                experiences={portfolioData.experiences}
              />
            )}
          </main>
        </>
      )}

      {/* Fullscreen Video Player Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={handleCloseModals}
      />

      {/* Calling Card (About/Contact) Modal */}
      {portfolioData && portfolioData.profile && (
        <AboutCallingCardModal
          isOpen={isAboutOpen}
          onClose={handleCloseModals}
          profile={portfolioData.profile}
        />
      )}
    </div>
  );
}
