/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { getConfig, AppConfig } from "./config";
import { AmbientCanvas } from "./components/AmbientCanvas";
import { MusicPlayer } from "./components/MusicPlayer";
import { OpeningScene } from "./components/OpeningScene";
import { LittleWorldView } from "./components/LittleWorldView";
import { FlowerGardenScene } from "./components/FlowerGardenScene";
import { LittleCafeScene } from "./components/LittleCafeScene";
import { MemoryRoomScene } from "./components/MemoryRoomScene";
import { StarlightHillScene } from "./components/StarlightHillScene";
import { HiddenLetterScene } from "./components/HiddenLetterScene";
import { FinalScene } from "./components/FinalScene";

type SceneType =
  | "opening"
  | "world"
  | "garden"
  | "cafe"
  | "memory"
  | "hill"
  | "letter"
  | "final";

export default function App() {
  const [config, setConfig] = useState<AppConfig>(getConfig());
  const [scene, setScene] = useState<SceneType>("opening");
  const [transitioning, setTransitioning] = useState(false);

  // Exploration progress state
  const [discoveredAreas, setDiscoveredAreas] = useState({
    garden: false,
    cafe: false,
    memory: false,
    hill: false,
    letter: false,
  });

  const [selectedFlower, setSelectedFlower] = useState<string | null>("rose");
  const [discoveredChocolates, setDiscoveredChocolates] = useState<number[]>([]);
  const [visitedMemories, setVisitedMemories] = useState<number[]>([]);
  const [isConstellationComplete, setIsConstellationComplete] = useState(false);

  // Periodically refresh config in case user edits window.CONFIG
  useEffect(() => {
    const handleCheck = () => {
      setConfig(getConfig());
    };
    window.addEventListener("focus", handleCheck);
    return () => window.removeEventListener("focus", handleCheck);
  }, []);

  const changeScene = (nextScene: SceneType) => {
    setTransitioning(true);
    setTimeout(() => {
      setScene(nextScene);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 400);
  };

  // Handlers for individual exploration actions
  const handleSelectFlower = (flowerId: string) => {
    setSelectedFlower(flowerId);
    setDiscoveredAreas((prev) => ({ ...prev, garden: true }));
  };

  const handleOpenChocolate = (index: number) => {
    if (!discoveredChocolates.includes(index)) {
      setDiscoveredChocolates((prev) => [...prev, index]);
    }
    setDiscoveredAreas((prev) => ({ ...prev, cafe: true }));
  };

  const handleInspectMemory = (index: number) => {
    if (!visitedMemories.includes(index)) {
      setVisitedMemories((prev) => [...prev, index]);
    }
    setDiscoveredAreas((prev) => ({ ...prev, memory: true }));
  };

  const handleCompleteConstellation = () => {
    setIsConstellationComplete(true);
    setDiscoveredAreas((prev) => ({ ...prev, hill: true }));
  };

  const handleFinishLetter = () => {
    setDiscoveredAreas((prev) => ({ ...prev, letter: true }));
    changeScene("final");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#060813] text-[#F3EFE6] overflow-x-hidden selection:bg-[#B33951]/40 selection:text-[#FFFDF8]">
      {/* Dynamic Ambient Background Canvas */}
      <AmbientCanvas
        intensity={scene === "opening" ? "subtle" : scene === "final" ? "rich" : "gentle"}
        showPetals={scene === "garden" || scene === "final"}
      />

      {/* Floating Music Controller (Available across all scenes after start) */}
      {scene !== "opening" && (
        <MusicPlayer trackName="We Fell in Love in October" />
      )}

      {/* Cinematic Scene Viewport Container */}
      <div
        className={`relative z-10 w-full min-h-screen transition-all duration-500 ease-out ${
          transitioning
            ? "opacity-0 scale-98 blur-xs pointer-events-none"
            : "opacity-100 scale-100 blur-none"
        }`}
      >
        {scene === "opening" && (
          <OpeningScene
            config={config}
            onEnter={() => changeScene("world")}
          />
        )}

        {scene === "world" && (
          <LittleWorldView
            config={config}
            discoveredAreas={discoveredAreas}
            selectedFlower={selectedFlower}
            discoveredChocolates={discoveredChocolates}
            visitedMemories={visitedMemories}
            isConstellationComplete={isConstellationComplete}
            onNavigate={(target) => {
              if (target === "garden") {
                setDiscoveredAreas((prev) => ({ ...prev, garden: true }));
              }
              changeScene(target);
            }}
          />
        )}

        {scene === "garden" && (
          <FlowerGardenScene
            config={config}
            selectedFlower={selectedFlower}
            onSelectFlower={handleSelectFlower}
            onBack={() => changeScene("world")}
          />
        )}

        {scene === "cafe" && (
          <LittleCafeScene
            discoveredChocolates={discoveredChocolates}
            onOpenChocolate={handleOpenChocolate}
            onBack={() => changeScene("world")}
          />
        )}

        {scene === "memory" && (
          <MemoryRoomScene
            config={config}
            visitedMemories={visitedMemories}
            onInspectMemory={handleInspectMemory}
            onBack={() => changeScene("world")}
          />
        )}

        {scene === "hill" && (
          <StarlightHillScene
            isConstellationComplete={isConstellationComplete}
            onCompleteConstellation={handleCompleteConstellation}
            onBack={() => changeScene("world")}
          />
        )}

        {scene === "letter" && (
          <HiddenLetterScene
            config={config}
            onFinishLetter={handleFinishLetter}
            onBack={() => changeScene("world")}
          />
        )}

        {scene === "final" && (
          <FinalScene
            config={config}
            selectedFlower={selectedFlower}
            discoveredChocolatesCount={discoveredChocolates.length}
            visitedMemoriesCount={visitedMemories.length}
            isConstellationComplete={isConstellationComplete}
          />
        )}
      </div>
    </div>
  );
}
