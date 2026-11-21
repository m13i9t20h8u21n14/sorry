"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { CuteBearIllustration } from "./CuteBearIllustration";
import { sound } from "@/utils/audio";
import { RotateCcw, Sparkles, ExternalLink, PartyPopper } from "lucide-react";

// Beautiful SVG Instagram Icon component
const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface CelebrationPageProps {
  onBackToApology: () => void;
  instagramUrl?: string;
}

export const CelebrationPage: React.FC<CelebrationPageProps> = ({
  onBackToApology,
  instagramUrl = "https://www.instagram.com/achilles.mtp/?hl=en",
}) => {
  const [isConnecting, setIsConnecting] = useState(false);

  // Trigger rich confetti & firework explosions with warm yellow, pastel pink, and celebration colors
  // canvas-confetti is dynamically imported only when this function runs
  const triggerConfetti = useCallback(async () => {
    sound.playCelebrationChime();
    const confettiModule = await import("canvas-confetti");
    const confetti = confettiModule.default;

    // 1. Dual edge cannons (bottom left and bottom right)
    const end = Date.now() + 2.5 * 1000;
    const colors = ["#FFD166", "#FFC02A", "#FBBF24", "#FF8FA3", "#D8B4E2", "#06D6A0", "#FFAEBC"];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.8 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.8 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 2. Center fireworks burst
    confetti({
      particleCount: 75,
      spread: 110,
      origin: { y: 0.5, x: 0.5 },
      colors: ["#FFD166", "#FF9F1C", "#FF5D8F", "#B5838D", "#70A9A1", "#F4ACB7"],
      startVelocity: 35,
    });
  }, []);

  useEffect(() => {
    triggerConfetti();
  }, [triggerConfetti]);

  // Floating pastel celebration balloons (friendly yellow, lavender, pastel pink)
  const balloons = useMemo(() => {
    return [
      { id: 1, left: "10%", color: "#FFE169", delay: 0.2, speed: 14 },
      { id: 2, left: "22%", color: "#D8B4E2", delay: 1.5, speed: 17 },
      { id: 3, left: "75%", color: "#FFD6E0", delay: 0.8, speed: 15 },
      { id: 4, left: "88%", color: "#FFDE59", delay: 2.2, speed: 18 },
      { id: 5, left: "5%", color: "#C5D0E6", delay: 3.5, speed: 16 },
      { id: 6, left: "92%", color: "#FFE5D9", delay: 4.0, speed: 15 },
    ];
  }, []);

  const handleOpenInstagram = () => {
    if (isConnecting) return;
    setIsConnecting(true);
    sound.playPop();

    // Smooth button animation before opening Instagram in a new tab
    setTimeout(() => {
      window.open(instagramUrl, "_blank", "noopener,noreferrer");
      setIsConnecting(false);
    }, 380);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 sm:px-6 select-none overflow-hidden">
      {/* Floating balloons drifting upwards */}
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="fixed pointer-events-none z-10"
          style={{ left: b.left, bottom: "-120px" }}
          animate={{
            y: ["0vh", "-130vh"],
            x: [0, (b.id % 2 === 0 ? 1 : -1) * 35, 0],
            rotate: [0, (b.id % 2 === 0 ? 8 : -8), 0],
          }}
          transition={{
            duration: b.speed,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
        >
          {/* Balloon shape */}
          <div className="flex flex-col items-center">
            <div
              className="w-12 h-16 sm:w-16 sm:h-20 rounded-full shadow-lg relative"
              style={{
                backgroundColor: b.color,
                boxShadow: `0 8px 25px ${b.color}88, inset -4px -6px 12px rgba(0,0,0,0.1), inset 6px 8px 12px rgba(255,255,255,0.7)`,
              }}
            >
              {/* Highlight gleam */}
              <div className="absolute top-3 left-3 w-3 h-5 bg-white/70 rounded-full rotate-[-25deg]" />
            </div>
            {/* Knot */}
            <div
              className="w-2.5 h-1.5 -mt-0.5 rounded-sm"
              style={{ backgroundColor: b.color }}
            />
            {/* Wavy string */}
            <svg width="20" height="60" viewBox="0 0 20 60" fill="none" className="opacity-60">
              <path
                d="M10 0 C 4 15, 16 30, 10 45 C 6 52, 12 56, 10 60"
                stroke="#baa0a8"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>
      ))}

      {/* Main Glass Celebration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
        className="glass-card relative z-20 w-full max-w-xl p-6 sm:p-10 rounded-[2.5rem] text-center border-2 border-white/80 shadow-glass-lg my-auto"
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />

        {/* Celebrating Bear Mascot */}
        <div className="relative mb-3 flex justify-center">
          <CuteBearIllustration mode="celebrating" size={160} />
          {/* Floating celebratory badges */}
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="absolute top-2 right-12 sm:right-20 text-2xl"
          >
            🎉
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute top-4 left-12 sm:left-20 text-2xl"
          >
            ✨
          </motion.div>
        </div>

        {/* Top Celebration Pill */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-800 text-xs sm:text-sm font-medium border border-amber-200/80 mb-4 shadow-sm">
          <PartyPopper className="w-4 h-4 text-amber-500 animate-wiggle" />
          <span>Forgiveness Unlocked! Best feeling ever</span>
          <span className="text-sm ml-0.5">💛</span>
        </div>

        {/* Big Animated Celebration Heading */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 mb-3 tracking-tight filter drop-shadow-sm"
        >
          YAYYYYY, LISHA!! 🥹💛
        </motion.h1>

        {/* Secondary Message */}
        <p className="font-serif text-xl sm:text-2xl font-semibold text-rose-950/90 mb-6 italic">
          &ldquo;You just made my day a little better!&rdquo;
        </p>

        {/* Request Divider Box */}
        <div className="relative my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white/80 to-pink-50/80 border border-amber-200/70 shadow-sm text-left sm:text-center space-y-2">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-600 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Now, one tiny request... 👉👈
            <Sparkles className="w-3.5 h-3.5" />
          </p>

          <p className="font-medium text-lg sm:text-xl text-rose-950 flex items-center justify-center gap-2">
            Can you accept my Instagram follow request again?
          </p>

          <p className="text-xs sm:text-sm text-rose-700/75">
            Promise to bring good vibes, funny reels, and zero unfollow drama forever. 🌸
          </p>
        </div>

        {/* Action Button: Let's connect again */}
        <div className="flex flex-col gap-3.5 mb-6">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={isConnecting ? { scale: [1, 1.08, 0.98, 1] } : {}}
            onClick={handleOpenInstagram}
            className="group relative w-full py-4 px-6 rounded-2xl text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg shadow-pink-500/30 transition-all duration-300 overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
          >
            {/* Shimmer light sweep */}
            <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <InstagramIcon className={`w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-12 transition-transform ${isConnecting ? "animate-spin" : ""}`} />
            <span className="tracking-wide">Let&apos;s connect again 💛</span>
            <ExternalLink className="w-4 h-4 text-white/80 ml-1" />
          </motion.button>
        </div>

        {/* Footer controls: Replay and Back to Apology */}
        <div className="pt-4 border-t border-pink-200/60 flex flex-wrap items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={triggerConfetti}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-rose-700 text-xs sm:text-sm font-medium border border-pink-200/80 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            Replay Celebration 🎆
          </motion.button>

          <button
            onClick={() => {
              sound.playPop();
              onBackToApology();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-rose-600/80 hover:text-rose-800 text-xs sm:text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Read letter again 💌
          </button>
        </div>
      </motion.div>
    </div>
  );
};
