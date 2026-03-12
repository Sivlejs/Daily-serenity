import { useState } from 'react';
import type { FC } from 'react';
import type { GrievingSession } from '../../data/grieving';
import { speak, stopSpeech, startTone, stopTone, isSpeechSupported, isAudioContextSupported } from '../../utils/audioService';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface GrievingSupportProps {
  session: GrievingSession;
}

const typeColors: Record<GrievingSession['type'], string> = {
  comfort: '#C8970A',   /* Kemetic gold – the warmth of embrace */
  reflection: '#1B3A6B',/* lapis lazuli – the depth of memory */
  healing: '#7B2D2D',   /* earthy terracotta – the healing earth */
  acceptance: '#2E5BA8',/* deep blue – the vast, accepting sky */
};

const typeEmoji: Record<GrievingSession['type'], string> = {
  comfort: '☥',
  reflection: '𓂀',
  healing: '𓅃',
  acceptance: '𓃒',
};

const GrievingSupport: FC<GrievingSupportProps> = ({ session }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [narrationOn, setNarrationOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);

  const color = typeColors[session.type];

  const handlePlay = () => {
    setIsPlaying(true);
    if (musicOn) startTone(session.musicTone);
    if (narrationOn) {
      speak(session.guidedScript, () => {
        stopTone();
        setIsPlaying(false);
      });
    }
  };

  const handleStop = () => {
    stopSpeech();
    stopTone();
    setIsPlaying(false);
  };

  const toggleNarration = () => {
    const next = !narrationOn;
    setNarrationOn(next);
    if (isPlaying) {
      if (next) {
        // Web Speech API has no resume – restart from beginning when re-enabled
        speak(session.guidedScript, () => {
          stopTone();
          setIsPlaying(false);
        });
      } else {
        stopSpeech();
      }
    }
  };

  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    if (isPlaying) {
      if (next) {
        startTone(session.musicTone);
      } else {
        stopTone();
      }
    }
  };

  return (
    <Card>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{
          fontSize: '0.8rem',
          background: color + '20',
          color,
          padding: '3px 10px',
          borderRadius: '999px',
          fontWeight: 600,
          textTransform: 'capitalize',
        }}>
          {typeEmoji[session.type]} {session.type}
        </span>
        <span style={{ fontSize: '0.85rem', color: '#8B7355' }}>⏱ {session.duration} min</span>
      </div>

      <h3 style={{ color: '#1B3A6B', marginBottom: '8px' }}>{session.title}</h3>
      <p style={{ color: '#5C4A2A', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.6 }}>{session.description}</p>

      {/* Script preview */}
      <blockquote style={{
        borderLeft: `3px solid ${color}`,
        paddingLeft: '12px',
        margin: '0 0 16px 0',
        color: '#5C4A2A',
        fontSize: '0.88rem',
        fontStyle: 'italic',
        lineHeight: 1.7,
        background: 'rgba(200,151,10,0.04)',
        borderRadius: '0 8px 8px 0',
        paddingTop: '8px',
        paddingBottom: '8px',
      }}>
        {session.guidedScript.length > 160
          ? session.guidedScript.slice(0, 160) + '…'
          : session.guidedScript}
      </blockquote>

      {/* Audio toggles */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {isSpeechSupported() && (
          <button
            onClick={toggleNarration}
            aria-pressed={narrationOn}
            style={{
              fontSize: '0.78rem',
              padding: '4px 10px',
              borderRadius: '999px',
              border: `1.5px solid ${narrationOn ? '#C8970A' : '#D4B896'}`,
              background: narrationOn ? '#C8970A15' : 'transparent',
              color: narrationOn ? '#C8970A' : '#8B7355',
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
              border: `1.5px solid ${musicOn ? '#1B3A6B' : '#D4B896'}`,
              background: musicOn ? '#1B3A6B15' : 'transparent',
              color: musicOn ? '#1B3A6B' : '#8B7355',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            🎵 Music {musicOn ? 'On' : 'Off'}
          </button>
        )}
      </div>

      {/* Playback controls */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {isPlaying ? (
          <Button variant="outline" onClick={handleStop} fullWidth>⏹ Stop</Button>
        ) : (
          <Button variant="primary" onClick={handlePlay} fullWidth>
            ▶ Begin Session
          </Button>
        )}
      </div>
    </Card>
  );
};

export default GrievingSupport;
