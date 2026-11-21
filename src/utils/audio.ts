// Web Audio API synthesized romantic lullaby & haptic sound effects
// 100% client-side, lightweight, zero external asset dependencies

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: ReturnType<typeof setInterval> | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play a gentle pop sound on button interactions
  public playPop() {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      const now = this.ctx.currentTime;

      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Play a playful dodge sound
  public playDodge() {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      const now = this.ctx.currentTime;

      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.07);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Audio context safe fallback
    }
  }

  // Play a magical chime/sparkle on celebration
  public playCelebrationChime() {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      // Romantic harp-like arpeggio (C5, E5, G5, B5, C6)
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        const startTime = this.ctx.currentTime + i * 0.08;

        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.75);
      });
    } catch {
      // Audio context safe fallback
    }
  }

  // Romantic music box lullaby using Web Audio API
  public toggleMusic(callback?: (playing: boolean) => void) {
    this.initCtx();
    if (!this.ctx) return;

    if (this.isMusicPlaying) {
      this.stopMusic();
      if (callback) callback(false);
    } else {
      this.startMusic();
      if (callback) callback(true);
    }
  }

  public startMusic() {
    this.initCtx();
    if (!this.ctx) return;
    this.isMusicPlaying = true;

    // Dreamy romantic lullaby progression (in C / Am / F / G)
    const melody = [
      // Bar 1: Cmaj7
      { note: 261.63, duration: 0.6, delay: 0 },
      { note: 329.63, duration: 0.6, delay: 0.4 },
      { note: 392.0, duration: 0.6, delay: 0.8 },
      { note: 493.88, duration: 0.8, delay: 1.2 },
      { note: 523.25, duration: 0.9, delay: 1.8 },
      // Bar 2: Am9
      { note: 220.0, duration: 0.6, delay: 2.4 },
      { note: 329.63, duration: 0.6, delay: 2.8 },
      { note: 440.0, duration: 0.6, delay: 3.2 },
      { note: 493.88, duration: 0.7, delay: 3.6 },
      { note: 659.25, duration: 0.9, delay: 4.2 },
      // Bar 3: Fmaj7
      { note: 174.61, duration: 0.6, delay: 4.8 },
      { note: 261.63, duration: 0.6, delay: 5.2 },
      { note: 329.63, duration: 0.6, delay: 5.6 },
      { note: 392.0, duration: 0.8, delay: 6.0 },
      { note: 523.25, duration: 0.9, delay: 6.6 },
      // Bar 4: Gsus4 to G
      { note: 196.0, duration: 0.6, delay: 7.2 },
      { note: 293.66, duration: 0.6, delay: 7.6 },
      { note: 392.0, duration: 0.6, delay: 8.0 },
      { note: 493.88, duration: 0.8, delay: 8.4 },
      { note: 587.33, duration: 1.0, delay: 9.0 },
    ];

    const loopLength = 9.8;

    const playSequence = () => {
      if (!this.isMusicPlaying || !this.ctx) return;
      const baseTime = this.ctx.currentTime;

      melody.forEach(({ note, duration, delay }) => {
        if (!this.ctx || !this.isMusicPlaying) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Music box / Celesta bell timbre: sine with gentle decay
        osc.type = "sine";
        const startTime = baseTime + delay;

        osc.frequency.setValueAtTime(note, startTime);

        // Soft music box envelope
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.065, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
      });
    };

    playSequence();
    this.musicInterval = setInterval(() => {
      if (this.isMusicPlaying) {
        playSequence();
      }
    }, loopLength * 1000);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public getIsPlaying() {
    return this.isMusicPlaying;
  }
}

export const sound = new SoundManager();
