import React from 'react';
import { motion } from 'framer-motion';
import { User, Video, Send, FileText, Sparkles } from 'lucide-react';

export default function PersonaMenuNav({
  activeTab,
  onSelectTab,
  onOpenAbout,
  onOpenContact
}) {
  const navItems = [
    { id: 'spatial', label: 'COMMAND SELECT (VIDEOS)', icon: Video, action: () => onSelectTab('spatial') },
    { id: 'about', label: 'CALLING CARD (ABOUT OBI)', icon: User, action: onOpenAbout },
    { id: 'contact', label: 'SYSTEM (CONTACT)', icon: Send, action: onOpenContact }
  ];

  return (
    <div className="fixed top-4 right-4 md:right-8 z-50 flex flex-col items-end gap-2 select-none">
      {/* Lightning Accent Graphic if available */}
      <div className="absolute -top-12 -right-8 w-44 h-44 pointer-events-none opacity-30 mix-blend-screen">
        <img
          src="./assets/lightning option chat.png"
          alt="lightning accent"
          className="w-full h-full object-contain"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <motion.button
            key={item.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.06, x: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.action}
            className={`relative group px-5 py-2.5 font-black text-xs md:text-sm tracking-wider uppercase transform -skew-x-12 border-2 transition-all shadow-[4px_4px_0px_#000000] ${
              isActive
                ? 'bg-[#E60012] text-white border-white shadow-[6px_6px_0px_#111]'
                : 'bg-black/90 text-white hover:bg-white hover:text-black border-[#E60012]'
            }`}
            style={{ fontFamily: "'Persona Aura', sans-serif" }}
          >
            {/* Inner Angled Content */}
            <div className="flex items-center gap-2 transform skew-x-12">
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#E60012] group-hover:text-black'}`} />
              <span>{item.label}</span>
              {isActive && (
                <Sparkles className="w-3.5 h-3.5 fill-white animate-spin" />
              )}
            </div>

            {/* Red Accent Slash Line */}
            <div className="absolute top-0 right-0 w-2 h-full bg-[#E60012] transform skew-x-12 opacity-80 group-hover:bg-black" />
          </motion.button>
        );
      })}
    </div>
  );
}
