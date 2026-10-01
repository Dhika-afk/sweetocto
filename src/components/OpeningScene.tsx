import React, { useState } from "react";
import { AppConfig } from "../config";
import { audioManager } from "../utils/audio";

interface OpeningSceneProps {
  config: AppConfig;
  onEnter: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ config, onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    // Start music on click (browser requires user interaction)
    audioManager.start(config.music.file, config.music.volume);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center select-none transition-all duration-1000 ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Soft moonlight glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-b from-[#FDF6E2]/10 via-[#E0E7FF]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Subtle Moon in upper corner */}
      <div className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 opacity-70 animate-float-slow pointer-events-none">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#E2D9C8] via-[#FFFDF8] to-[#FFFFFF] shadow-[0_0_40px_rgba(255,253,248,0.35)]">
          {/* Subtle moon surface textures */}
          <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#C8BEAB]/25" />
          <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-[#C8BEAB]/20" />
          <div className="absolute top-6 right-5 w-2 h-2 rounded-full bg-[#C8BEAB]/30" />
        </div>
      </div>

      {/* Main typographic hierarchy */}
      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center mt-12 sm:mt-16">
        {/* Date kicker */}
        <p className="text-xs sm:text-sm tracking-[0.28em] uppercase text-[#D4AF37]/80 font-medium mb-5 sm:mb-6">
          {config.date}
        </p>

        {/* Primary poetic headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-[#FAF6EE] tracking-tight leading-[1.18] sm:leading-[1.15] mb-5 text-balance">
          I made a little world for you.
        </h1>

        {/* Quiet invitation */}
        <p className="text-sm sm:text-base text-[#B8BED5] font-light tracking-wide max-w-xs sm:max-w-sm mb-12 sm:mb-14 leading-relaxed">
          Take your time. Explore it.
        </p>

        {/* Enter Button */}
        <button
          onClick={handleEnter}
          disabled={isExiting}
          className="group relative px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#181E38]/90 hover:bg-[#202747] text-[#FAF4E6] text-sm tracking-[0.16em] uppercase font-medium border border-[#E5D7BE]/25 hover:border-[#D4AF37]/50 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.22)] transition-all duration-500 active:scale-95 cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>ENTER</span>
            <span className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
              ♡
            </span>
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-[11px] sm:text-xs text-[#6F7794] tracking-widest uppercase font-light">
        Audio recommended · girl in red
      </div>
    </div>
  );
};
