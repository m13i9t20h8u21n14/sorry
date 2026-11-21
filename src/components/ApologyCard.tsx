"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CuteBearIllustration } from "./CuteBearIllustration";
import { GentleDeclineModal } from "./GentleDeclineModal";
import { sound } from "@/utils/audio";
import { Sparkles, ShieldCheck } from "lucide-react";

interface ApologyCardProps {
  onForgive: () => void;
}

export const ApologyCard: React.FC<ApologyCardProps> = ({ onForgive }) => {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [dodgePosition, setDodgePosition] = useState({ x: 0, y: 0 });
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const playgroundRef = useRef<HTMLDivElement>(null);

  // Playful dodge phrases that cycle through
  const dodgePhrases = [
    "Not yet 🙃",
    "Wait, really, Lisha? 🥺",
    "Are you sure sure? 🥺👉👈",
    "Pretty please with strawberries? 🍓",
    "I'll buy you favorite boba! 🧋",
    "Look how sorry the teddy is! 🧸",
    "Give me one tiny second chance, Lisha? 🌸",
    "Still running! 🏃💨",
  ];

  // Logic to dodge cursor playfully within safe bounds
  const handleDodge = () => {
    sound.playDodge();
    setDodgeCount((prev) => prev + 1);

    // Keep dodge within safe bounds so the button is never off-screen or unreachable
    const maxOffsetX = 120;
    const maxOffsetY = 60;

    // Generate random target with opposite sign if it was near an edge
    const randX = (Math.random() * 2 - 1) * maxOffsetX;
    const randY = (Math.random() * 2 - 1) * maxOffsetY;

    setDodgePosition({
      x: Math.round(randX),
      y: Math.round(randY),
    });
  };

  const handleForgiveClick = () => {
    sound.playPop();
    setHeartBurst(true);
    setTimeout(() => {
      onForgive();
    }, 450);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-6 px-3 sm:px-0">
      {/* Gentle Decline Modal */}
      <GentleDeclineModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
      />

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card relative rounded-[2.5rem] p-6 sm:p-10 md:p-12 text-rose-950 shadow-glass-lg overflow-hidden border-2 border-white/80"
      >
        {/* Soft background light accents */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-medium shadow-sm">
            <span className="animate-pulse">💌</span>
            <span>A personal letter for Lisha</span>
          </div>
          <div className="text-xs text-rose-400 font-mono tracking-wider opacity-70">
            from the bottom of my heart
          </div>
        </div>

        {/* Animated Cute Bear Illustration */}
        <div className="flex justify-center mb-5">
          <CuteBearIllustration
            mode={dodgeCount > 0 ? "shy" : "apology"}
            size={130}
          />
        </div>

        {/* Headings */}
        <div className="text-center space-y-2 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-800 via-pink-700 to-purple-800"
          >
            Hey Lisha! 🥺
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-lg sm:text-xl text-rose-900/80 italic font-medium"
          >
            I think I owe you a little apology.
          </motion.p>
        </div>

        {/* Apology Letter Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-2xl bg-white/70 backdrop-blur-md p-6 sm:p-8 border border-white/90 shadow-sm space-y-4 text-sm sm:text-base md:text-[1.05rem] leading-relaxed text-rose-950/90 font-normal select-text"
        >
          {/* Subtle decorative quotation watermark */}
          <span className="absolute top-2 left-4 text-5xl font-serif text-pink-200/60 select-none pointer-events-none">
            “
          </span>

          <p className="font-medium text-pink-900 leading-relaxed">
            First of all, Lisha, I&apos;m genuinely sorry for unfollowing you on Instagram.
          </p>

          <p>
            I was having a really bad day, and honestly, a lot of things have been going wrong lately.
          </p>

          <p>
            My work has been piling up, projects are still incomplete, deadlines are waiting, and even my YouTube channel isn&apos;t getting the views I hoped for.
          </p>

          <p>
            And somewhere in all that frustration, I let my mood affect how I treated you.
          </p>

          <p>
            I also felt a little sad because our conversations haven&apos;t been the same lately. Sometimes I felt like I was bothering you with my messages, Lisha.
          </p>

          <p>
            But I should have communicated that instead of randomly unfollowing you.
          </p>

          <p className="font-semibold text-amber-700">
            You didn&apos;t deserve that, Lisha. I&apos;m sorry. 💛
          </p>

          <p className="italic text-rose-900/80 pt-2 border-t border-pink-100">
            I don&apos;t expect anything. I just wanted to say sorry properly.
          </p>

          <span className="absolute bottom-1 right-5 text-5xl font-serif text-pink-200/60 select-none pointer-events-none leading-none">
            ”
          </span>
        </motion.div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-8 text-amber-400">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300" />
          <span className="text-sm">💛</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm">💛</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300" />
        </div>

        {/* Interactive Question Section */}
        <div className="text-center space-y-6">
          <motion.h2
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="font-serif text-2xl sm:text-3xl font-bold text-rose-900"
          >
            Can we start again, Lisha? 🥹
          </motion.h2>

          {/* Interactive Button Arena */}
          <div
            ref={playgroundRef}
            className="relative min-h-[90px] flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2"
          >
            {/* BUTTON 1: Okay, I forgive you 💛 */}
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleForgiveClick}
              className="relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-white font-semibold text-base sm:text-lg glass-button flex items-center gap-2.5 shadow-lg shadow-pink-500/25 transition-all duration-200 z-10 overflow-hidden"
            >
              {/* Shimmer line */}
              <span className="absolute inset-0 bg-white/20 transform -translate-x-full hover:translate-x-full transition-transform duration-700" />

              <span
                className={`text-lg sm:text-xl ${
                  heartBurst ? "animate-ping" : "animate-bounce"
                }`}
              >
                💛
              </span>
              <span className="tracking-wide">Okay, I forgive you 💛</span>

              {/* Yellow heart burst particles on click */}
              {heartBurst && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                      animate={{
                        scale: 1.5,
                        opacity: 0,
                        x: (Math.random() - 0.5) * 160,
                        y: (Math.random() - 0.5) * 160,
                      }}
                      transition={{ duration: 0.45 }}
                      className="absolute text-xl"
                    >
                      💛
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.button>

            {/* BUTTON 2: Not yet 🙃 (Playful Dodge Button) */}
            <motion.div
              animate={{
                x: dodgePosition.x,
                y: dodgePosition.y,
              }}
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 22,
              }}
              className="relative z-10"
            >
              <button
                type="button"
                onMouseEnter={handleDodge}
                onClick={handleDodge}
                onTouchStart={handleDodge}
                className="px-6 py-3.5 rounded-2xl bg-white/80 hover:bg-white text-rose-700 font-medium text-sm sm:text-base border border-pink-200/90 shadow-sm transition-colors duration-150 flex items-center gap-2 hover:border-pink-300 active:scale-95 whitespace-nowrap"
                title="Try to catch me!"
              >
                <span>{dodgePhrases[Math.min(dodgeCount, dodgePhrases.length - 1)]}</span>
              </button>
            </motion.div>
          </div>

          {/* Cute feedback message when dodged */}
          {dodgeCount > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-rose-500 font-medium italic"
            >
              {dodgeCount < 3
                ? "Hehe, you can't click that easily! 🧸"
                : dodgeCount < 6
                ? "The bear is getting worried now! 🥺"
                : "Okay okay, running mode fully activated! 🏃💨"}
            </motion.p>
          )}

          {/* Genuine Non-Trap Decline / Space Option */}
          <div className="pt-4 border-t border-pink-100/80 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setIsDeclineModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-rose-600/70 hover:text-rose-800 transition-colors underline underline-offset-4 hover:decoration-pink-400"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Need some time, Lisha? That&apos;s completely okay 💛</span>
            </button>
            <p className="text-[11px] text-rose-400/80">
              No pressure ever. Your feelings and your boundaries are always respected.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
