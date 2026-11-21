"use client";

import React, { useRef, useState, useImperativeHandle, forwardRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Disc3, AlertCircle } from "lucide-react";
import { sound } from "@/utils/audio";

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
}

interface YTPlayerEvent {
  target: YTPlayerInstance;
  data: number;
}

interface YTConstructorOptions {
  width: string;
  height: string;
  videoId: string;
  playerVars: Record<string, unknown>;
  events: {
    onReady: (event: YTPlayerEvent) => void;
    onStateChange: (event: YTPlayerEvent) => void;
    onError: (error: unknown) => void;
  };
}

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: YTConstructorOptions) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface YouTubePlayerRef {
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

interface YouTubeBackgroundMusicProps {
  onStateChange?: (isPlaying: boolean) => void;
}

const YOUTUBE_VIDEO_ID = "acfYQmCBsz8";

export const YouTubeBackgroundMusic = forwardRef<YouTubePlayerRef, YouTubeBackgroundMusicProps>(
  ({ onStateChange }, ref) => {
    const playerRef = useRef<YTPlayerInstance | null>(null);
    const containerId = "yt-bg-music-player";
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoadingScript, setIsLoadingScript] = useState(false);
    const pendingPlayRequest = useRef(false);

    // Lazy load the YouTube IFrame API script ONLY when requested
    const loadYouTubeApi = useCallback((): Promise<void> => {
      return new Promise((resolve) => {
        if (typeof window === "undefined") return resolve();

        if (window.YT && window.YT.Player) {
          return resolve();
        }

        setIsLoadingScript(true);
        const prevCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (prevCallback) prevCallback();
          setIsLoadingScript(false);
          resolve();
        };

        if (!document.getElementById("yt-iframe-api-script")) {
          const script = document.createElement("script");
          script.id = "yt-iframe-api-script";
          script.src = "https://www.youtube.com/iframe_api";
          script.async = true;
          script.onerror = () => {
            setIsLoadingScript(false);
            setHasError(true);
            resolve();
          };
          document.head.appendChild(script);
        }
      });
    }, []);

    const initPlayer = useCallback(async () => {
      if (playerRef.current) return;

      await loadYouTubeApi();

      if (!window.YT || !window.YT.Player) {
        setHasError(true);
        return;
      }

      try {
        playerRef.current = new window.YT.Player(containerId, {
          width: "1",
          height: "1",
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event: YTPlayerEvent) => {
              setIsPlayerReady(true);
              // Set initial volume to 20%
              event.target.setVolume(20);

              if (pendingPlayRequest.current) {
                pendingPlayRequest.current = false;
                event.target.playVideo();
              }
            },
            onStateChange: (event: YTPlayerEvent) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              const playing = event.data === 1;
              setIsPlaying(playing);
              if (onStateChange) onStateChange(playing);

              if (event.data === 0) {
                event.target.playVideo();
              }
            },
            onError: (error: unknown) => {
              console.warn("YouTube player notice:", error);
              setHasError(true);
            },
          },
        });
      } catch (err) {
        console.warn("YouTube player init error:", err);
        setHasError(true);
      }
    }, [loadYouTubeApi, onStateChange]);

    const playVideo = useCallback(async () => {
      if (!playerRef.current) {
        pendingPlayRequest.current = true;
        await initPlayer();
      } else if (isPlayerReady) {
        try {
          playerRef.current.unMute();
          playerRef.current.setVolume(20);
          playerRef.current.playVideo();
          setIsMuted(false);
        } catch {
          pendingPlayRequest.current = true;
        }
      } else {
        pendingPlayRequest.current = true;
      }
    }, [initPlayer, isPlayerReady]);

    const pauseVideo = useCallback(() => {
      if (playerRef.current && isPlayerReady) {
        try {
          playerRef.current.pauseVideo();
        } catch {}
      }
      setIsPlaying(false);
    }, [isPlayerReady]);

    const togglePlay = useCallback(() => {
      sound.playPop();
      if (isPlaying) {
        pauseVideo();
      } else {
        playVideo();
      }
    }, [isPlaying, pauseVideo, playVideo]);

    const toggleMute = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      sound.playPop();
      if (!playerRef.current || !isPlayerReady) return;

      try {
        if (isMuted) {
          playerRef.current.unMute();
          playerRef.current.setVolume(20);
          setIsMuted(false);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch {}
    }, [isMuted, isPlayerReady]);

    useImperativeHandle(ref, () => ({
      play: playVideo,
      pause: pauseVideo,
      toggle: togglePlay,
    }));

    return (
      <>
        {/* Unobtrusive 1px YouTube player container */}
        <div
          id={containerId}
          aria-hidden="true"
          className="fixed bottom-0 left-0 w-[1px] h-[1px] opacity-0 pointer-events-none -z-50"
        />

        {/* Floating Music Control in Bottom-Right Corner */}
        <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="relative flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Info Badge on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 15, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="mr-3 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-200/90 shadow-glass text-xs text-rose-950 font-medium whitespace-nowrap"
                >
                  <span className="text-base">🎵</span>
                  <div className="flex flex-col text-left">
                    <span className="text-rose-900 font-semibold tracking-wide flex items-center gap-1">
                      A little background music
                      <span className="text-[11px] text-amber-500">💛</span>
                    </span>
                    <span className="text-[10px] text-rose-500/80">
                      {hasError
                        ? "Audio fallback mode ready"
                        : isLoadingScript
                        ? "Loading music player..."
                        : isPlaying
                        ? "Playing at gentle 20% volume"
                        : "Click to play song"}
                    </span>
                  </div>

                  {/* Inline Mute / Unmute Button */}
                  {isPlaying && (
                    <button
                      onClick={toggleMute}
                      className="p-1 rounded-full text-rose-500 hover:text-rose-800 hover:bg-pink-100/60 transition"
                      title={isMuted ? "Unmute song" : "Mute song"}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Circular Glassmorphism Control Disc */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={togglePlay}
              className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border shadow-glass transition-all duration-300 backdrop-blur-md cursor-pointer ${
                isPlaying
                  ? "bg-gradient-to-tr from-amber-100/90 via-yellow-50/90 to-pink-100/90 border-amber-300 text-amber-800 shadow-amber-300/40"
                  : "bg-white/85 hover:bg-white border-pink-200 text-rose-700 hover:border-amber-300"
              }`}
              title={isPlaying ? "Pause music" : "Play YouTube background music"}
              aria-label="Toggle YouTube background music"
            >
              {/* Rotating Vinyl Disc while playing */}
              {isPlaying ? (
                <div className="relative flex items-center justify-center w-full h-full">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="flex items-center justify-center text-amber-600"
                  >
                    <Disc3 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </motion.div>
                  <span className="absolute text-xs sm:text-sm select-none pointer-events-none">
                    💛
                  </span>
                </div>
              ) : (
                <div className="relative flex items-center justify-center">
                  <Play className={`w-5 h-5 text-amber-600 fill-amber-500/30 ml-0.5 ${isLoadingScript ? "animate-pulse" : ""}`} />
                  <span className="absolute -top-2.5 -right-2 text-[10px]">💛</span>
                </div>
              )}

              {/* Glowing Pulse Ring when Playing */}
              {isPlaying && !isMuted && (
                <span className="absolute inset-0 rounded-full border-2 border-amber-400/50 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
              )}
            </motion.button>
          </motion.div>

          {/* Fallback notice */}
          {hasError && (
            <div className="mt-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 shadow-sm">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Audio available on click</span>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
);

YouTubeBackgroundMusic.displayName = "YouTubeBackgroundMusic";
