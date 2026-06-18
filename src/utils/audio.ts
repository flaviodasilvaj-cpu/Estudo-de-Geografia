/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Safe browser audio manager to generate retro synthesizer frequencies
class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    // Resume context if suspended
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  getMuteState(): boolean {
    return this.isMuted;
  }

  playIntro() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Play eerie 3-interval Squid Game melody: E5 -> G5 -> C6
      this.playTone(329.63, 'triangle', 0.15, t); // E4
      this.playTone(392.00, 'triangle', 0.15, t + 0.2); // G4
      this.playTone(523.25, 'triangle', 0.35, t + 0.4); // C5
    } catch (e) {
      console.warn("Audio Context block or error", e);
    }
  }

  playCorrect() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // High jubilant retro chime
      this.playTone(523.25, 'sine', 0.08, t); // C5
      this.playTone(659.25, 'sine', 0.08, t + 0.08); // E5
      this.playTone(783.99, 'sine', 0.15, t + 0.16); // G5
      this.playTone(1046.50, 'sine', 0.25, t + 0.24); // C6
    } catch (e) {
      console.warn(e);
    }
  }

  playWrong() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Mechanical descending buzz
      this.playTone(220.00, 'sawtooth', 0.2, t); // A3
      this.playTone(180.00, 'sawtooth', 0.3, t + 0.15); // Descending groan
    } catch (e) {
      console.warn(e);
    }
  }

  playVictory() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Victorious march sound
      this.playTone(523.25, 'triangle', 0.12, t); // C5
      this.playTone(523.25, 'triangle', 0.12, t + 0.15);
      this.playTone(523.25, 'triangle', 0.12, t + 0.3);
      this.playTone(659.25, 'triangle', 0.2, t + 0.45); // E5
      this.playTone(587.33, 'triangle', 0.2, t + 0.65); // D5
      this.playTone(783.99, 'triangle', 0.35, t + 0.85); // G5
    } catch (e) {
      console.warn(e);
    }
  }

  playTick() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Short woodblock tick
      this.playTone(1200, 'sine', 0.03, t);
    } catch (e) {
      console.warn(e);
    }
  }

  playAlarm() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Rapid sweep hazard alarm
      this.playTone(880, 'sawtooth', 0.08, t);
      this.playTone(660, 'sawtooth', 0.08, t + 0.1);
      this.playTone(880, 'sawtooth', 0.08, t + 0.2);
      this.playTone(660, 'sawtooth', 0.08, t + 0.3);
    } catch (e) {
      console.warn(e);
    }
  }

  playBribe() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Retro cash register / digital powerup sound
      this.playTone(987.77, 'sine', 0.06, t); // B5
      this.playTone(1318.51, 'sine', 0.06, t + 0.06); // E6
      this.playTone(1567.98, 'sine', 0.18, t + 0.12); // G6
    } catch (e) {
      console.warn(e);
    }
  }

  playExplosion() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Bass drop simulated explosion
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.8);
      gainNode.gain.setValueAtTime(0.2, t);
      gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.9);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 1);
    } catch (e) {
      console.warn(e);
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, startTime: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gainNode.gain.setValueAtTime(0.12, startTime);
    // Smooth ramp down to prevent audio clicks
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }
}

export const playSound = new AudioEngine();
