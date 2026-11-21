"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/utils/audio";
import { Sparkles } from "lucide-react";

interface IntroEnvelopeProps {
  onOpen: () => void;
}

export const IntroEnvelope: React.FC<IntroEnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    sound.playPop();
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#fff3f6] via-[#fdf0f7] to-[#f4ebfa] select-none">
      {/* Soft ambient background orbs */}
      <div className="absolute w-80 h-80 rounded-full bg-pink-200/50 blur-[90px] animate-pulse-glow" />
      <div className="absolute w-72 h-72 rounded-full bg-purple-200/40 blur-[80px] -translate-x-32 translate-y-24" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center"
      >
        {/* Envelope Container */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpen}
          className="cursor-pointer relative w-64 h-48 sm:w-80 sm:h-56 rounded-2xl bg-gradient-to-br from-[#FFF5F7] to-[#FFE8ED] border-2 border-white/90 shadow-2xl flex items-center justify-center overflow-hidden group"
          style={{
            boxShadow: "0 25px 60px -15px rgba(244, 114, 182, 0.35), 0 10px 20px -5px rgba(216, 180, 226, 0.25)",
          }}
        >
          {/* Top Envelope Flap */}
          <motion.div
            animate={
              isOpening
                ? {
                    rotateX: -180,
                    transition: { duration: 0.5, ease: "easeInOut" },
                  }
                : {}
            }
            style={{ transformOrigin: "top" }}
            className="absolute top-0 left-0 right-0 h-28 sm:h-32 bg-gradient-to-b from-[#FFE3EB] to-[#FFD4E2] border-b border-pink-300/40 clip-path-triangle z-20 flex items-center justify-center"
          >
            {/* Wax Heart Seal - Friendly Yellow */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 shadow-md flex items-center justify-center text-white border-2 border-yellow-200/80 -mt-4 shadow-amber-300/40"
            >
              <span className="text-xl select-none">💛</span>
            </motion.div>
          </motion.div>

          {/* Letter Peeking Out */}
          <motion.div
            animate={
              isOpening
                ? {
                    y: -70,
                    opacity: 1,
                    transition: { duration: 0.5, delay: 0.2 },
                  }
                : { y: 0 }
            }
            className="absolute bottom-4 w-[85%] h-36 bg-white/95 rounded-xl border border-yellow-100 shadow-sm p-4 flex flex-col items-center justify-center text-center space-y-1.5 z-10"
          >
            <span className="text-xl">💌</span>
            <span className="font-serif text-sm font-semibold text-rose-900">
              For Lisha 💛
            </span>
            <span className="text-[11px] text-amber-600 font-medium italic">
              Tap to open the letter
            </span>
          </motion.div>

          {/* Envelope Bottom Body Fold Lines */}
          <div className="absolute inset-0 border-t-[80px] border-t-transparent border-l-[128px] sm:border-l-[160px] border-l-[#FFF0F4]/90 border-r-[128px] sm:border-r-[160px] border-r-[#FFF0F4]/90 border-b-[96px] sm:border-b-[112px] border-b-[#FFE4EC] pointer-events-none z-15" />

          {/* Sparkles on hover */}
          <div className="absolute top-3 right-4 text-pink-400 opacity-60 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "6s" }} />
          </div>
        </motion.div>

        {/* Prompt Below Envelope */}
        <div className="mt-8 text-center space-y-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 hover:bg-white text-rose-800 text-sm font-medium border border-pink-200 shadow-sm backdrop-blur-sm transition-all cursor-pointer"
          >
            <span className="text-base">💛</span>
            <span>Open your letter 💌</span>
          </motion.button>
          <p className="text-xs text-rose-400 font-serif italic">
            &ldquo;From the bottom of my heart, I am truly sorry, Lisha.&rdquo;
          </p>
        </div>
      </motion.div>
    </div>
  );
};
