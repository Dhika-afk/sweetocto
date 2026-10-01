import React, { useState, useEffect } from "react";
import { AppConfig } from "../config";
import { Sparkles, Heart } from "lucide-react";

interface FinalSceneProps {
  config: AppConfig;
  selectedFlower: string | null;
  discoveredChocolatesCount: number;
  visitedMemoriesCount: number;
  isConstellationComplete: boolean;
}

export const FinalScene: React.FC<FinalSceneProps> = ({
  config,
  selectedFlower,
  discoveredChocolatesCount,
  visitedMemoriesCount,
  isConstellationComplete,
}) => {
  const [step, setStep] = useState(0);

  // Timed poetic line reveals:
  // Step 1: "Maybe flowers fade."
  // Step 2: "Maybe chocolate disappears."
  // Step 3: "But I'll keep this little October somewhere."
  // Step 4: "Happy October 1st, [RECIPIENT_NAME]. ♡" + "— [SENDER_NAME]"
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1200);
    const timer2 = setTimeout(() => setStep(2), 3500);
    const timer3 = setTimeout(() => setStep(3), 6000);
    const timer4 = setTimeout(() => setStep(4), 8500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden">
      {/* Top subtle date */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-4xl mx-auto">
        <div className="text-xs text-[#8E95AA] tracking-[0.25em] uppercase">
          {config.date}
        </div>
        <div className="text-xs text-[#D4AF37]/80 tracking-widest uppercase flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span>A Little World Kept</span>
        </div>
      </header>

      {/* Main Center World Silhouette & Poetic Epilogue */}
      <main className="relative z-10 my-auto py-6 max-w-xl mx-auto w-full flex flex-col items-center text-center">
        {/* Soft golden celestial halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-t from-[#D4AF37]/15 via-[#B33951]/10 to-transparent blur-3xl pointer-events-none" />

        {/* Central miniature token / bouquet symbol */}
        <div className="relative mb-10 animate-float-slow">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#12162A]/90 border border-[#D4AF37]/35 shadow-[0_0_40px_rgba(212,175,55,0.2)] flex items-center justify-center">
            {/* Inner rings */}
            <div className="absolute inset-2 rounded-full border border-dashed border-[#F4EBD9]/20 animate-spin [animation-duration:60s]" />

            {/* Visual bouquet / heart */}
            <div className="relative flex flex-col items-center">
              <span className="text-2xl sm:text-3xl text-[#E63946] animate-pulse">
                {selectedFlower === "sunflower"
                  ? "🌻"
                  : selectedFlower === "tulip"
                  ? "🌷"
                  : selectedFlower === "cherry_blossom"
                  ? "🌸"
                  : "🌹"}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-serif mt-1">
                For You
              </span>
            </div>
          </div>
        </div>

        {/* Staggered Poetic Reveal Lines */}
        <div className="min-h-[140px] flex flex-col items-center justify-center space-y-4 px-4 text-balance">
          {step >= 1 && (
            <p className="text-base sm:text-xl font-serif text-[#C5CADB] font-light transition-opacity duration-1000 ease-out">
              Maybe flowers fade.
            </p>
          )}

          {step >= 2 && (
            <p className="text-base sm:text-xl font-serif text-[#C5CADB] font-light transition-opacity duration-1000 ease-out">
              Maybe chocolate disappears.
            </p>
          )}

          {step >= 3 && (
            <p className="text-lg sm:text-2xl font-serif text-[#FAF4E6] font-normal italic transition-opacity duration-1000 ease-out">
              But I'll keep this little October somewhere.
            </p>
          )}
        </div>

        {/* Grand Final Dedication */}
        {step >= 4 && (
          <div className="mt-10 pt-6 border-t border-[#F4EBD9]/15 flex flex-col items-center transition-all duration-1000 ease-out animate-float-subtle w-full max-w-md">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF5EB] font-normal tracking-tight mb-2">
              Happy October 1st, {config.recipientName}. ♡
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-[#D4AF37] tracking-wider mt-1">
              — {config.senderName}
            </p>

            {/* Tranquil discovery summary */}
            <div className="mt-8 flex items-center gap-4 text-[11px] text-[#78809A] font-light tracking-wide">
              <span>{discoveredChocolatesCount} chocolates opened</span>
              <span>·</span>
              <span>{visitedMemoriesCount} memories kept</span>
              {isConstellationComplete && (
                <>
                  <span>·</span>
                  <span>heart in the stars</span>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Serene Footer */}
      <footer className="relative z-10 w-full text-center text-[11px] text-[#5A627A] font-light">
        October 1st, 2026 · A quiet little world for you
      </footer>
    </div>
  );
};
