import React, { useState } from "react";
import { Sparkles, Check, Compass, Lock, X, ChevronRight, Heart } from "lucide-react";
import { AppConfig } from "../config";

interface LittleWorldViewProps {
  config: AppConfig;
  discoveredAreas: {
    garden: boolean;
    cafe: boolean;
    memory: boolean;
    hill: boolean;
    letter: boolean;
  };
  selectedFlower: string | null;
  discoveredChocolates?: number[];
  visitedMemories?: number[];
  isConstellationComplete: boolean;
  onNavigate: (
    scene: "garden" | "cafe" | "memory" | "hill" | "letter" | "final"
  ) => void;
}

export const LittleWorldView: React.FC<LittleWorldViewProps> = ({
  config,
  discoveredAreas,
  selectedFlower,
  discoveredChocolates = [],
  visitedMemories = [],
  isConstellationComplete,
  onNavigate,
}) => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // 4 Core Tasks:
  // 1. Garden: Pilih bunga favorit untuk buket
  const isGardenDone = Boolean(selectedFlower && discoveredAreas.garden);
  // 2. Cafe: Buka semua 6 keping cokelat
  const isCafeDone = discoveredChocolates.length >= 6;
  // 3. Memory Room: Buka semua 4 foto kenangan
  const isMemoryDone = visitedMemories.length >= (config.memories?.length || 4);
  // 4. Starlight Hill: Hubungkan rasi bintang berbentuk hati
  const isHillDone = isConstellationComplete;

  const completedTasksCount =
    (isGardenDone ? 1 : 0) +
    (isCafeDone ? 1 : 0) +
    (isMemoryDone ? 1 : 0) +
    (isHillDone ? 1 : 0);

  const allTasksCompleted = completedTasksCount === 4;
  const isReadyForFinal = discoveredAreas.letter;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 select-none overflow-x-hidden">
      {/* Top Exploration Bar */}
      <header className="relative z-30 flex items-center justify-between w-full max-w-5xl mx-auto pt-2">
        <div className="flex flex-col">
          <span className="text-[11px] tracking-[0.22em] uppercase text-[#D4AF37] font-medium">
            {config.date}
          </span>
          <h1 className="text-sm sm:text-base font-serif text-[#FAF5EB] font-normal tracking-wide">
            A Little World For {config.recipientName}
          </h1>
        </div>

        {/* Task progress & modal button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTaskModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161B2E]/90 hover:bg-[#202742] border border-[#D4AF37]/35 text-xs text-[#FAF5EB] transition-all cursor-pointer shadow-sm hover:scale-102"
            title="Lihat daftar tugas untuk membuka surat rahasia"
          >
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-wider font-medium text-[#C4CDDE]">
              Tasks:
            </span>
            <span
              className={`font-mono text-xs font-semibold ${
                allTasksCompleted ? "text-[#52B788]" : "text-[#D4AF37]"
              }`}
            >
              {completedTasksCount}/4
            </span>
            {allTasksCompleted ? (
              <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
            ) : (
              <span className="text-[10px] text-[#A5ADC6] underline ml-0.5">
                Checklist
              </span>
            )}
          </button>

          {isReadyForFinal && (
            <button
              onClick={() => onNavigate("final")}
              className="text-xs text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Ending</span>
              <span>→</span>
            </button>
          )}
        </div>
      </header>

      {/* Center Interactive Miniature Diorama Island */}
      <main className="relative z-10 my-auto w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-4">
        {/* Soft moonlight beam down the center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-[500px] bg-gradient-to-b from-[#FDF8EB]/10 via-[#FDF8EB]/3 to-transparent blur-3xl pointer-events-none" />

        {/* Dynamic active label floating above the world */}
        <div className="h-8 sm:h-10 flex items-center justify-center mb-2">
          {hoveredArea ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#12162B]/80 backdrop-blur-md border border-[#F4EBD9]/15 text-xs text-[#FAF5EB] animate-float-subtle">
              <span>{hoveredArea}</span>
            </div>
          ) : (
            <span className="text-xs text-[#6F7794] font-light tracking-wide italic">
              Tap any landmark to enter and explore
            </span>
          )}
        </div>

        {/* Interactive Diorama Container with 3D Float */}
        <div className="relative w-full max-w-2xl aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center animate-float-slow">
          {/* Base SVG Floating Miniature World Island */}
          <svg
            viewBox="0 0 800 550"
            className="w-full h-full filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
          >
            <defs>
              {/* Grass gradient */}
              <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2E3C2B" />
                <stop offset="60%" stopColor="#1E2A1C" />
                <stop offset="100%" stopColor="#141E13" />
              </linearGradient>

              {/* Earth Cliff gradient */}
              <linearGradient id="cliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2A211D" />
                <stop offset="50%" stopColor="#1E1715" />
                <stop offset="100%" stopColor="#0F0C0B" />
              </linearGradient>

              {/* Water / Pond gradient */}
              <linearGradient id="pondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1A2D42" />
                <stop offset="100%" stopColor="#0F1B28" />
              </linearGradient>

              {/* Warm Window Light */}
              <radialGradient id="warmLight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFDE59" stopOpacity="1" />
                <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Cliff Floating Underside Island */}
            <path
              d="M120 320 C180 460 300 520 400 530 C500 520 620 460 680 320 C640 370 560 390 400 390 C240 390 160 370 120 320 Z"
              fill="url(#cliffGrad)"
            />
            {/* Hanging miniature roots */}
            <path
              d="M380 500 Q370 535 375 545 M420 495 Q430 530 425 540 M280 430 Q270 460 275 470"
              stroke="#1A1310"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Island Main Plateau Top (Isometric Grass Field) */}
            <ellipse
              cx="400"
              cy="310"
              rx="280"
              ry="110"
              fill="url(#grassGrad)"
              stroke="#3A4D39"
              strokeWidth="2"
            />

            {/* Raised Hill on the upper right (Starlight Hill) */}
            <path
              d="M480 280 C500 210 560 170 620 180 C670 190 690 240 680 290 C620 300 540 300 480 280 Z"
              fill="#253323"
              stroke="#32442F"
              strokeWidth="2"
            />

            {/* Miniature Cobblestone Pathways */}
            <path
              d="M400 320 Q320 340 260 330 M400 320 Q480 340 540 330 M400 320 Q410 270 400 240 M400 320 Q500 280 590 220"
              stroke="#43372D"
              strokeWidth="5"
              strokeDasharray="4,6"
              fill="none"
              opacity="0.8"
            />

            {/* Little Wishing Pond near center */}
            <ellipse
              cx="380"
              cy="345"
              rx="38"
              ry="16"
              fill="url(#pondGrad)"
              stroke="#2E4862"
              strokeWidth="1.5"
            />
            {/* Soft water highlight */}
            <ellipse cx="375" cy="342" rx="14" ry="4" fill="#60A5FA" opacity="0.3" />

            {/* Ambient Trees & Foliage */}
            {/* Tree 1 left */}
            <circle cx="170" cy="270" r="24" fill="#1C2E1A" />
            <circle cx="175" cy="265" r="18" fill="#2D472A" />
            {/* Tree 2 right */}
            <circle cx="640" cy="310" r="22" fill="#1C2E1A" />
            <circle cx="645" cy="305" r="16" fill="#2E4A2B" />
            {/* Tree 3 autumn birch */}
            <circle cx="330" cy="210" r="18" fill="#8C532B" opacity="0.85" />
            <circle cx="333" cy="207" r="13" fill="#B36B34" opacity="0.85" />

            {/* Miniature Street Lanterns with glowing halos */}
            <circle cx="340" cy="315" r="18" fill="url(#warmLight)" />
            <rect x="339" y="315" width="2" height="12" fill="#18130E" />
            <circle cx="340" cy="315" r="2.5" fill="#FFE599" />

            <circle cx="470" cy="315" r="18" fill="url(#warmLight)" />
            <rect x="469" y="315" width="2" height="12" fill="#18130E" />
            <circle cx="470" cy="315" r="2.5" fill="#FFE599" />
          </svg>

          {/* =========================================================================
              INTERACTIVE LANDMARK 1: 🌹 FLOWER GARDEN (Lower Left)
             ========================================================================= */}
          <div
            onClick={() => onNavigate("garden")}
            onMouseEnter={() =>
              setHoveredArea(
                `🌹 Flower Garden ${
                  discoveredAreas.garden ? "· ✓ discovered" : ""
                }`
              )
            }
            onMouseLeave={() => setHoveredArea(null)}
            className="group absolute left-[14%] sm:left-[16%] bottom-[22%] sm:bottom-[24%] z-20 cursor-pointer p-4 transition-transform duration-300 hover:scale-110 active:scale-95"
            title="Flower Garden"
          >
            {/* Soft Ambient Glow */}
            <div className="absolute inset-0 rounded-full bg-[#B83A4B]/20 blur-md group-hover:bg-[#B83A4B]/35 transition-colors" />

            {/* Illustrated Garden Miniature Object */}
            <div className="relative flex flex-col items-center">
              {/* Blooming Flower Cluster */}
              <div className="relative flex items-center justify-center">
                <span className="text-2xl sm:text-3xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] animate-float-subtle">
                  {selectedFlower === "sunflower"
                    ? "🌻"
                    : selectedFlower === "tulip"
                    ? "🌷"
                    : selectedFlower === "cherry_blossom"
                    ? "🌸"
                    : "🌹"}
                </span>
                {/* Tiny companion buds */}
                <span className="absolute -left-2 bottom-0 text-sm opacity-80">
                  🌱
                </span>
                <span className="absolute -right-2 bottom-0 text-xs opacity-80">
                  ✨
                </span>
              </div>

              {/* Discovery / Task Tag */}
              {isGardenDone ? (
                <div className="mt-1 flex items-center gap-1 text-[10px] text-[#A3E635] font-light bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  <Check className="w-2.5 h-2.5" />
                  <span>buket dipilih</span>
                </div>
              ) : (
                <div className="mt-1 flex items-center gap-1 text-[9px] text-[#D4AF37] font-light bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  <span>pilih bunga</span>
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              INTERACTIVE LANDMARK 2: 🍫 LITTLE CAFÉ (Middle Right)
             ========================================================================= */}
          <div
            onClick={() => onNavigate("cafe")}
            onMouseEnter={() =>
              setHoveredArea(
                `🍫 Little Café ${isCafeDone ? "· ✓ 6/6 cokelat" : `· ${discoveredChocolates.length}/6 cokelat`}`
              )
            }
            onMouseLeave={() => setHoveredArea(null)}
            className="group absolute right-[15%] sm:right-[18%] bottom-[25%] sm:bottom-[28%] z-20 cursor-pointer p-4 transition-transform duration-300 hover:scale-110 active:scale-95"
            title="Little Café"
          >
            {/* Warm window glow */}
            <div className="absolute inset-0 rounded-full bg-[#E09F3E]/25 blur-md group-hover:bg-[#E09F3E]/40 transition-colors animate-window-flicker" />

            {/* Illustrated Cafe Miniature Object */}
            <div className="relative flex flex-col items-center">
              <svg viewBox="0 0 60 50" className="w-12 h-10 sm:w-14 sm:h-12 drop-shadow-[0_6px_12px_rgba(0,0,0,0.7)]">
                {/* Chimney smoke */}
                <circle cx="44" cy="4" r="2" fill="#D4AF37" opacity="0.5" className="animate-ping" />
                <rect x="42" y="6" width="4" height="8" fill="#3D291F" />
                {/* Roof */}
                <polygon points="30,8 6,24 54,24" fill="#582F24" />
                {/* Wall */}
                <rect x="12" y="24" width="36" height="22" fill="#241B16" />
                {/* Glowing warm window */}
                <rect
                  x="16"
                  y="28"
                  width="12"
                  height="12"
                  fill="#FFD166"
                  className="animate-window-flicker"
                />
                <line x1="22" y1="28" x2="22" y2="40" stroke="#4A3423" strokeWidth="1" />
                <line x1="16" y1="34" x2="28" y2="34" stroke="#4A3423" strokeWidth="1" />
                {/* Cozy Door */}
                <rect x="34" y="28" width="10" height="18" fill="#38261A" />
                <circle cx="36" cy="37" r="1" fill="#FFD166" />
              </svg>

              {/* Task Tag */}
              {isCafeDone ? (
                <div className="mt-1 flex items-center gap-1 text-[10px] text-[#A3E635] font-light bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  <Check className="w-2.5 h-2.5" />
                  <span>6/6 cokelat</span>
                </div>
              ) : (
                <div className="mt-1 flex items-center gap-1 text-[9px] text-[#D4AF37] font-light bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  <span>{discoveredChocolates.length}/6 cokelat</span>
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              INTERACTIVE LANDMARK 3: 📸 MEMORY ROOM (Upper Left)
             ========================================================================= */}
          <div
            onClick={() => onNavigate("memory")}
            onMouseEnter={() =>
              setHoveredArea(
                `📸 Memory Room ${isMemoryDone ? "· ✓ 4/4 foto" : `· ${visitedMemories.length}/4 foto`}`
              )
            }
            onMouseLeave={() => setHoveredArea(null)}
            className="group absolute left-[30%] sm:left-[32%] top-[30%] sm:top-[28%] z-20 cursor-pointer p-4 transition-transform duration-300 hover:scale-110 active:scale-95"
            title="Memory Room"
          >
            {/* Glowing lantern halo */}
            <div className="absolute inset-0 rounded-full bg-[#E9C46A]/20 blur-md group-hover:bg-[#E9C46A]/35 transition-colors" />

            {/* Illustrated Cottage Object */}
            <div className="relative flex flex-col items-center">
              <svg viewBox="0 0 60 50" className="w-11 h-9 sm:w-13 sm:h-11 drop-shadow-[0_6px_12px_rgba(0,0,0,0.7)]">
                {/* Roof */}
                <polygon points="30,10 8,24 52,24" fill="#3A405A" />
                {/* Wall */}
                <rect x="14" y="24" width="32" height="22" fill="#1F2336" />
                {/* Warm Lighted Window */}
                <circle cx="30" cy="33" r="6" fill="#FCE77D" className="animate-window-flicker" />
                {/* Door */}
                <rect x="26" y="38" width="8" height="8" fill="#141724" />
                {/* Polaroid hanging accent */}
                <rect x="42" y="27" width="5" height="7" fill="#FAF5EB" opacity="0.9" />
              </svg>

              {/* Task Tag */}
              {isMemoryDone ? (
                <div className="mt-1 flex items-center gap-1 text-[10px] text-[#A3E635] font-light bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  <Check className="w-2.5 h-2.5" />
                  <span>4/4 foto</span>
                </div>
              ) : (
                <div className="mt-1 flex items-center gap-1 text-[9px] text-[#D4AF37] font-light bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  <span>{visitedMemories.length}/4 foto</span>
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              INTERACTIVE LANDMARK 4: ⭐ STARLIGHT HILL (Upper Right Peak)
             ========================================================================= */}
          <div
            onClick={() => onNavigate("hill")}
            onMouseEnter={() =>
              setHoveredArea(
                `⭐ Starlight Hill ${isHillDone ? "· ✓ rasi hati selesai" : "· hubungkan bintang"}`
              )
            }
            onMouseLeave={() => setHoveredArea(null)}
            className="group absolute right-[22%] sm:right-[24%] top-[18%] sm:top-[16%] z-20 cursor-pointer p-4 transition-transform duration-300 hover:scale-110 active:scale-95"
            title="Starlight Hill"
          >
            {/* Celestial Shimmer Glow */}
            <div className="absolute inset-0 rounded-full bg-[#818CF8]/25 blur-lg group-hover:bg-[#818CF8]/40 transition-colors animate-pulse" />

            {/* Illustrated Summit Telescope & Sparkling Stars */}
            <div className="relative flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_12px_#F4D35E]">
                  ⭐
                </span>
                <span className="absolute -top-3 -right-2 text-xs text-[#E0E7FF] animate-twinkle">
                  ✦
                </span>
                <span className="absolute -bottom-2 -left-2 text-[10px] text-[#FDE68A] animate-ping">
                  ·
                </span>
              </div>

              {/* Task Tag */}
              {isHillDone ? (
                <div className="mt-1 flex items-center gap-1 text-[10px] text-[#A3E635] font-light bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  <Check className="w-2.5 h-2.5" />
                  <span>rasi hati</span>
                </div>
              ) : (
                <div className="mt-1 flex items-center gap-1 text-[9px] text-[#D4AF37] font-light bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  <span>rasi bintang</span>
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              INTERACTIVE LANDMARK 5: 💌 SECRET ENVELOPE (Center Clearing)
              MUNCUL KETIKA SEMUA 4 TASK SUDAH DIKERJAKAN
             ========================================================================= */}
          {allTasksCompleted ? (
            <div
              onClick={() => onNavigate("letter")}
              onMouseEnter={() =>
                setHoveredArea("💌 Hidden Letter · Muncul untukmu! Klik untuk buka.")
              }
              onMouseLeave={() => setHoveredArea(null)}
              className="group absolute left-1/2 top-[52%] sm:top-[50%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer p-3 transition-transform duration-300 hover:scale-115 active:scale-95 animate-float-subtle"
              title="Hidden Letter"
            >
              {/* Golden pulsing ring & ambient burst */}
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/45 blur-lg group-hover:bg-[#D4AF37]/65 transition-colors animate-pulse" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1 h-14 bg-gradient-to-t from-[#D4AF37]/60 to-transparent pointer-events-none" />

              {/* Glowing wax-sealed envelope icon */}
              <div className="relative flex flex-col items-center">
                <div className="relative w-12 h-8 sm:w-14 sm:h-9 rounded bg-gradient-to-tr from-[#42211A] via-[#653326] to-[#8C4736] border border-[#F3DE8A] shadow-[0_6px_24px_rgba(212,175,55,0.4)] flex items-center justify-center">
                  {/* Wax Heart Seal */}
                  <div className="w-5 h-5 rounded-full bg-[#B8243E] border border-white/60 flex items-center justify-center shadow">
                    <span className="text-[9px] text-white">♡</span>
                  </div>
                </div>

                <span className="mt-1.5 text-[9px] sm:text-[10px] font-serif text-[#FFFDF8] tracking-wider bg-black/85 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50 shadow flex items-center gap-1 animate-bounce">
                  <Sparkles className="w-2.5 h-2.5 text-[#F3DE8A]" />
                  <span>Surat Rahasia Terbuka</span>
                </span>
              </div>
            </div>
          ) : (
            /* Silhouette / Locked Pedestal when tasks are still pending */
            <div
              onClick={() => setShowTaskModal(true)}
              onMouseEnter={() =>
                setHoveredArea(
                  `🔒 Hidden Letter · Terkunci (${completedTasksCount}/4 task selesai)`
                )
              }
              onMouseLeave={() => setHoveredArea(null)}
              className="group absolute left-1/2 top-[52%] sm:top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer p-3 transition-transform duration-300 hover:scale-105"
              title="Hidden Letter (Terkunci - Klik untuk lihat task)"
            >
              <div className="relative flex flex-col items-center opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="relative w-10 h-7 rounded bg-[#131728]/85 border border-[#D4AF37]/25 flex items-center justify-center backdrop-blur-xs shadow-sm">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]/70" />
                </div>
                <span className="mt-1 text-[9px] font-mono text-[#A2A9BE] bg-black/65 px-2 py-0.5 rounded-full border border-white/5">
                  Terkunci ({completedTasksCount}/4)
                </span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Exploration Footer guidance */}
      <footer className="relative z-20 w-full max-w-lg mx-auto text-center pb-2">
        {allTasksCompleted ? (
          <div className="flex flex-col items-center gap-1 animate-float-subtle">
            <span className="text-xs text-[#52B788] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Semua 4 task telah selesai! Surat rahasia telah muncul di tengah pulau.</span>
            </span>
            <button
              onClick={() => onNavigate("letter")}
              className="text-xs text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1 font-serif italic mt-0.5"
            >
              <span>Buka surat untuk Ola sekarang</span>
              <span>→</span>
            </button>
          </div>
        ) : (
          <p className="text-[11px] sm:text-xs text-[#828BA5] font-light leading-relaxed">
            Selesaikan semua 4 task di pulau ini untuk memunculkan surat rahasia.
          </p>
        )}
      </footer>

      {/* Task Checklist Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#0E1220] border border-[#D4AF37]/35 rounded-2xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9)] text-left">
            <button
              onClick={() => setShowTaskModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C95AA] hover:text-[#FAF5EB] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-medium">
                Daftar Tugas Dunia Miniatur
              </span>
            </div>

            <h3 className="text-lg font-serif text-[#FAF5EB] font-normal mb-1">
              Buka Surat Rahasia Untuk Ola
            </h3>
            <p className="text-xs text-[#8E97B0] font-light mb-5">
              Selesaikan 4 task berikut agar amplop rahasia bersegel lilin muncul di tengah pulau:
            </p>

            {/* Checklist Items */}
            <div className="space-y-3">
              {/* Task 1 */}
              <div
                onClick={() => {
                  setShowTaskModal(false);
                  onNavigate("garden");
                }}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isGardenDone
                    ? "bg-[#18261F]/60 border-[#52B788]/30"
                    : "bg-[#14182B] hover:bg-[#1B213B] border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌹</span>
                  <div>
                    <h4 className="text-xs font-serif text-[#FAF5EB]">
                      1. Flower Garden
                    </h4>
                    <p className="text-[11px] text-[#8E97B0]">
                      Pilih satu bunga favorit untuk disimpan di buket Ola
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {isGardenDone ? (
                    <span className="text-[11px] font-mono text-[#52B788] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Selesai
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#D4AF37] flex items-center gap-0.5">
                      Mulai <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>

              {/* Task 2 */}
              <div
                onClick={() => {
                  setShowTaskModal(false);
                  onNavigate("cafe");
                }}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isCafeDone
                    ? "bg-[#18261F]/60 border-[#52B788]/30"
                    : "bg-[#14182B] hover:bg-[#1B213B] border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🍫</span>
                  <div>
                    <h4 className="text-xs font-serif text-[#FAF5EB]">
                      2. Little Café
                    </h4>
                    <p className="text-[11px] text-[#8E97B0]">
                      Buka semua 6 keping cokelat di meja malam ({discoveredChocolates.length}/6)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {isCafeDone ? (
                    <span className="text-[11px] font-mono text-[#52B788] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Selesai
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#D4AF37] flex items-center gap-0.5">
                      Buka <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>

              {/* Task 3 */}
              <div
                onClick={() => {
                  setShowTaskModal(false);
                  onNavigate("memory");
                }}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isMemoryDone
                    ? "bg-[#18261F]/60 border-[#52B788]/30"
                    : "bg-[#14182B] hover:bg-[#1B213B] border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📸</span>
                  <div>
                    <h4 className="text-xs font-serif text-[#FAF5EB]">
                      3. Memory Room
                    </h4>
                    <p className="text-[11px] text-[#8E97B0]">
                      Lihat 4 foto polaroid kenangan ({visitedMemories.length}/4 dilihat)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {isMemoryDone ? (
                    <span className="text-[11px] font-mono text-[#52B788] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Selesai
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#D4AF37] flex items-center gap-0.5">
                      Lihat <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>

              {/* Task 4 */}
              <div
                onClick={() => {
                  setShowTaskModal(false);
                  onNavigate("hill");
                }}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isHillDone
                    ? "bg-[#18261F]/60 border-[#52B788]/30"
                    : "bg-[#14182B] hover:bg-[#1B213B] border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">⭐</span>
                  <div>
                    <h4 className="text-xs font-serif text-[#FAF5EB]">
                      4. Starlight Hill
                    </h4>
                    <p className="text-[11px] text-[#8E97B0]">
                      Hubungkan titik-titik bintang menjadi rasi berbentuk hati
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {isHillDone ? (
                    <span className="text-[11px] font-mono text-[#52B788] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Selesai
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#D4AF37] flex items-center gap-0.5">
                      Hubungkan <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#959EBA] font-mono">
                {completedTasksCount}/4 Task Selesai
              </span>

              {allTasksCompleted ? (
                <button
                  onClick={() => {
                    setShowTaskModal(false);
                    onNavigate("letter");
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#B83A4B] to-[#912A38] text-xs text-white font-medium shadow-md hover:scale-102 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Buka Surat Rahasia</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="text-xs text-[#C7CEE0] hover:text-white transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
