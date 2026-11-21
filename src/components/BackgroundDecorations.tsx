import React from "react";

// Pre-computed static coordinates for 14 hearts and 16 sparkles
// Zero hydration mismatches, zero JS runtime overhead, 100% pure CSS GPU animations
const HEARTS = [
  { id: 1, left: "4%", size: 16, duration: "16s", delay: "0s", drift: "20px", rot: "15deg", color: "rgba(251, 191, 36, 0.55)", opacity: 0.5 },
  { id: 2, left: "14%", size: 24, duration: "20s", delay: "3s", drift: "-25px", rot: "-18deg", color: "rgba(252, 211, 77, 0.5)", opacity: 0.45 },
  { id: 3, left: "26%", size: 18, duration: "15s", delay: "1.5s", drift: "18px", rot: "12deg", color: "rgba(245, 158, 11, 0.4)", opacity: 0.4 },
  { id: 4, left: "38%", size: 28, duration: "22s", delay: "5s", drift: "-22px", rot: "-15deg", color: "rgba(254, 240, 138, 0.65)", opacity: 0.6 },
  { id: 5, left: "50%", size: 20, duration: "18s", delay: "2s", drift: "15px", rot: "10deg", color: "rgba(253, 224, 71, 0.5)", opacity: 0.45 },
  { id: 6, left: "62%", size: 26, duration: "21s", delay: "4.5s", drift: "-30px", rot: "-20deg", color: "rgba(251, 191, 36, 0.5)", opacity: 0.5 },
  { id: 7, left: "74%", size: 16, duration: "17s", delay: "1s", drift: "22px", rot: "14deg", color: "rgba(252, 211, 77, 0.55)", opacity: 0.5 },
  { id: 8, left: "86%", size: 22, duration: "19s", delay: "6s", drift: "-18px", rot: "-12deg", color: "rgba(245, 158, 11, 0.45)", opacity: 0.45 },
  { id: 9, left: "95%", size: 18, duration: "16s", delay: "2.8s", drift: "14px", rot: "16deg", color: "rgba(254, 240, 138, 0.6)", opacity: 0.55 },
  { id: 10, left: "8%", size: 20, duration: "23s", delay: "8s", drift: "-15px", rot: "-10deg", color: "rgba(251, 191, 36, 0.4)", opacity: 0.4 },
  { id: 11, left: "32%", size: 22, duration: "18s", delay: "7s", drift: "25px", rot: "18deg", color: "rgba(252, 211, 77, 0.45)", opacity: 0.45 },
  { id: 12, left: "68%", size: 18, duration: "19s", delay: "9s", drift: "-20px", rot: "-14deg", color: "rgba(253, 224, 71, 0.5)", opacity: 0.5 },
];

const SPARKLES = [
  { id: 1, top: "12%", left: "8%", size: 10, delay: "0s", duration: "3s" },
  { id: 2, top: "25%", left: "88%", size: 14, delay: "1.2s", duration: "3.5s" },
  { id: 3, top: "45%", left: "5%", size: 8, delay: "2.1s", duration: "2.8s" },
  { id: 4, top: "60%", left: "92%", size: 12, delay: "0.8s", duration: "3.2s" },
  { id: 5, top: "78%", left: "14%", size: 10, delay: "1.8s", duration: "3.4s" },
  { id: 6, top: "85%", left: "80%", size: 12, delay: "2.5s", duration: "2.9s" },
  { id: 7, top: "35%", left: "94%", size: 8, delay: "1.5s", duration: "3.1s" },
  { id: 8, top: "18%", left: "70%", size: 11, delay: "0.4s", duration: "3.6s" },
];

export const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft ambient atmospheric gradients (pure CSS blur) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/35 blur-[100px] animate-pulse-glow" />
      <div
        className="absolute top-1/3 -right-28 w-[28rem] h-[28rem] rounded-full bg-purple-200/30 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute -bottom-32 left-1/4 w-[32rem] h-[32rem] rounded-full bg-amber-100/40 blur-[110px] animate-pulse-glow"
        style={{ animationDelay: "3s" }}
      />

      {/* Floating upward yellow hearts (Pure CSS GPU keyframes) */}
      {HEARTS.map((h) => (
        <div
          key={h.id}
          className="absolute bg-floating-heart"
          style={
            {
              left: h.left,
              bottom: "-40px",
              width: `${h.size}px`,
              height: `${h.size}px`,
              color: h.color,
              animationDuration: h.duration,
              animationDelay: h.delay,
              "--target-opacity": h.opacity,
              "--drift-x": h.drift,
              "--rot": h.rot,
            } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Twinkling romantic sparkles (Pure CSS GPU keyframes) */}
      {SPARKLES.map((s) => (
        <div
          key={s.id}
          className="absolute text-amber-300/60 bg-twinkle-sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
