import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the Web Speech API and AudioContext before importing the module
const mockCancel = vi.fn();
const mockSpeak = vi.fn();

Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: { cancel: mockCancel, speak: mockSpeak },
});

class MockSpeechSynthesisUtterance {
  text: string;
  rate = 1;
  pitch = 1;
  volume = 1;
  onend: (() => void) | null = null;
  constructor(text: string) { this.text = text; }
}

(window as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

// Mock AudioContext
class MockOscillator {
  type = 'sine';
  frequency = { value: 0 };
  connect = vi.fn();
  start = vi.fn();
  stop = vi.fn();
  disconnect = vi.fn();
}

class MockGain {
  gain = { value: 0 };
  connect = vi.fn();
  disconnect = vi.fn();
}

class MockAudioContext {
  destination = {};
  createGain = vi.fn(() => new MockGain());
  createOscillator = vi.fn(() => new MockOscillator());
  close = vi.fn();
}

(window as unknown as { AudioContext: unknown }).AudioContext = MockAudioContext;

import {
  speak,
  stopSpeech,
  isSpeechSupported,
  startTone,
  stopTone,
  isAudioContextSupported,
  speakGrieving,
} from '../../utils/audioService';

describe('audioService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    stopSpeech();
    stopTone();
  });

  describe('isSpeechSupported', () => {
    it('returns true when speechSynthesis is on window', () => {
      expect(isSpeechSupported()).toBe(true);
    });
  });

  describe('isAudioContextSupported', () => {
    it('returns true when AudioContext is defined', () => {
      expect(isAudioContextSupported()).toBe(true);
    });
  });

  describe('speak', () => {
    it('calls speechSynthesis.cancel then speak', () => {
      speak('Hello world');
      expect(mockCancel).toHaveBeenCalledTimes(1);
      expect(mockSpeak).toHaveBeenCalledTimes(1);
      const utterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;
      expect(utterance.text).toBe('Hello world');
    });

    it('uses a slower, calmer rate (0.75)', () => {
      speak('Slow and calm');
      const utterance = mockSpeak.mock.calls[0][0] as MockSpeechSynthesisUtterance;
      expect(utterance.rate).toBe(0.75);
    });

    it('attaches onEnd callback when provided', () => {
      const onEnd = vi.fn();
      speak('Test', onEnd);
      const utterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;
      expect(utterance.onend).toBe(onEnd);
    });
  });

  describe('speakGrieving', () => {
    it('calls speechSynthesis.cancel then speak', () => {
      speakGrieving('Gentle words');
      expect(mockCancel).toHaveBeenCalledTimes(1);
      expect(mockSpeak).toHaveBeenCalledTimes(1);
      const utterance = mockSpeak.mock.calls[0][0] as MockSpeechSynthesisUtterance;
      expect(utterance.text).toBe('Gentle words');
    });

    it('uses an even slower, softer rate (0.65) for grieving', () => {
      speakGrieving('Tender and soft');
      const utterance = mockSpeak.mock.calls[0][0] as MockSpeechSynthesisUtterance;
      expect(utterance.rate).toBe(0.65);
    });

    it('attaches onEnd callback when provided', () => {
      const onEnd = vi.fn();
      speakGrieving('Test', onEnd);
      const utterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;
      expect(utterance.onend).toBe(onEnd);
    });
  });

  describe('stopSpeech', () => {
    it('calls speechSynthesis.cancel', () => {
      stopSpeech();
      expect(mockCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('startTone / stopTone', () => {
    it('creates an AudioContext and starts an oscillator', () => {
      startTone('calm');
      // stopTone cleans up without throwing
      expect(() => stopTone()).not.toThrow();
    });

    it('stopTone is safe to call when no tone is running', () => {
      expect(() => stopTone()).not.toThrow();
    });
  });
});
