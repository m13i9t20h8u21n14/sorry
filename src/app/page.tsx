"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundDecorations } from "@/components/BackgroundDecorations";
import { CustomCursor } from "@/components/CustomCursor";
import { ApologyCard } from "@/components/ApologyCard";
import { IntroEnvelope } from "@/components/IntroEnvelope";
import { YouTubeBackgroundMusic, YouTubePlayerRef } from "@/components/YouTubeBackgroundMusic";

// Lazy-load CelebrationPage only when celebration stage is reached
const CelebrationPage = dynamic(
  () => import("@/components/CelebrationPage").then((mod) => mod.CelebrationPage),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[50vh] text-center p-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium animate-pulse">
          <span>💛</span>
          <span>Unlocking celebration...</span>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  // Always start on the welcome screen with the sealed envelope on fresh load or refresh
  const [currentPage, setCurrentPage] = useState<"welcome" | "apology" | "celebration">("welcome");
  const musicRef = useRef<YouTubePlayerRef>(null);

  const handleOpenEnvelope = () => {
    // Start background music only after Lisha explicitly clicks to open her letter
    musicRef.current?.play();
    setCurrentPage("apology");
  };

  const handleForgive = () => {
    musicRef.current?.play();
    setCurrentPage("celebration");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
      {/* Custom animated cursor with heart trail on desktop */}
      <CustomCursor />

      {/* Lightweight GPU-accelerated CSS floating hearts & sparkles background */}
      <BackgroundDecorations />

      {/* Lazy-loaded YouTube Background Music Controller (Bottom-Right Floating Disc) */}
      <YouTubeBackgroundMusic ref={musicRef} />

      {/* Top Floating Navigation Bar */}
      <header className="relative z-30 w-full px-4 sm:px-8 pt-5 pb-2 flex items-center justify-between max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm text-xs sm:text-sm font-serif font-medium text-rose-900"
        >
          <span className="text-base">💛</span>
          <span className="font-semibold tracking-wide">A Little Sorry, Lisha</span>
          <span className="text-[10px] text-amber-500 uppercase tracking-widest hidden sm:inline ml-1">
            • with sincerity
          </span>
        </motion.div>

        <div className="text-xs text-rose-500/70 font-medium hidden sm:flex items-center gap-1.5 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full border border-pink-100">
          <span>🎵 Background song ready in bottom-right</span>
        </div>
      </header>

      {/* Main Interactive Stage with AnimatePresence */}
      <main className="relative z-20 flex-1 flex items-center justify-center py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {currentPage === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full flex items-center justify-center"
            >
              <IntroEnvelope onOpen={handleOpenEnvelope} />
            </motion.div>
          )}

          {currentPage === "apology" && (
            <motion.div
              key="apology"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full flex items-center justify-center"
            >
              <ApologyCard onForgive={handleForgive} />
            </motion.div>
          )}

          {currentPage === "celebration" && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full"
            >
              <CelebrationPage
                onBackToApology={() => setCurrentPage("apology")}
                instagramUrl="https://www.instagram.com/achilles.mtp/?hl=en"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Note */}
      <footer className="relative z-20 w-full py-4 text-center text-xs text-rose-800/80 font-medium select-none px-4">
        <p>Made with a little effort, a lot of debugging, and a genuine apology. 💛</p>
      </footer>
    </div>
  );
}
