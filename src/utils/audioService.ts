/**
 * audioService – handles voice narration via Web Speech API
 * and ambient background tones via Web Audio API.
 */

// ─── Voice Narration ────────────────────────────────────────────────────────

export function speak(text: string, onEnd?: () => void): void {
  if (!('speechSynthesis' in window)) return;
  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeech(): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}

export function isSpeechSupported(): boolean {
  return 'speechSynthesis' in window;
}

// ─── Ambient Tones ──────────────────────────────────────────────────────────

let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let oscillator: OscillatorNode | null = null;

export type MusicTone = 'calm' | 'focus' | 'sleep' | 'healing' | 'comfort';

const toneFrequencies: Record<MusicTone, number> = {
  calm: 174,     // Solfeggio – pain & stress relief
  focus: 285,    // Solfeggio – clarity & concentration
  sleep: 396,    // Solfeggio – liberating guilt & fear
  healing: 528,  // Solfeggio – DNA repair / transformation
  comfort: 432,  // natural harmony / comfort
};

export function startTone(tone: MusicTone, volume = 0.08): void {
  stopTone();
  try {
    audioCtx = new AudioContext();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = volume;
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = toneFrequencies[tone];
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
  } catch {
    // AudioContext not available in this environment – silently skip
  }
}

export function stopTone(): void {
  try {
    oscillator?.stop();
    oscillator?.disconnect();
    gainNode?.disconnect();
    audioCtx?.close();
  } catch {
    // ignore errors during cleanup
  } finally {
    oscillator = null;
    gainNode = null;
    audioCtx = null;
  }
}

export function isAudioContextSupported(): boolean {
  const hasNativeAudioContext = typeof AudioContext !== 'undefined';
  const hasWebkitAudioContext = typeof (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext !== 'undefined';
  return hasNativeAudioContext || hasWebkitAudioContext;
}
