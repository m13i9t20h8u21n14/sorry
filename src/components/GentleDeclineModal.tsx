"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { sound } from "@/utils/audio";

interface GentleDeclineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GentleDeclineModal: React.FC<GentleDeclineModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [userNote, setUserNote] = useState("");
  const [hasSentNote, setHasSentNote] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNote.trim()) return;
    sound.playPop();
    setHasSentNote(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-rose-950/25 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Soft decorative background glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-100 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-100 rounded-full blur-2xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-100 to-yellow-50 text-amber-600 mb-4 shadow-sm border border-amber-200/50">
                <span className="text-2xl select-none">💛</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-900 mb-2">
                Take all the time you need, Lisha 🕊️
              </h3>

              <div className="space-y-3 text-rose-950/80 text-sm sm:text-base leading-relaxed text-left bg-pink-50/50 rounded-2xl p-4 sm:p-5 border border-pink-100/80 mb-6">
                <p>
                  I completely understand and respect your feelings, Lisha. You don&apos;t have to forgive me right away, and there is absolutely zero pressure on you.
                </p>
                <p>
                  My only intention was to acknowledge my mistake, own up to it honestly, and apologize with all my heart.
                </p>
                <p className="font-medium text-amber-700">
                  Whenever you feel ready to talk again, I&apos;ll be right here. And if you need space, I honor and respect that wholeheartedly. 💛
                </p>
              </div>

              {/* Optional gentle message box */}
              {!hasSentNote ? (
                <form onSubmit={handleSend} className="space-y-3">
                  <div className="text-left">
                    <label
                      htmlFor="user-note"
                      className="block text-xs font-semibold text-rose-700 uppercase tracking-wider mb-1"
                    >
                      Want to leave a quick thought or message? (Optional)
                    </label>
                    <textarea
                      id="user-note"
                      value={userNote}
                      onChange={(e) => setUserNote(e.target.value)}
                      placeholder="Type anything you want me to know... or just close this anytime."
                      rows={2}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-pink-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-rose-900 placeholder-rose-300 transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {userNote.trim().length > 0 && (
                      <button
                        type="submit"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm transition-all shadow-md shadow-pink-300/40"
                      >
                        <Send className="w-4 h-4" />
                        Send Note
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        onClose();
                      }}
                      className="flex-1 px-5 py-2.5 rounded-xl border border-pink-200 bg-white hover:bg-pink-50 text-rose-700 font-medium text-sm transition-all shadow-sm"
                    >
                      I understand, take care 🌸
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-2 mb-4"
                >
                  <p className="font-medium text-sm">
                    Thank you so much for sharing your thoughts with me. 🤍
                  </p>
                  <p className="text-xs text-emerald-600">
                    Your words are deeply valued. Take all the time in the world.
                  </p>
                  <button
                    onClick={() => {
                      sound.playPop();
                      onClose();
                    }}
                    className="mt-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
