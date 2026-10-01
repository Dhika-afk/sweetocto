/**
 * Resilient Audio Manager
 * Plays user-provided mp3 with seamless fallback to warm ambient synth chords
 * if audio file is not yet available in /assets/.
 */

class RomanticAudioManager {
  private audio: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private synthGain: GainNode | null = null;
  private synthInterval: number | null = null;
  private isSynthesizing = false;
  private _isMuted = false;
  private _volume = 0.35;
  private _isPlaying = false;
  private listeners: Array<() => void> = [];

  constructor() {
    // defer creation until user interaction
  }

  public subscribe(cb: () => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public get isPlaying(): boolean {
    return this._isPlaying;
  }

  public get isMuted(): boolean {
    return this._isMuted;
  }

  public get volume(): number {
    return this._volume;
  }

  public init(filePath: string, defaultVolume = 0.35) {
    this._volume = defaultVolume;

    const candidateUrls = [
      filePath,
      filePath.replace(/^\.\//, "/"),
      "/assets/we-fell-in-love-in-october.mp3",
      "./assets/we-fell-in-love-in-october.mp3",
    ];

    const uniqueCandidates = Array.from(new Set(candidateUrls));
    let candidateIndex = 0;

    try {
      this.audio = new Audio(uniqueCandidates[candidateIndex]);
      this.audio.loop = true;
      this.audio.volume = this._volume;

      this.audio.addEventListener("play", () => {
        this._isPlaying = true;
        this.stopAmbientSynth();
        this.notify();
      });

      this.audio.addEventListener("pause", () => {
        this._isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("error", () => {
        candidateIndex++;
        if (candidateIndex < uniqueCandidates.length && this.audio) {
          this.audio.src = uniqueCandidates[candidateIndex];
          if (this._isPlaying) {
            this.audio.play().catch(() => {});
          }
        } else {
          console.info("Notice: Using procedural backdrop for audio.");
          if (this._isPlaying) {
            this.startAmbientSynth();
          }
        }
      });
    } catch {
      // Audio element creation failure - will rely on synth
    }
  }

  public async start(filePath: string, defaultVolume = 0.35) {
    if (!this.audio) {
      this.init(filePath, defaultVolume);
    }

    this._isPlaying = true;

    if (this.audio) {
      try {
        await this.audio.play();
        this.stopAmbientSynth();
        this.notify();
        return;
      } catch {
        // Autoplay policy or candidate try -> try direct start
        this.audio.src = "/assets/we-fell-in-love-in-october.mp3";
        try {
          await this.audio.play();
          this.stopAmbientSynth();
          this.notify();
          return;
        } catch {
          this.startAmbientSynth();
        }
      }
    } else {
      this.startAmbientSynth();
    }
    this.notify();
  }

  public togglePlay() {
    if (this._isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  public pause() {
    this._isPlaying = false;
    if (this.audio) {
      this.audio.pause();
    }
    this.stopAmbientSynth();
    this.notify();
  }

  public resume() {
    this._isPlaying = true;
    if (this.audio && this.audio.src && !this.isSynthesizing) {
      this.audio.play().catch(() => {
        this.startAmbientSynth();
      });
    } else {
      this.startAmbientSynth();
    }
    this.notify();
  }

  public toggleMute() {
    this._isMuted = !this._isMuted;
    if (this.audio) {
      this.audio.muted = this._isMuted;
    }
    if (this.synthGain && this.audioContext) {
      this.synthGain.gain.setValueAtTime(
        this._isMuted ? 0 : this._volume * 0.15,
        this.audioContext.currentTime
      );
    }
    this.notify();
  }

  public setVolume(vol: number) {
    this._volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this._isMuted ? 0 : this._volume;
    }
    if (this.synthGain && this.audioContext) {
      this.synthGain.gain.setValueAtTime(
        this._isMuted ? 0 : this._volume * 0.15,
        this.audioContext.currentTime
      );
    }
    this.notify();
  }

  /**
   * Warm, soft acoustic chord synthesis inspired by "We Fell In Love in October"
   * Chords: Cmaj7 (C-E-G-B) -> Fmaj7 (F-A-C-E)
   */
  private startAmbientSynth() {
    if (this.isSynthesizing) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      this.audioContext = new AudioCtx();
      this.synthGain = this.audioContext.createGain();
      this.synthGain.gain.setValueAtTime(
        this._isMuted ? 0 : this._volume * 0.12,
        this.audioContext.currentTime
      );
      this.synthGain.connect(this.audioContext.destination);

      this.isSynthesizing = true;

      // Chord notes (frequencies in Hz)
      // Cmaj7: C4 (261.63), E4 (329.63), G4 (392.00), B4 (493.88)
      // Fmaj7: F3 (174.61), C4 (261.63), E4 (329.63), A4 (440.00)
      const chordC = [261.63, 329.63, 392.0, 493.88];
      const chordF = [174.61, 261.63, 329.63, 440.0];
      const progression = [chordC, chordF];
      let step = 0;

      const playChord = (frequencies: number[]) => {
        if (!this.audioContext || !this.synthGain || !this.isSynthesizing) return;
        const now = this.audioContext.currentTime;

        frequencies.forEach((freq, idx) => {
          if (!this.audioContext || !this.synthGain) return;
          const osc = this.audioContext.createOscillator();
          const noteGain = this.audioContext.createGain();

          osc.type = "sine";
          // Gentle warm detune
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          // Soft bell/chime envelope
          noteGain.gain.setValueAtTime(0.001, now + idx * 0.08);
          noteGain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.3);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 3.8);

          osc.connect(noteGain);
          noteGain.connect(this.synthGain);

          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 4.2);
        });
      };

      // Initial chord
      playChord(progression[0]);

      this.synthInterval = window.setInterval(() => {
        step = (step + 1) % progression.length;
        playChord(progression[step]);
      }, 4200);
    } catch {
      // AudioContext disallowed or unavailable
    }
  }

  private stopAmbientSynth() {
    this.isSynthesizing = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch {}
      this.audioContext = null;
    }
  }
}

export const audioManager = new RomanticAudioManager();
