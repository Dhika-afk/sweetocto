import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { AppConfig } from "../config";

interface HiddenLetterSceneProps {
  config: AppConfig;
  onFinishLetter: () => void;
  onBack: () => void;
}

export const HiddenLetterScene: React.FC<HiddenLetterSceneProps> = ({
  config,
  onFinishLetter,
  onBack,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [revealedLinesCount, setRevealedLinesCount] = useState(0);

  // Split personal message into clean lines/paragraphs for line-by-line reveal
  const messageLines = config.personalMessage
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const totalLines = messageLines.length + 2; // + "For You" + "Happy October 1st."

  // Line-by-line sequential reveal when opened
  useEffect(() => {
    if (!isOpened) return;

    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setRevealedLinesCount(current);
      if (current >= totalLines) {
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [isOpened, totalLines]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto">
      {/* Top Bar with Back Button */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs sm:text-sm text-[#A5ADC6] hover:text-[#FAF6EE] transition-colors py-2 px-3 -ml-3 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to the world</span>
        </button>

        <div className="text-xs text-[#D4AF37]/90 tracking-widest uppercase">
          Secret Letter
        </div>
      </header>

      {/* Main Letter Unfolding Stage */}
      <main className="relative z-10 my-auto py-8 max-w-xl mx-auto w-full flex flex-col items-center text-center">
        {!isOpened ? (
          /* Unopened sealed envelope state */
          <div className="flex flex-col items-center animate-float-slow">
            <span className="text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-medium mb-3">
              There's one more thing.
            </span>

            {/* Interactive Envelope with wax seal */}
            <div
              onClick={() => setIsOpened(true)}
              className="group relative w-72 sm:w-80 h-48 sm:h-52 rounded-2xl bg-gradient-to-b from-[#221A20] via-[#1B1419] to-[#120D11] border border-[#D4AF37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer flex flex-col items-center justify-center p-6 transition-all duration-500 hover:scale-102 hover:shadow-[0_25px_60px_rgba(212,175,55,0.15)]"
            >
              {/* Envelope flap lines */}
              <div className="absolute inset-x-0 top-0 h-24 border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#2A2027] to-transparent rounded-t-2xl pointer-events-none" />

              {/* Crimson Wax Seal */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-[#7B1123] via-[#9E1B32] to-[#B8243E] border border-[#E63946]/50 shadow-[0_4px_16px_rgba(0,0,0,0.7)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-sm font-serif italic text-[#FFE3E8]">
                  ♡
                </span>
              </div>

              <span className="mt-4 text-xs font-serif text-[#D4C3A3] tracking-widest uppercase group-hover:text-[#FAF5EC] transition-colors">
                Tap to Open
              </span>
            </div>
          </div>
        ) : (
          /* Unfolded Parchment Paper Letter */
          <div className="w-full bg-[#FAF7F0] text-[#201A15] p-7 sm:p-10 rounded-2xl paper-shadow border border-[#E9DFCE] transition-all duration-1000 transform animate-float-subtle select-text text-left">
            {/* Minimal Letter Header */}
            <div className="border-b border-[#E8DFC9] pb-4 mb-6 flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-widest text-[#8C7A68]">
                {config.date}
              </span>
              <span className="text-xs font-serif italic text-[#8C7A68]">
                For You
              </span>
            </div>

            {/* Line 1: For You */}
            {revealedLinesCount >= 1 && (
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1F1914] mb-3 transition-opacity duration-700 font-normal">
                For You, {config.recipientName}
              </h2>
            )}

            {/* Line 2: Happy October 1st */}
            {revealedLinesCount >= 2 && (
              <p className="text-base sm:text-lg font-serif italic text-[#8B2635] mb-6 transition-opacity duration-700">
                Happy October 1st.
              </p>
            )}

            {/* Revealed paragraphs from CONFIG.personalMessage */}
            <div className="space-y-4 text-sm sm:text-base text-[#3C3229] font-light leading-relaxed">
              {messageLines.map((line, idx) => {
                const isRevealed = revealedLinesCount >= idx + 3;
                if (!isRevealed) return null;

                return (
                  <p
                    key={idx}
                    className="transition-all duration-700 ease-out transform translate-y-0 opacity-100"
                  >
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Sender Sign-off */}
            {revealedLinesCount >= totalLines && (
              <div className="mt-8 pt-5 border-t border-[#E8DFC9] flex justify-end">
                <span className="text-sm font-serif italic text-[#6A5A4D]">
                  — With warmth, {config.senderName}
                </span>
              </div>
            )}

            {/* Action to proceed to Final Scene */}
            {revealedLinesCount >= totalLines && (
              <div className="mt-8 pt-4 flex justify-center">
                <button
                  onClick={onFinishLetter}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#181D33] hover:bg-[#252C4D] text-[#FAF5EC] text-xs uppercase tracking-widest font-medium transition-all duration-300 shadow cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Look back at the world</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer subtle text */}
      <footer className="relative z-10 w-full text-center text-[11px] text-[#6F7794] font-light">
        Some things are meant to be kept gently.
      </footer>
    </div>
  );
};
