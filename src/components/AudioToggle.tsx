"use client";

import React, { useState } from "react";
import { sound } from "@/utils/audio";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion } from "framer-motion";

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleToggle = () => {
    setHasInteracted(true);
    sound.toggleMusic((playing) => {
      setIsPlaying(playing);
    });
    sound.playPop();
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      onClick={handleToggle}
      className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm backdrop-blur-md ${
        isPlaying
          ? "bg-pink-100/80 border-pink-300 text-pink-700 shadow-pink-200/50"
          : "bg-white/70 border-white/80 text-rose-800/80 hover:bg-white/90 hover:border-pink-200 hover:text-pink-600"
      }`}
      aria-label={isPlaying ? "Mute romantic background music" : "Play romantic background music"}
      title={isPlaying ? "Pause background music" : "Play romantic background music (lullaby)"}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-2.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 h-3.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <span className="tracking-wide">Music Playing 🎵</span>
          <Volume2 className="w-4 h-4 text-pink-500 ml-0.5" />
        </>
      ) : (
        <>
          <Music className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
          <span className="tracking-wide">Music: Off</span>
          <VolumeX className="w-3.5 h-3.5 text-rose-300 ml-0.5" />
        </>
      )}

      {/* Subtle pulse ring when off to invite click gently */}
      {!isPlaying && !hasInteracted && (
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500" />
        </span>
      )}
    </motion.button>
  );
};
