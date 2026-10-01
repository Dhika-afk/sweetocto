import React, { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

interface StarlightHillSceneProps {
  isConstellationComplete: boolean;
  onCompleteConstellation: () => void;
  onBack: () => void;
}

// 7 constellation stars positioned to form an elegant heart in the sky
const CONSTELLATION_STARS = [
  { id: 1, x: 50, y: 44, label: "Star of warmth" }, // center top dip
  { id: 2, x: 38, y: 34, label: "Star of whispers" }, // left upper lobe
  { id: 3, x: 26, y: 42, label: "Star of smiles" }, // left outer curve
  { id: 4, x: 34, y: 62, label: "Star of memories" }, // left lower diagonal
  { id: 5, x: 50, y: 76, label: "Star of promises" }, // bottom apex
  { id: 6, x: 66, y: 62, label: "Star of silence" }, // right lower diagonal
  { id: 7, x: 74, y: 42, label: "Star of laughter" }, // right outer curve
  { id: 8, x: 62, y: 34, label: "Star of October" }, // right upper lobe
];

// Connection order to draw the heart constellation:
// 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 1
const CONNECTION_ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 0];

export const StarlightHillScene: React.FC<StarlightHillSceneProps> = ({
  isConstellationComplete,
  onCompleteConstellation,
  onBack,
}) => {
  const [foundStars, setFoundStars] = useState<number[]>(
    isConstellationComplete ? [1, 2, 3, 4, 5, 6, 7, 8] : []
  );

  const handleStarClick = (starId: number) => {
    if (foundStars.includes(starId)) return;
    const nextFound = [...foundStars, starId];
    setFoundStars(nextFound);

    if (nextFound.length === CONSTELLATION_STARS.length) {
      onCompleteConstellation();
    }
  };

  const isCompleted = foundStars.length === CONSTELLATION_STARS.length;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden">
      {/* Top Bar with Back Button */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs sm:text-sm text-[#A5ADC6] hover:text-[#FAF6EE] transition-colors py-2 px-3 -ml-3 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to the world</span>
        </button>

        <div className="text-xs text-[#D4AF37]/90 tracking-widest uppercase flex items-center gap-2">
          <span>Starlight Hill</span>
          <span className="text-[#6F7794]">·</span>
          <span className="text-[#8E95AA]">
            {foundStars.length}/{CONSTELLATION_STARS.length} stars
          </span>
        </div>
      </header>

      {/* Main Sky Area with Constellation */}
      <main className="relative z-10 my-auto w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-1">
          A secret in the night sky
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF5EC] mb-1 font-normal">
          The Hidden Constellation
        </h2>
        <p className="text-xs sm:text-sm text-[#9BA3BD] max-w-sm mx-auto mb-6 font-light">
          {isCompleted
            ? "The celestial pattern has revealed itself."
            : "Look closely at the glowing stars in the sky and tap each one."}
        </p>

        {/* Sky Canvas Viewport */}
        <div className="relative w-full aspect-square max-w-sm sm:max-w-md rounded-3xl bg-[#090C1A]/80 border border-[#232948] p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Subtle background galaxy nebulae */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-[#312E81]/30 via-[#4C1D95]/20 to-transparent blur-3xl pointer-events-none" />

          {/* SVG Constellation lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Draw lines between found stars that are adjacent in CONNECTION_ORDER */}
            {CONNECTION_ORDER.map((starIdx, i) => {
              if (i === 0) return null;
              const prevIdx = CONNECTION_ORDER[i - 1];
              const starA = CONSTELLATION_STARS[prevIdx];
              const starB = CONSTELLATION_STARS[starIdx];

              const isLineActive =
                foundStars.includes(starA.id) && foundStars.includes(starB.id);

              if (!isLineActive) return null;

              return (
                <line
                  key={`${starA.id}-${starB.id}`}
                  x1={`${starA.x}%`}
                  y1={`${starA.y}%`}
                  x2={`${starB.x}%`}
                  y2={`${starB.y}%`}
                  stroke="rgba(244, 211, 94, 0.75)"
                  strokeWidth="1.75"
                  strokeDasharray={isCompleted ? "none" : "3,3"}
                  className="transition-all duration-700 animate-pulse"
                />
              );
            })}
          </svg>

          {/* Interactive Stars */}
          {CONSTELLATION_STARS.map((star) => {
            const isFound = foundStars.includes(star.id);

            return (
              <button
                key={star.id}
                onClick={() => handleStarClick(star.id)}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer p-3 focus:outline-none"
                title={star.label}
              >
                {/* Glowing halo */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isFound
                      ? "bg-[#F4D35E]/30 scale-125 blur-xs"
                      : "bg-[#8E95AA]/20 scale-75 group-hover:scale-100 group-hover:bg-[#F4D35E]/20"
                  }`}
                />

                {/* Star center core */}
                <div
                  className={`relative w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isFound
                      ? "bg-[#FFFDF7] shadow-[0_0_16px_#F4D35E] scale-110"
                      : "bg-[#CBD5E1]/70 group-hover:bg-[#FFFDF7] group-hover:shadow-[0_0_10px_#F4D35E]"
                  }`}
                >
                  {isFound && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
                  )}
                </div>
              </button>
            );
          })}

          {/* Grass hill silhouette at bottom */}
          <div className="absolute -bottom-2 -left-4 -right-4 h-16 bg-gradient-to-t from-[#0B0F1C] to-transparent pointer-events-none flex items-end justify-center pb-2">
            <span className="text-[10px] text-[#555C75] tracking-widest uppercase">
              Looking north towards October
            </span>
          </div>
        </div>

        {/* Discovery Message Box */}
        <div className="min-h-[72px] mt-6 flex flex-col items-center justify-center">
          {isCompleted ? (
            <div className="flex flex-col items-center animate-float-subtle px-4 py-2 rounded-xl bg-[#141A33]/80 border border-[#D4AF37]/30">
              <div className="flex items-center gap-1.5 text-xs text-[#E9C46A] uppercase tracking-wider font-medium mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You found something I hid for you.</span>
              </div>
              <p className="text-sm font-serif italic text-[#FAF4E6]">
                "Maybe it was meant to be found."
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#6F7794] italic font-light">
              Tap each glowing star to draw the celestial lines...
            </p>
          )}
        </div>
      </main>

      {/* Footer subtle text */}
      <footer className="relative z-10 w-full text-center text-[11px] text-[#6F7794] font-light">
        The night sky always remembers what you whisper to it.
      </footer>
    </div>
  );
};
