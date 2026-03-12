import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { Meditation } from '../../data/meditations';
import { useApp } from '../../contexts/AppContext';
import { speak, stopSpeech, startTone, stopTone, isSpeechSupported, isAudioContextSupported } from '../../utils/audioService';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface MeditationCardProps {
  meditation: Meditation;
}

const categoryColors: Record<string, string> = {
  morning: '#F59E0B',
  evening: '#8B5CF6',
  focus: '#0D9488',
  sleep: '#3B82F6',
};

const MeditationCard: FC<MeditationCardProps> = ({ meditation }) => {
  const { markActivityComplete, isActivityComplete } = useApp();
  const completed = isActivityComplete(meditation.id);

  const totalSeconds = meditation.duration * 60;
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [narrationOn, setNarrationOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const markRef = useRef(markActivityComplete);

  useEffect(() => {
    markRef.current = markActivityComplete;
  }, [markActivityComplete]);

  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsRunning(false);
          stopSpeech();
          stopTone();
          markRef.current(meditation.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, meditation.id]);

  const handleStart = () => {
    setIsRunning(true);
    if (musicOn) startTone(meditation.musicTone);
    if (narrationOn) speak(meditation.guidedScript);
  };

  const handleStop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(totalSeconds);
    stopSpeech();
    stopTone();
  };

  const toggleNarration = () => {
    const next = !narrationOn;
    setNarrationOn(next);
    if (isRunning) {
      if (next) {
        // Web Speech API has no resume – restart from beginning when re-enabled
        speak(meditation.guidedScript);
      } else {
        stopSpeech();
      }
    }
  };

  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    if (isRunning) {
      if (next) {
        startTone(meditation.musicTone);
      } else {
        stopTone();
      }
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.8rem', background: categoryColors[meditation.category] + '20', color: categoryColors[meditation.category], padding: '3px 10px', borderRadius: '999px', fontWeight: 600, textTransform: 'capitalize' }}>
          {meditation.category}
        </span>
        <span style={{ fontSize: '0.85rem', color: '#64748B' }}>⏱ {meditation.duration} min</span>
      </div>
      <h3 style={{ color: '#1E293B', marginBottom: '8px' }}>{meditation.title}</h3>
      <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.6 }}>{meditation.description}</p>

      {completed ? (
        <div style={{ color: '#0D9488', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          ✓ Completed
        </div>
      ) : (
        <>
          {/* Audio toggle controls */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {isSpeechSupported() && (
              <button
                onClick={toggleNarration}
                aria-pressed={narrationOn}
                style={{
                  fontSize: '0.78rem',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border: `1.5px solid ${narrationOn ? '#7C3AED' : '#CBD5E1'}`,
                  background: narrationOn ? '#7C3AED15' : 'transparent',
                  color: narrationOn ? '#7C3AED' : '#94A3B8',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                🎙 Narration {narrationOn ? 'On' : 'Off'}
              </button>
            )}
            {isAudioContextSupported() && (
              <button
                onClick={toggleMusic}
                aria-pressed={musicOn}
                style={{
                  fontSize: '0.78rem',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border: `1.5px solid ${musicOn ? '#0D9488' : '#CBD5E1'}`,
                  background: musicOn ? '#0D948815' : 'transparent',
                  color: musicOn ? '#0D9488' : '#94A3B8',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                🎵 Music {musicOn ? 'On' : 'Off'}
              </button>
            )}
          </div>

          {/* Timer display */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: isRunning ? '#7C3AED15' : '#F1F5F9',
              border: `4px solid ${isRunning ? '#7C3AED' : '#CBD5E1'}`,
              transition: 'all 0.3s ease',
            }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: isRunning ? '#7C3AED' : '#64748B', fontVariantNumeric: 'tabular-nums' }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          {isRunning && (
            <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3, marginBottom: '16px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: '#7C3AED', borderRadius: 3, transition: 'width 1s linear' }} />
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            {isRunning ? (
              <Button variant="outline" onClick={handleStop} fullWidth>Stop</Button>
            ) : (
              <>
                <Button variant="primary" onClick={handleStart} fullWidth>
                  {timeLeft < totalSeconds ? 'Resume' : 'Start Meditation'}
                </Button>
                <Button variant="ghost" onClick={() => markActivityComplete(meditation.id)}>
                  Skip
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </Card>
  );
};

export default MeditationCard;
