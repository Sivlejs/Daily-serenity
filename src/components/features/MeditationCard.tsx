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
  morning: '#B8860B',   /* Kemetic gold – sunrise */
  evening: '#1B3A6B',   /* deep lapis blue – twilight */
  focus: '#8B4513',     /* earthy sienna – grounded clarity */
  sleep: '#4A3060',     /* dark violet-blue – night sky */
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
      <h3 style={{ color: '#1B3A6B', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>{meditation.title}</h3>
      <p style={{ color: '#7A5C2E', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.6 }}>{meditation.description}</p>

      {completed ? (
        <div style={{ color: '#B8860B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          ☥ Completed
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
                  border: `1.5px solid ${narrationOn ? '#B8860B' : '#D4B483'}`,
                  background: narrationOn ? '#B8860B15' : 'transparent',
                  color: narrationOn ? '#B8860B' : '#7A5C2E',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontFamily: 'Georgia, serif',
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
                  border: `1.5px solid ${musicOn ? '#1B3A6B' : '#D4B483'}`,
                  background: musicOn ? '#1B3A6B15' : 'transparent',
                  color: musicOn ? '#1B3A6B' : '#7A5C2E',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontFamily: 'Georgia, serif',
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
              background: isRunning ? '#B8860B15' : '#FDF6E3',
              border: `4px solid ${isRunning ? '#B8860B' : '#D4B483'}`,
              transition: 'all 0.3s ease',
            }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: isRunning ? '#B8860B' : '#7A5C2E', fontVariantNumeric: 'tabular-nums' }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          {isRunning && (
            <div style={{ height: 6, background: '#D4B483', borderRadius: 3, marginBottom: '16px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: '#B8860B', borderRadius: 3, transition: 'width 1s linear' }} />
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
