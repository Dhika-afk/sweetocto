import React, { useEffect, useRef } from "react";

interface AmbientCanvasProps {
  intensity?: "gentle" | "rich" | "subtle";
  showPetals?: boolean;
}

export const AmbientCanvas: React.FC<AmbientCanvasProps> = ({
  intensity = "gentle",
  showPetals = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Stars
    const starCount = intensity === "rich" ? 140 : intensity === "subtle" ? 60 : 95;
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    const starPalettes = [
      "rgba(255, 255, 255,",
      "rgba(254, 243, 199,",
      "rgba(224, 231, 255,",
      "rgba(253, 230, 138,",
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: starPalettes[Math.floor(Math.random() * starPalettes.length)],
      });
    }

    // Fireflies / floating dust
    const fireflyCount = intensity === "rich" ? 28 : 16;
    const fireflies: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulse: number;
    }> = [];

    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Floating petals
    const petalCount = showPetals ? 18 : 0;
    const petals: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      angle: number;
      vAngle: number;
      color: string;
    }> = [];

    const petalColors = [
      "rgba(244, 114, 182, 0.45)",
      "rgba(251, 113, 133, 0.4)",
      "rgba(249, 168, 212, 0.35)",
      "rgba(254, 205, 211, 0.5)",
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.6 + 0.2,
        vy: Math.random() * 0.7 + 0.4,
        size: Math.random() * 5 + 4,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.03,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render stars
      for (const s of stars) {
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 0.95 || s.alpha < 0.15) {
          s.twinkleSpeed = -s.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color} ${Math.max(0.05, Math.min(1, s.alpha))})`;
        ctx.fill();
      }

      // Render fireflies
      for (const f of fireflies) {
        f.x += f.vx;
        f.y += f.vy;
        f.pulse += 0.04;

        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        const currentAlpha = Math.max(0.1, (Math.sin(f.pulse) * 0.5 + 0.5) * f.alpha);
        const glowRadius = f.size * 2.8;

        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowRadius);
        grad.addColorStop(0, `rgba(252, 211, 77, ${currentAlpha})`);
        grad.addColorStop(1, "rgba(252, 211, 77, 0)");

        ctx.beginPath();
        ctx.arc(f.x, f.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 251, 235, ${currentAlpha * 1.2})`;
        ctx.fill();
      }

      // Render petals if active
      if (showPetals) {
        for (const p of petals) {
          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.vAngle;

          if (p.x > width + 20) p.x = -20;
          if (p.y > height + 20) p.y = -20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [intensity, showPetals]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
