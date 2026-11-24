// Web Audio API ambient festival soundscape and interactive SFX generator
class FestivalAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private intervalId: any = null;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      this.isPlaying = false;
    } else {
      this.startAmbientSound();
      this.isPlaying = true;
    }
    return this.isPlaying;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startAmbientSound() {
    if (!this.ctx || !this.masterGain) return;

    // Cyberpunk synth arpeggio notes (F minor / Ab major pentatonic)
    const scale = [174.61, 207.65, 233.08, 261.63, 311.13, 349.23, 415.30, 466.16];
    let noteIdx = 0;

    const playPulse = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const freq = scale[noteIdx % scale.length];
      noteIdx = (noteIdx + (Math.random() > 0.4 ? 1 : 2)) % scale.length;

      // Dual oscillator for rich synth sound
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 1.004, now); // slight detune for stereo width

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 0.1);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.4);

      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
    };

    // Sub-bass drone
    const bassOsc = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(58.27, this.ctx.currentTime); // Bb1 / F1 deep rumble
    bassGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    bassOsc.connect(bassGain);
    bassGain.connect(this.masterGain);
    bassOsc.start();

    this.intervalId = setInterval(playPulse, 260); // 115 BPM rhythm
  }

  private stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public playClickSFX() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }
}

export const soundEngine = new FestivalAudioEngine();
