import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { audioManager } from "../utils/audio";

interface MusicPlayerProps {
  trackName?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  trackName = "We Fell in Love in October",
}) => {
  const [isPlaying, setIsPlaying] = useState(audioManager.isPlaying);
  const [isMuted, setIsMuted] = useState(audioManager.isMuted);
  const [volume, setVolume] = useState(audioManager.volume);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const unsub = audioManager.subscribe(() => {
      setIsPlaying(audioManager.isPlaying);
      setIsMuted(audioManager.isMuted);
      setVolume(audioManager.volume);
    });
    return unsub;
  }, []);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioManager.setVolume(val);
  };

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 group select-none"
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      {/* Subtle track title & volume slider when hovered or tapped */}
      <div
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#101426]/80 backdrop-blur-md border border-[#F4EBD9]/10 text-xs text-[#E3D8C4] transition-all duration-300 shadow-xl ${
          showVolumeSlider ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none hidden sm:flex"
        }`}
      >
        <span className="text-[11px] tracking-wide font-light text-[#D4C3A3] whitespace-nowrap">
          {trackName}
        </span>
        <div className="w-px h-3 bg-[#F4EBD9]/20" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 accent-[#D4A373] bg-[#222944] rounded-lg cursor-pointer appearance-none"
          title="Adjust volume"
          aria-label="Volume slider"
        />
      </div>

      {/* Floating ♫ Button */}
      <button
        onClick={handleToggleMute}
        className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg ${
          isPlaying && !isMuted
            ? "bg-[#181D33]/90 text-[#F6EAD4] border border-[#E9C46A]/30 shadow-[#E9C46A]/10"
            : "bg-[#101426]/75 text-[#8E95AA] border border-[#F4EBD9]/10"
        } hover:scale-105 active:scale-95`}
        title={isMuted ? "Unmute music" : "Mute music"}
        aria-label="Toggle mute"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 opacity-75" />
        ) : isPlaying ? (
          <div className="relative flex items-center justify-center">
            <span className="text-base font-serif italic text-[#F3DFBF] animate-pulse">♫</span>
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#E9C46A] animate-ping" />
          </div>
        ) : (
          <Music className="w-4 h-4 opacity-60" />
        )}
      </button>
    </div>
  );
};
