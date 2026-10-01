import React, { useState } from "react";
import { ArrowLeft, Sparkles, Coffee } from "lucide-react";

interface LittleCafeSceneProps {
  discoveredChocolates: number[];
  onOpenChocolate: (index: number) => void;
  onBack: () => void;
}

interface ChocolatePiece {
  id: number;
  shape: "truffle" | "square" | "heart" | "praline" | "dome" | "gold";
  title: string;
  message: string;
}

const CHOCOLATES: ChocolatePiece[] = [
  {
    id: 1,
    shape: "truffle",
    title: "No. 01",
    message: "For your smile.",
  },
  {
    id: 2,
    shape: "square",
    title: "No. 02",
    message: "For all the random conversations.",
  },
  {
    id: 3,
    shape: "dome",
    title: "No. 03",
    message: "For the little things you probably don't notice.",
  },
  {
    id: 4,
    shape: "praline",
    title: "No. 04",
    message: "For the moments that somehow stayed in my head.",
  },
  {
    id: 5,
    shape: "square",
    title: "No. 05",
    message: "Okay… this is getting a little obvious.",
  },
  {
    id: 6,
    shape: "gold",
    title: "No. 06",
    message: "This one is actually just for you. ♡",
  },
];

export const LittleCafeScene: React.FC<LittleCafeSceneProps> = ({
  discoveredChocolates,
  onOpenChocolate,
  onBack,
}) => {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [activeNumber, setActiveNumber] = useState<number | null>(null);

  const handlePieceClick = (index: number) => {
    onOpenChocolate(index);
    const piece = CHOCOLATES[index];
    setActiveMessage(piece.message);
    setActiveNumber(piece.id);
  };

  const allOpened = discoveredChocolates.length >= 6;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto">
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
          <span>Little Café</span>
          <span className="text-[#6F7794]">·</span>
          <span className="text-[#8E95AA]">{discoveredChocolates.length}/6 opened</span>
        </div>
      </header>

      {/* Main Café Table & Chocolate Box */}
      <main className="relative z-10 my-auto py-6 max-w-2xl mx-auto w-full flex flex-col items-center text-center">
        {/* Warm Window Glow Ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E09F3E]/10 blur-3xl pointer-events-none" />

        {/* Ambient Steam / Coffee indicator */}
        <div className="flex items-center gap-2 text-xs text-[#D4AF37]/80 uppercase tracking-widest mb-2 font-medium">
          <Coffee className="w-3.5 h-3.5" />
          <span>Warm Night Table</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF5EC] mb-2 font-normal">
          The Chocolate Box
        </h2>
        <p className="text-xs sm:text-sm text-[#9CA5BE] max-w-sm mx-auto mb-8 font-light">
          Tap each chocolate piece to reveal what is tucked inside.
        </p>

        {/* Revealed message banner */}
        <div className="min-h-[58px] flex items-center justify-center mb-6 px-4 py-2.5 rounded-xl bg-[#14192D]/70 border border-[#F4EBD9]/10 max-w-md w-full backdrop-blur-sm transition-all duration-300">
          {activeMessage ? (
            <div className="flex flex-col items-center animate-float-subtle">
              <span className="text-[11px] uppercase tracking-wider text-[#D4AF37]/80">
                Piece {activeNumber}
              </span>
              <p className="text-sm sm:text-base font-serif italic text-[#FAF4E6] mt-0.5">
                "{activeMessage}"
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#6F7794] italic font-light">
              Tap a piece on the table below...
            </p>
          )}
        </div>

        {/* The Chocolate Box Tray */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1C1619] via-[#161214] to-[#0E0C0D] border border-[#D4AF37]/25 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] w-full max-w-md">
          {/* Inner velvet lining */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 p-4 rounded-2xl bg-[#0B090A] border border-[#2B1B1E] shadow-inner">
            {CHOCOLATES.map((choco, idx) => {
              const isOpened = discoveredChocolates.includes(idx);
              const isActive = activeNumber === choco.id;

              return (
                <button
                  key={choco.id}
                  onClick={() => handlePieceClick(idx)}
                  className={`group relative flex flex-col items-center justify-center aspect-square rounded-xl p-2 transition-all duration-500 cursor-pointer ${
                    isOpened
                      ? "bg-[#1F171A] border border-[#D4AF37]/35 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                      : "bg-[#141012] hover:bg-[#1A1518] border border-[#3A282D] hover:border-[#D4AF37]/30"
                  } ${isActive ? "ring-2 ring-[#D4AF37]/70 scale-105" : "hover:scale-102"}`}
                  title={`Open piece ${choco.id}`}
                >
                  {/* Visual Chocolate Piece */}
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    {/* Unopened vs Opened visual representations */}
                    {!isOpened ? (
                      /* Wrapped foil / mysterious confectionery */
                      <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-tr from-[#3D251E] via-[#5C3A2E] to-[#7B4D3C] border border-[#8C5D49]/40 shadow-md flex items-center justify-center group-hover:rotate-3 transition-transform duration-300">
                        {/* Foil ribbon */}
                        <div className="w-full h-1 bg-[#D4AF37]/60 absolute top-1/2 -translate-y-1/2" />
                        <span className="text-[10px] text-[#F3E3CA] font-serif font-medium z-10">
                          {choco.id}
                        </span>
                      </div>
                    ) : (
                      /* Opened rich dark chocolate with artisan drizzle */
                      <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-[#291711] via-[#1E100C] to-[#120906] border border-[#A66F42]/40 shadow-inner flex items-center justify-center animate-pulse-warmth">
                        {/* Artisanal gold dust or drizzle */}
                        <div className="absolute inset-1 rounded-md border border-dashed border-[#D4AF37]/40" />
                        <Sparkles className="w-3.5 h-3.5 text-[#E9C46A]" />
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] tracking-wider text-[#A29A91] mt-1 font-mono">
                    {choco.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Completion Note */}
          {allOpened && (
            <div className="mt-5 pt-3 border-t border-[#D4AF37]/20 flex flex-col items-center animate-float-subtle">
              <span className="text-xs uppercase tracking-widest text-[#52B788] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You found them all.</span>
              </span>
              <p className="text-xs text-[#C4B7A5] font-light mt-1">
                Every piece has a reason.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer subtle text */}
      <footer className="relative z-10 w-full text-center text-[11px] text-[#6F7794] font-light">
        A small table tucked into the quietest corner of the café.
      </footer>
    </div>
  );
};
