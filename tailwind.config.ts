import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pastel: {
          pink: "#FFD6E0",
          rose: "#FFAEBC",
          lavender: "#E8D7F1",
          mauve: "#D8B4E2",
          cream: "#FFF9F4",
          blush: "#FFE8ED",
          wine: "#6B2D46",
          softPeach: "#FFE5D9",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "Poppins", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        script: ["var(--font-sacramento)", "Dancing Script", "cursive"],
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "float-gentle": "floatGentle 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "heart-beat": "heartBeat 1.4s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        heartBeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.2)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.15)" },
          "70%": { transform: "scale(1)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(236, 178, 203, 0.25)",
        "glass-lg": "0 20px 50px 0 rgba(230, 160, 195, 0.28)",
        "pink-glow": "0 0 25px rgba(244, 114, 182, 0.45)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;

