import React, { useState } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { AppConfig } from "../config";

interface FlowerGardenSceneProps {
  config: AppConfig;
  selectedFlower: string | null;
  onSelectFlower: (flowerId: string) => void;
  onBack: () => void;
}

interface FlowerData {
  id: string;
  name: string;
  meaning: string;
  petalColor: string;
  accentColor: string;
  leafColor: string;
  pathD: string;
  note: string;
}

const FLOWERS: FlowerData[] = [
  {
    id: "rose",
    name: "Rose",
    meaning: "Timeless & warm",
    petalColor: "#B83A4B",
    accentColor: "#D65A6C",
    leafColor: "#2F5233",
    note: "Unmistakable warmth, with a quiet depth that lingers.",
    pathD: "M12 2C8 2 5 6 5 11c0 5 7 11 7 11s7-6 7-11c0-5-3-9-7-9z",
  },
  {
    id: "tulip",
    name: "Tulip",
    meaning: "Graceful & honest",
    petalColor: "#E07A5F",
    accentColor: "#F4A261",
    leafColor: "#3D5A40",
    note: "Gentle elegance. Always opens softly when sunlight arrives.",
    pathD: "M12 3c-3 0-6 4-6 9 0 5 6 10 6 10s6-5 6-10c0-5-3-9-6-9z",
  },
  {
    id: "sunflower",
    name: "Sunflower",
    meaning: "Bright & comforting",
    petalColor: "#E9C46A",
    accentColor: "#F4A261",
    leafColor: "#386641",
    note: "Like an unhurried morning that effortlessly lifts any shadow.",
    pathD: "M12 2l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z",
  },
  {
    id: "cherry_blossom",
    name: "Cherry Blossom",
    meaning: "Delicate & cherished",
    petalColor: "#F4ACB7",
    accentColor: "#FFCAD4",
    leafColor: "#588157",
    note: "A fleeting wonder that makes every quiet second feel precious.",
    pathD: "M12 4c-2 0-4 2-4 5 0 4 4 8 4 8s4-4 4-8c0-3-2-5-4-5z",
  },
];

export const FlowerGardenScene: React.FC<FlowerGardenSceneProps> = ({
  config,
  selectedFlower,
  onSelectFlower,
  onBack,
}) => {
  const [activeFlower, setActiveFlower] = useState<FlowerData>(
    FLOWERS.find((f) => f.id === selectedFlower) || FLOWERS[0]
  );
  const [bloomEffect, setBloomEffect] = useState(false);

  const handleFlowerClick = (flower: FlowerData) => {
    setActiveFlower(flower);
    setBloomEffect(true);
    setTimeout(() => setBloomEffect(false), 800);
  };

  const handlePickForBouquet = () => {
    onSelectFlower(activeFlower.id);
  };

  const isCurrentPicked = selectedFlower === activeFlower.id;

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

        <div className="text-xs text-[#8E95AA] tracking-widest uppercase">
          Flower Garden
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 my-auto py-8 max-w-3xl mx-auto w-full flex flex-col items-center text-center">
        {/* Subtle title */}
        <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-2">
          Pick one to keep
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF5EC] mb-2 font-normal">
          The Little Garden
        </h2>
        <p className="text-xs sm:text-sm text-[#9BA3BD] max-w-md mx-auto mb-8 font-light">
          {config.flowerMessage || "I think this one suits you."}
        </p>

        {/* Central Blooming Flower Showcase */}
        <div className="relative my-4 flex flex-col items-center justify-center">
          {/* Ambient glow behind flower */}
          <div
            className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: `${activeFlower.petalColor}25`,
              transform: bloomEffect ? "scale(1.2)" : "scale(1)",
            }}
          />

          {/* SVG Illustrated Flower */}
          <div
            className={`relative transition-all duration-700 ease-out transform ${
              bloomEffect ? "scale-110 -translate-y-2" : "scale-100"
            }`}
          >
            <svg
              viewBox="0 0 200 240"
              className="w-48 h-56 sm:w-56 sm:h-64 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            >
              {/* Stem */}
              <path
                d="M100 130 Q98 180 102 230"
                fill="none"
                stroke="#2D4A2E"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Leaves */}
              <path
                d="M100 170 C80 160 65 175 60 185 C75 190 95 185 100 175 Z"
                fill={activeFlower.leafColor}
                opacity="0.85"
              />
              <path
                d="M101 190 C120 180 135 195 140 205 C125 210 105 205 101 195 Z"
                fill={activeFlower.leafColor}
                opacity="0.85"
              />

              {/* Flower specific petal illustrations */}
              {activeFlower.id === "rose" && (
                <g transform="translate(100, 110)">
                  <circle r="36" fill={activeFlower.petalColor} opacity="0.9" />
                  <path
                    d="M-28 -10 C-35 15 5 36 28 15 C36 -8 10 -35 -10 -28 Z"
                    fill={activeFlower.accentColor}
                    opacity="0.8"
                  />
                  <path
                    d="M-16 -5 C-20 10 10 22 18 10 C22 -5 5 -20 -8 -16 Z"
                    fill="#E26D7C"
                  />
                  <circle r="8" fill="#FFF1F2" opacity="0.8" />
                </g>
              )}

              {activeFlower.id === "tulip" && (
                <g transform="translate(100, 110)">
                  <path
                    d="M-30 10 C-35 -20 -15 -45 0 -45 C15 -45 35 -20 30 10 C25 25 -25 25 -30 10 Z"
                    fill={activeFlower.petalColor}
                  />
                  <path
                    d="M-22 5 C-26 -15 -5 -38 0 -38 C5 -38 26 -15 22 5 Z"
                    fill={activeFlower.accentColor}
                  />
                  <path
                    d="M0 -38 C-8 -20 -10 15 0 20 C10 15 8 -20 0 -38 Z"
                    fill="#F9D2A5"
                  />
                </g>
              )}

              {activeFlower.id === "sunflower" && (
                <g transform="translate(100, 110)">
                  {/* Radiant petals */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                    (deg) => (
                      <ellipse
                        key={deg}
                        cx="0"
                        cy="-35"
                        rx="9"
                        ry="20"
                        fill={activeFlower.petalColor}
                        transform={`rotate(${deg})`}
                      />
                    )
                  )}
                  {/* Center seed bed */}
                  <circle r="22" fill="#583110" />
                  <circle r="18" fill="#6F3F15" />
                  <circle r="14" fill="#3D2109" />
                </g>
              )}

              {activeFlower.id === "cherry_blossom" && (
                <g transform="translate(100, 110)">
                  {[0, 72, 144, 216, 288].map((deg) => (
                    <path
                      key={deg}
                      d="M0 0 C-15 -18 -18 -38 0 -42 C18 -38 15 -18 0 0 Z"
                      fill={activeFlower.petalColor}
                      opacity="0.9"
                      transform={`rotate(${deg})`}
                    />
                  ))}
                  <circle r="10" fill="#FFF0F3" />
                  <circle r="4" fill="#FFB3C1" />
                </g>
              )}
            </svg>
          </div>

          {/* Active flower description */}
          <div className="mt-4 flex flex-col items-center">
            <span className="text-lg font-serif text-[#FAF5EB]">
              {activeFlower.name}
            </span>
            <span className="text-xs text-[#D4AF37]/90 tracking-wide mt-0.5 font-light">
              {activeFlower.meaning}
            </span>
            <p className="text-xs text-[#A8B0C7] max-w-xs mt-2 italic font-light">
              "{activeFlower.note}"
            </p>
          </div>

          {/* Action button to select for bouquet */}
          <div className="mt-5">
            <button
              onClick={handlePickForBouquet}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                isCurrentPicked
                  ? "bg-[#28382B] text-[#D8F3DC] border border-[#52B788]/40 shadow-sm"
                  : "bg-[#181D33] hover:bg-[#222947] text-[#FAF5EC] border border-[#E5D7BE]/20 hover:border-[#D4AF37]/40 shadow"
              }`}
            >
              {isCurrentPicked ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Kept in your bouquet</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>I'll keep this one for you</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Flower Selector Row */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-md mt-6 pt-4 border-t border-[#F4EBD9]/10">
          {FLOWERS.map((flower) => {
            const isSelected = activeFlower.id === flower.id;
            const isPicked = selectedFlower === flower.id;
            return (
              <button
                key={flower.id}
                onClick={() => handleFlowerClick(flower)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 cursor-pointer relative ${
                  isSelected
                    ? "bg-[#1A2038] border border-[#D4AF37]/40 shadow-md"
                    : "bg-[#121629]/70 hover:bg-[#161C33] border border-[#F4EBD9]/5"
                }`}
              >
                {isPicked && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#52B788]" />
                )}
                <div
                  className="w-7 h-7 rounded-full mb-1.5 border border-white/20 transition-transform duration-300"
                  style={{
                    backgroundColor: flower.petalColor,
                    transform: isSelected ? "scale(1.15)" : "scale(1)",
                  }}
                />
                <span className="text-[11px] font-serif text-[#ECE6D8] truncate w-full">
                  {flower.name}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer subtle text */}
      <footer className="relative z-10 w-full text-center text-[11px] text-[#6F7794] font-light">
        The chosen bloom will remain in your miniature world.
      </footer>
    </div>
  );
};
