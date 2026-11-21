"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface TrailHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailHeart[]>([]);

  // Springs for smooth fluid following
  const cursorX = useSpring(0, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 350 });

  useEffect(() => {
    // Only enable on desktop/mouse devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    document.body.classList.add("custom-cursor-active");

    let lastTrailTime = 0;
    const colors = ["#FBBF24", "#F59E0B", "#FCD34D", "#FDE68A", "#FED7AA", "#F472B6"];

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.getAttribute("role") === "button" ||
          window.getComputedStyle(target).cursor === "pointer"
        );
        setIsPointer(isInteractive);
      }

      // Spawn heart trail periodically (throttled to 65ms for high performance)
      const now = Date.now();
      if (now - lastTrailTime > 65) {
        lastTrailTime = now;
        const newParticle: TrailHeart = {
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setTrail((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Cleanup old trail particles
  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 550);
    return () => clearTimeout(timer);
  }, [trail]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Mini heart trail particles */}
      {trail.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.85, scale: 0.9, y: 0 }}
          animate={{ opacity: 0, scale: 0.3, y: -22, x: (Math.random() - 0.5) * 15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            color: p.color,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* Main cursor aura */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isPointer ? 1.4 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="relative flex items-center justify-center w-8 h-8 rounded-full"
      >
        {/* Soft outer glow */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-200 ${
            isPointer
              ? "bg-pink-400/30 scale-125 blur-sm"
              : "bg-pink-300/20 scale-100 blur-none border border-pink-400/40"
          }`}
        />

        {/* Center tiny heart */}
        <span className="text-xs transform -translate-y-[1px] select-none filter drop-shadow">
          {isPointer ? "✨" : "💛"}
        </span>
      </motion.div>
    </div>
  );
};
