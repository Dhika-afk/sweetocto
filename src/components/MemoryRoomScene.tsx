import React, { useState } from "react";
import { ArrowLeft, X, Sparkles, Image as ImageIcon } from "lucide-react";
import { AppConfig, MemoryItem } from "../config";

interface MemoryRoomSceneProps {
  config: AppConfig;
  visitedMemories: number[];
  onInspectMemory: (index: number) => void;
  onBack: () => void;
}

export const MemoryRoomScene: React.FC<MemoryRoomSceneProps> = ({
  config,
  visitedMemories,
  onInspectMemory,
  onBack,
}) => {
  const [activeMemoryIndex, setActiveMemoryIndex] = useState<number | null>(null);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  const handleOpenPhoto = (index: number) => {
    setActiveMemoryIndex(index);
    onInspectMemory(index);
  };

  const handleClosePhoto = () => {
    setActiveMemoryIndex(null);
  };

  const handleImageError = (index: number) => {
    setImageErrorMap((prev) => ({ ...prev, [index]: true }));
  };

  const activeMemory =
    activeMemoryIndex !== null ? config.memories[activeMemoryIndex] : null;

  // Aesthetic fallbacks for polaroids if user hasn't loaded image files yet
  const fallbackGradients = [
    "from-[#2B1B17] via-[#482820] to-[#6E3C2B]", // sunset amber
    "from-[#121B2A] via-[#1F2C44] to-[#364966]", // twilight blue
    "from-[#241A28] via-[#3E2745] to-[#5C3A66]", // soft violet dusk
    "from-[#1F241A] via-[#333E2B] to-[#4B5C3D]", // quiet forest breeze
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto">
      {/* Top Bar */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs sm:text-sm text-[#A5ADC6] hover:text-[#FAF6EE] transition-colors py-2 px-3 -ml-3 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to the world</span>
        </button>

        <div className="text-xs text-[#8E95AA] tracking-widest uppercase flex items-center gap-2">
          <span>Memory Room</span>
          <span className="text-[#6F7794]">·</span>
          <span>{visitedMemories.length}/{config.memories.length} viewed</span>
        </div>
      </header>

      {/* Main Room Gallery */}
      <main className="relative z-10 my-auto py-6 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Warm Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#E09F3E]/10 blur-3xl pointer-events-none" />

        <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-2">
          Warm & Nostalgic
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF5EC] mb-2 font-normal">
          Captured Moments
        </h2>
        <p className="text-xs sm:text-sm text-[#9BA3BD] max-w-sm mx-auto mb-10 font-light">
          Photographs hanging gently on the warm cottage wall. Tap any polaroid to look closer.
        </p>

        {/* Polaroid Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 w-full max-w-4xl px-2">
          {config.memories.map((mem: MemoryItem, idx: number) => {
            const isViewed = visitedMemories.includes(idx);
            const hasError = imageErrorMap[idx];
            // Slight natural polaroid tilt
            const rotations = ["-rotate-1", "rotate-2", "-rotate-2", "rotate-1"];
            const tilt = rotations[idx % rotations.length];

            return (
              <div
                key={idx}
                onClick={() => handleOpenPhoto(idx)}
                className={`group relative flex flex-col items-center bg-[#F7F4EB] p-3.5 pb-5 rounded shadow-[0_12px_28px_rgba(0,0,0,0.55)] cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_20px_35px_rgba(0,0,0,0.7)] ${tilt}`}
              >
                {/* Vintage wooden peg / pin at top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3.5 h-6 rounded-sm bg-[#A68A68] shadow border border-[#7A6448]" />

                {/* Photo window */}
                <div className="relative w-full aspect-[4/3] rounded-[2px] overflow-hidden bg-[#1E2235]">
                  {!hasError ? (
                    <img
                      src={mem.image}
                      alt={mem.title}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(idx)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Elegant artistic fallback */
                    <div
                      className={`w-full h-full bg-gradient-to-tr ${
                        fallbackGradients[idx % fallbackGradients.length]
                      } flex flex-col items-center justify-center p-3 text-center`}
                    >
                      <ImageIcon className="w-5 h-5 text-[#F7F4EB]/40 mb-1" />
                      <span className="text-[11px] font-serif text-[#FAF5EB]/80 italic">
                        {mem.title}
                      </span>
                    </div>
                  )}

                  {/* Viewed indicator */}
                  {isViewed && (
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/60 text-[#D4AF37] backdrop-blur-xs">
                      ✓ viewed
                    </span>
                  )}
                </div>

                {/* Polaroid handwritten caption */}
                <div className="mt-3 text-center w-full px-1">
                  <span className="text-xs sm:text-[13px] font-serif text-[#2B231D] font-normal truncate block">
                    {mem.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Enlarged Photo Lightbox Modal */}
      {activeMemory !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-300"
          onClick={handleClosePhoto}
        >
          <div
            className="relative max-w-lg w-full bg-[#FBF8F1] rounded-lg p-5 sm:p-7 shadow-2xl flex flex-col items-center text-[#241E19] select-text"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClosePhoto}
              className="absolute top-3 right-3 p-1.5 rounded-full text-[#6E645A] hover:text-[#18130F] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Enlarged photo frame */}
            <div className="w-full aspect-square sm:aspect-[4/3] max-h-[60vh] rounded bg-[#1D2133] overflow-hidden mb-5 shadow-inner">
              {!imageErrorMap[activeMemoryIndex!] ? (
                <img
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(activeMemoryIndex!)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-tr ${
                    fallbackGradients[activeMemoryIndex! % fallbackGradients.length]
                  } flex flex-col items-center justify-center p-6 text-center text-[#FAF5EB]`}
                >
                  <Sparkles className="w-7 h-7 text-[#D4AF37] mb-2" />
                  <span className="text-base font-serif italic mb-1">
                    {activeMemory.title}
                  </span>
                  <span className="text-xs text-[#FAF5EB]/60 font-light">
                    Add your image in config.js to display your own picture here
                  </span>
                </div>
              )}
            </div>

            {/* Memory title and poetic caption */}
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#241E19] mb-2 text-center">
              {activeMemory.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#4E443B] font-light leading-relaxed text-center max-w-md italic">
              "{activeMemory.text}"
            </p>

            <div className="mt-5 pt-3 border-t border-[#E8DEC8] w-full flex justify-between items-center text-[10px] text-[#8C7E70] uppercase tracking-wider">
              <span>October Memory</span>
              <span>Keep this memory close</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer subtle text */}
      <footer className="relative z-10 w-full text-center text-[11px] text-[#6F7794] font-light">
        Memories soften the edges of the coldest nights.
      </footer>
    </div>
  );
};
