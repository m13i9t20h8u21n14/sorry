"use client";

import React from "react";
import { motion } from "framer-motion";

interface CuteBearProps {
  mode?: "apology" | "celebrating" | "shy";
  className?: string;
  size?: number;
}

export const CuteBearIllustration: React.FC<CuteBearProps> = ({
  mode = "apology",
  className = "",
  size = 140,
}) => {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      animate={
        mode === "celebrating"
          ? {
              y: [0, -10, 0],
              rotate: [-4, 4, -4],
            }
          : {
              y: [0, -6, 0],
            }
      }
      transition={{
        duration: mode === "celebrating" ? 1.6 : 3.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ width: size, height: size }}
    >
      {/* Background glow around bear */}
      <div
        className={`absolute inset-0 rounded-full blur-xl -z-10 ${
          mode === "celebrating"
            ? "bg-gradient-to-tr from-pink-300/40 via-purple-300/40 to-yellow-200/40"
            : "bg-pink-200/40"
        }`}
      />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* CELEBRATING PARTY HAT */}
        {mode === "celebrating" && (
          <g className="animate-wiggle origin-bottom">
            {/* Party Hat Cone */}
            <path
              d="M100 22 L82 72 Q100 78 118 72 Z"
              fill="url(#partyHatGrad)"
              stroke="#E05B8C"
              strokeWidth="2"
            />
            {/* Decorative Hat Stripes */}
            <path d="M87 56 Q100 60 113 56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M92 40 Q100 43 108 40" stroke="#FFE066" strokeWidth="2.5" strokeLinecap="round" />
            {/* Hat Pom-pom */}
            <circle cx="100" cy="20" r="6" fill="#FFD166" stroke="#F4A261" strokeWidth="1.5" />
          </g>
        )}

        {/* BEAR EARS */}
        {/* Left Ear */}
        <g>
          <circle cx="62" cy="74" r="22" fill="#D4A373" stroke="#BA8553" strokeWidth="2.5" />
          <circle cx="63" cy="74" r="13" fill="#F4ACB7" opacity="0.85" />
        </g>
        {/* Right Ear */}
        <g>
          <circle cx="138" cy="74" r="22" fill="#D4A373" stroke="#BA8553" strokeWidth="2.5" />
          <circle cx="137" cy="74" r="13" fill="#F4ACB7" opacity="0.85" />
        </g>

        {/* BEAR BODY */}
        <path
          d="M66 142 C66 112 134 112 134 142 C134 172 120 184 100 184 C80 184 66 172 66 142 Z"
          fill="#D4A373"
          stroke="#BA8553"
          strokeWidth="2.5"
        />
        {/* Belly patch */}
        <ellipse cx="100" cy="154" rx="22" ry="19" fill="#FAEDCD" />

        {/* BEAR FEET */}
        <ellipse cx="72" cy="178" rx="14" ry="10" fill="#BA8553" />
        <ellipse cx="72" cy="177" rx="8" ry="6" fill="#F4ACB7" opacity="0.9" />
        <ellipse cx="128" cy="178" rx="14" ry="10" fill="#BA8553" />
        <ellipse cx="128" cy="177" rx="8" ry="6" fill="#F4ACB7" opacity="0.9" />

        {/* BEAR HEAD */}
        <ellipse
          cx="100"
          cy="98"
          rx="44"
          ry="38"
          fill="#E7BA8D"
          stroke="#BA8553"
          strokeWidth="2.5"
        />

        {/* SNOUT */}
        <ellipse cx="100" cy="107" rx="19" ry="14" fill="#FAEDCD" />

        {/* NOSE */}
        <path
          d="M95 101 C95 98 105 98 105 101 C105 104 101 106 100 106 C99 106 95 104 95 101 Z"
          fill="#5E3023"
        />

        {/* MOUTH */}
        {mode === "celebrating" ? (
          // Happy smiling open mouth
          <path
            d="M93 107 Q100 119 107 107"
            fill="#E05B8C"
            stroke="#5E3023"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ) : (
          // Cute little shy smile
          <path
            d="M96 107 Q100 111 104 107"
            fill="none"
            stroke="#5E3023"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}

        {/* ROSY BLUSH CHEEKS */}
        <ellipse cx="72" cy="109" rx="8" ry="5" fill="#FF8FA3" opacity="0.65" />
        <ellipse cx="128" cy="109" rx="8" ry="5" fill="#FF8FA3" opacity="0.65" />

        {/* BLUSH ACCENTS */}
        <path d="M68 108 L76 108" stroke="#FF5D8F" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <path d="M124 108 L132 108" stroke="#FF5D8F" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

        {/* EYES */}
        {mode === "celebrating" ? (
          // Happy curved squinting celebration eyes (^_^)
          <g stroke="#5E3023" strokeWidth="2.8" strokeLinecap="round" fill="none">
            <path d="M80 94 Q86 87 92 94" />
            <path d="M108 94 Q114 87 120 94" />
          </g>
        ) : (
          // Cute pleading anime/chibi eyes (🥺)
          <g>
            {/* Left Eye */}
            <circle cx="85" cy="94" r="6" fill="#3D2B1F" />
            <circle cx="83.5" cy="92.5" r="2.2" fill="#FFFFFF" />
            <circle cx="86.5" cy="95.5" r="1.1" fill="#FFFFFF" />
            {/* Right Eye */}
            <circle cx="115" cy="94" r="6" fill="#3D2B1F" />
            <circle cx="113.5" cy="92.5" r="2.2" fill="#FFFFFF" />
            <circle cx="116.5" cy="95.5" r="1.1" fill="#FFFFFF" />
          </g>
        )}

        {/* ARMS & WHAT THE BEAR IS HOLDING */}
        {mode === "celebrating" ? (
          // Celebrating: Arms raised high with sparkles & mini hearts
          <g>
            {/* Left Arm Raised */}
            <path
              d="M68 135 C50 118 42 100 52 94 C60 90 68 112 76 128 Z"
              fill="#D4A373"
              stroke="#BA8553"
              strokeWidth="2.5"
            />
            {/* Right Arm Raised */}
            <path
              d="M132 135 C150 118 158 100 148 94 C140 90 132 112 124 128 Z"
              fill="#D4A373"
              stroke="#BA8553"
              strokeWidth="2.5"
            />
            {/* Floating Celebration Stars from Paws */}
            <text x="35" y="90" fontSize="16" className="select-none">✨</text>
            <text x="145" y="90" fontSize="16" className="select-none">🎉</text>
            <text x="94" y="26" fontSize="14" className="select-none">💛</text>
          </g>
        ) : (
          // Apology: Holding a warm glowing yellow heart in front with paws
          <g>
            {/* Glowing Big Yellow Heart */}
            <g className="animate-heart-beat origin-center">
              <path
                d="M100 148 C100 148 80 128 72 138 C64 148 76 160 100 174 C124 160 136 148 128 138 C120 128 100 148 100 148 Z"
                fill="url(#heartGrad)"
                stroke="#E5A00D"
                strokeWidth="1.5"
                filter="url(#heartGlow)"
              />
              {/* Little shine on heart */}
              <ellipse cx="82" cy="140" rx="3.5" ry="2" transform="rotate(-30 82 140)" fill="#FFFFFF" opacity="0.75" />
            </g>

            {/* Little envelope peek behind heart */}
            <g transform="translate(86, 122)">
              <rect x="0" y="0" width="28" height="18" rx="2" fill="#FFFDF5" stroke="#E5C373" strokeWidth="1.5" />
              <path d="M0 0 L14 10 L28 0" stroke="#E5C373" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="10" r="2.5" fill="#F59E0B" />
            </g>

            {/* Paws holding the heart */}
            {/* Left Paw */}
            <ellipse cx="76" cy="144" rx="8" ry="6" fill="#D4A373" stroke="#BA8553" strokeWidth="2" />
            {/* Right Paw */}
            <ellipse cx="124" cy="144" rx="8" ry="6" fill="#D4A373" stroke="#BA8553" strokeWidth="2" />
          </g>
        )}

        {/* DEFINITIONS & GRADIENTS */}
        <defs>
          <linearGradient id="heartGrad" x1="70" y1="130" x2="130" y2="175" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE169" />
            <stop offset="0.55" stopColor="#FFC02A" />
            <stop offset="1" stopColor="#E59500" />
          </linearGradient>

          <linearGradient id="partyHatGrad" x1="82" y1="20" x2="118" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF758C" />
            <stop offset="0.5" stopColor="#FF7EB3" />
            <stop offset="1" stopColor="#8A4FFF" />
          </linearGradient>

          <filter id="heartGlow" x="50" y="115" width="100" height="80" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
};
